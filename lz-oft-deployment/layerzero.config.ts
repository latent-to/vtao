import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import {
    BlockConfirmationsDefinition,
    DVNsToAddresses,
    IMetadata,
    TwoWayConfig,
    defaultFetchMetadata,
    generateConnectionsConfig,
} from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption } from '@layerzerolabs/toolbox-hardhat'

import generatedConfig from './layerzero.config.generated'

import type { OmniPointHardhat, Uln302UlnUserConfig } from '@layerzerolabs/toolbox-hardhat'

/**
 *  WARNING: ONLY 1 OFTAdapter should exist for a given global mesh.
 *  The token address for the adapter should be defined in hardhat.config. This will be used in deployment.
 *
 *  for example:
 *
 *       'optimism-testnet': {
 *           eid: EndpointId.OPTSEP_V2_TESTNET,
 *           url: process.env.RPC_URL_OP_SEPOLIA || 'https://optimism-sepolia.gateway.tenderly.co',
 *           accounts,
 *         oftAdapter: {
 *             tokenAddress: '0x0', // Set the token address for the OFT adapter
 *         },
 *     },
 */

const subevmtestContract: OmniPointHardhat = {
    eid: EndpointId.SUBTENSOREVM_V2_TESTNET,
    contractName: 'vTAOOFTAdapter',
}

