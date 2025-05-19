import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { TwoWayConfig, generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption } from '@layerzerolabs/toolbox-hardhat'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

/**
 *  WARNING: ONLY 1 OFTAdapter should exist for a given global mesh.
 *  The token address for the adapter should be defined in hardhat.config. This will be used in deployment.
 *
 *  for example:
 *
 *    sepolia: {
 *         eid: EndpointId.SEPOLIA_V2_TESTNET,
 *         url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org/',
 *         accounts,
 *         oftAdapter: {
 *             tokenAddress: '0x0', // Set the token address for the OFT adapter
 *         },
 *     },
 */
const baseSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'MyOFT',
}

const subevmtestContract: OmniPointHardhat = {
    eid: EndpointId.SUBTENSOREVM_V2_TESTNET,
    contractName: 'MyOFTAdapter',
}

const subevmmainnetContract: OmniPointHardhat = {
    eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
    contractName: 'MyOFTAdapter',
}

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'MyOFT',
}

// To connect all the above chains to each other, we need the following pathways:
// BaseSepolia <-> subtensorevm
// subtensorevm    <-> BaseSepolia

// For this example's simplicity, we will use the same enforced options values for sending to all chains
// To learn more, read https://docs.layerzero.network/v2/concepts/applications/oapp-standard#execution-options-and-enforced-settings
const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 100000,
        value: 0,
    },
]

const pathways: TwoWayConfig[] = [
    [
        // 1) Chain B's contract (e.g. BaseSepolia)
        baseContract,

        // 2) Chain A's contract (e.g. subtensorevm)
        subevmmainnetContract,

        // 3) Channel security settings:
        //    • first array = "required" DVN names
        //    • second array = "optional" DVN names array + threshold
        //    • third value = threshold (i.e., number of optionalDVNs that must sign)
        //    [ requiredDVN[], [ optionalDVN[], threshold ] ]
        [['LayerZero Labs' /* ← add more DVN names here */], []],

        // 4) Block confirmations:
        //    [confirmations for BaseSepolia → subtensorevm, confirmations for subtensorevm → BaseSepolia]
        [1, 1],

        // 5) Enforced execution options:
        //    [options for BaseSepolia → subtensorevm, options for subtensorevm → BaseSepolia]
        [undefined, undefined],
    ],
]

export default async function () {
    // Generate the connections config based on the pathways
    const connections = await generateConnectionsConfig(pathways)
    return {
        contracts: [{ contract: baseContract }, { contract: subevmmainnetContract }],
        connections,
    }
}
