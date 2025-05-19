import { BigNumberish, BytesLike, Contract } from 'ethers'
import { task } from 'hardhat/config'

import { getNetworkNameForEid, types } from '@layerzerolabs/devtools-evm-hardhat'
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { Options, addressToBytes32 } from '@layerzerolabs/lz-v2-utilities'

interface Args {
    amount: string
    to: string
    toEid: EndpointId
}

interface SendParam {
    dstEid: EndpointId // Destination endpoint ID, represented as a number.
    to: BytesLike // Recipient address, represented as bytes.
    amountLD: BigNumberish // Amount to send in local decimals.
    minAmountLD: BigNumberish // Minimum amount to send in local decimals.
    extraOptions: BytesLike // Additional options supplied by the caller to be used in the LayerZero message.
    composeMsg: BytesLike // The composed message for the send() operation.
    oftCmd: BytesLike // The OFT command to be executed, unused in default OFT implementations.
}

// send tokens from a contract on one network to another
task('lz:oft:send', 'Sends tokens from either OFT or OFTAdapter')
    .addParam('to', 'contract address on network B', undefined, types.string)
    .addParam('toEid', 'destination endpoint ID', undefined, types.eid)
    .addParam('amount', 'amount to transfer in token decimals', undefined, types.string)
    .setAction(async (taskArgs: Args, { ethers, deployments }) => {

        const toAddress = taskArgs.to
        const eidB = taskArgs.toEid

        // Get the contract factories
        const oftDeployment = await deployments.get('MyOFTAdapter')

        const [signer] = await ethers.getSigners()

        // Create contract instances
        const oftContract = new ethers.Contract(oftDeployment.address, oftDeployment.abi, signer)

        // Now you can interact with the correct contract
        const oft = oftContract

        const innerTokenAddress = await oft.token()
        let token: Contract = oft

        // // If the token address !== address(this), then this is an OFT Adapter
        if (innerTokenAddress !== oft.address) {
            // If the contract is OFT Adapter, get decimals from the inner token
            const innerToken = await ethers.getContractAt('ERC20', innerTokenAddress)

            token = innerToken
        }

        const decimals = await token.decimals()
        const amount = ethers.utils.parseUnits(taskArgs.amount, decimals)
        const options = Options.newOptions().addExecutorLzReceiveOption(80000, 0).toBytes()

        if (innerTokenAddress !== oft.address) {
            console.log('approving OFT contract to spend token')
            // Approve the amount to be spent by the oft contract
            await token.approve(oftDeployment.address, amount, { gasLimit: 1000000 })
            console.log('approved OFT contract to spend token')
        }

        const sendParam: SendParam = {
            dstEid: eidB,
            to: addressToBytes32(toAddress),
            amountLD: amount,
            minAmountLD: amount,
            extraOptions: options,
            composeMsg: ethers.utils.arrayify('0x'), // Assuming no composed message
            oftCmd: ethers.utils.arrayify('0x'), // Assuming no OFT command is needed
        }
        // Get the quote for the send operation
        const feeQuote = await oft.quoteSend(sendParam, false)
        const nativeFee = feeQuote.nativeFee

        console.log(`sending ${taskArgs.amount} token(s) to network ${getNetworkNameForEid(eidB)} (${eidB})`)
        console.log(`nativeFee: ${nativeFee} == ${nativeFee / 10 ** 18}`)

        console.log('sending tokens')
        const r = await oft.send(sendParam, { nativeFee: nativeFee, lzTokenFee: 0 }, signer.address, {
            value: nativeFee,
            gasLimit: 52345678,
        })
        console.log(`Send tx initiated. See: https://layerzeroscan.com/tx/${r.hash}`)
    })