const arbitrumTestnetContract: OmniPointHardhat = {
    eid: EndpointId.ARBSEP_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const baseSepoliaContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const beraTestnetContract: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const bscTestnetContract: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const ethereumTestnetContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const gnosisTestnetContract: OmniPointHardhat = {
    eid: EndpointId.GNOSIS_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const optimismTestnetContract: OmniPointHardhat = {
    eid: EndpointId.OPTSEP_V2_TESTNET,
    contractName: 'vTAOOFT',
}

const polygonTestnetContract: OmniPointHardhat = {
    eid: EndpointId.POLYGON_V2_TESTNET,
    contractName: 'vTAOOFT',
}
// --- Mainnet ---
const subevmmainnetContract: OmniPointHardhat = {
    eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
    contractName: 'vTAOOFTAdapter',
}

const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const beraContract: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const bscContract: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const ethContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const gnosisContract: OmniPointHardhat = {
    eid: EndpointId.GNOSIS_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const optimismContract: OmniPointHardhat = {
    eid: EndpointId.OPTIMISM_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const polygonContract: OmniPointHardhat = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const tronContract: OmniPointHardhat = {
    eid: EndpointId.TRON_V2_MAINNET,
    contractName: 'vTAOOFT',
}

const tonContract: OmniPointHardhat = {
    eid: EndpointId.TON_V2_MAINNET,
    address: '',
}

const solanaContract: OmniPointHardhat = {
    eid: EndpointId.SOLANA_V2_MAINNET,
    address: '',
}

// For this example's simplicity, we will use the same enforced options values for sending to all chains
// For production, you should ensure `gas` is set to the correct value through profiling the gas usage of calling OFT._lzReceive(...) on the destination chain
// To learn more, read https://docs.layerzero.network/v2/concepts/applications/oapp-standard#execution-options-and-enforced-settings
const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80_000,
        value: 0,
    },
]

const channelSecuritySettings: [string[], [string[], number]] = [
    // Mandatory DVN names
    ['LayerZero Labs' /* <our DVN> ← add more DVN names here */],
    // Optional DVN names, threshold
    [[], 0],
]

const polygonConfs: BlockConfirmationsDefinition = 512
const arbConfs: BlockConfirmationsDefinition = 20
const baseConfs: BlockConfirmationsDefinition = 10
const beraConfs: BlockConfirmationsDefinition = 20
const bscConfs: BlockConfirmationsDefinition = 20
const ethConfs: BlockConfirmationsDefinition = 15
const gnosisConfs: BlockConfirmationsDefinition = 5
const opConfs: BlockConfirmationsDefinition = 20
const tronConfs: BlockConfirmationsDefinition = 5
const subevmConfs: BlockConfirmationsDefinition = 10

// With the config generator, pathways declared are automatically bidirectional
// i.e. if you declare A,B there's no need to declare B,A
const pathways: TwoWayConfig[] = generatedConfig.contracts.map((contract) => [
    tronContract,
    contract.contract,
    channelSecuritySettings,
    [
        tronConfs, // Use confirmations as found in the generated config
        generatedConfig.connections.find((c) => c.to.eid === contract.contract.eid)?.config?.receiveConfig?.ulnConfig
            ?.confirmations || 10,
    ],
    [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS],
])

function getEndpointIdDeployment(eid: EndpointId, metadata: IMetadata) {
    const srcEidString = eid.toString()
    for (const entry of Object.values(metadata)) {
        if (entry.deployments) {
            for (const deployment of entry.deployments) {
                if (srcEidString === deployment.eid) {
                    return deployment
                }
            }
        }
    }
}

const optionalDVNsByPreference: string[] = [
    'LayerZero Labs',
    'Stargate',
    'USDT0',
    'BitGo',
    'Google Cloud',
    'Deutsche Telekom',
    'Horizen',
    'P2P',
]

function getOptionalDVNs(
    chainKey: string,
    metadata: IMetadata,
    requiredDVNs: string[],
    maxOptionalDVNs: number
): string[] {
    const optionalDVNsAsAddresses: string[] = optionalDVNsByPreference.reduce((acc, dvn) => {
        if (acc.length >= maxOptionalDVNs) {
            return acc
        }
        try {
            const dvnAddress = DVNsToAddresses([dvn], chainKey, metadata)[0]
            if (!requiredDVNs.includes(dvnAddress)) {
                return [...acc, dvnAddress]
            }
            return acc
        } catch (error) {
            if (error instanceof Error && error.message.includes("Can't find DVN:")) {
                return acc
            }
            throw error
        }
    }, [] as string[])

    return optionalDVNsAsAddresses
}

function getNewOptionalDVNs(eid: EndpointId, ulnConfig: Uln302UlnUserConfig, metadata: IMetadata): [string[], number] {
    const endpointIdDeployment = getEndpointIdDeployment(eid, metadata)
    if (!endpointIdDeployment) {
        return [[], 0]
    }

    const requiredDVNs = ulnConfig.requiredDVNs

    // add some optional DVNs, at most 2
    const optionalDVNsNew: string[] = getOptionalDVNs(endpointIdDeployment.chainKey, metadata, requiredDVNs, 2)

    // threshold of at least 1, at most length - 1, or 0 if length is 0
    const optionalDVNThresholdNew = Math.max(Math.min(optionalDVNsNew.length - 1, 0), optionalDVNsNew.length)

    return [optionalDVNsNew, optionalDVNThresholdNew]
}

export default async function () {
    // Generate the connections config based on the pathways
    const metadata = await defaultFetchMetadata()
    const connections = await generateConnectionsConfig([]) //pathways)

    const generatedConnections = generatedConfig.connections
        .filter((connection) => connection.config !== undefined)
        .filter((connection) => {
            // remove connections that are already in the connections array
            return !connections.find((c) => c.from.eid === connection.from.eid && c.to.eid === connection.to.eid)
        })

    const newConnections = [...generatedConnections, ...connections].map((connection) => {
        if (connection.config === undefined) {
            return connection
        }

        // Add optional DVNs to the connections, preferring the existing optional DVNs

        // Optional DVNs for Receive
        if (connection.config.receiveConfig?.ulnConfig?.optionalDVNs?.length == 0) {
            // get new optional DVNs
            const [optionalDVNsNew, optionalDVNThresholdNew] = getNewOptionalDVNs(
                connection.from.eid,
                connection.config.receiveConfig.ulnConfig,
                metadata
            )
            connection.config.receiveConfig.ulnConfig.optionalDVNs = optionalDVNsNew
            connection.config.receiveConfig.ulnConfig.optionalDVNThreshold = optionalDVNThresholdNew
        }

        // Optional DVNs for Send
        if (connection.config.sendConfig?.ulnConfig?.optionalDVNs?.length == 0) {
            // get new optional DVNs
            const [optionalDVNsNew, optionalDVNThresholdNew] = getNewOptionalDVNs(
                connection.from.eid,
                connection.config.sendConfig.ulnConfig,
                metadata
            )
            connection.config.sendConfig.ulnConfig.optionalDVNs = optionalDVNsNew
            connection.config.sendConfig.ulnConfig.optionalDVNThreshold = optionalDVNThresholdNew
        }

        return connection
    })

    return {
        contracts: [
            ...generatedConfig.contracts,
            //{ contract: tronContract },

            // { contract: tonContract },
            // { contract: solanaContract },
        ],
        connections: newConnections,
    }
}
