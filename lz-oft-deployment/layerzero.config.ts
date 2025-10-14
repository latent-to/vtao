import fs from 'fs'

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

const avaxContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_MAINNET,
    contractName: 'vTAOOFT',
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

const channelSecuritySettings: [string[], [string[], number] | []] = [
    // Mandatory DVN names
    ['LayerZero Labs' /* <our DVN> ← add more DVN names here */],
    // Optional DVN names, threshold
    [],
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
const pathwaysTron: TwoWayConfig[] = generatedConfig.contracts.map((contract) => [
    tronContract,
    contract.contract,
    channelSecuritySettings,
    [tronConfs, 10],
    [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS],
])

const pathwaysAvax: TwoWayConfig[] = generatedConfig.contracts.map((contract) => [
    avaxContract,
    contract.contract,
    channelSecuritySettings,
    [
        12,
        Number(
            generatedConfig.connections.find((c) => c.from.eid === contract.contract.eid)?.config?.sendConfig?.ulnConfig
                ?.confirmations ?? 12
        ),
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

function AddressToDvn(address: string, eid: EndpointId, metadata: IMetadata): string {
    const addressAsLowercase = address.toLowerCase()
    const endpointIdDeployment = getEndpointIdDeployment(eid, metadata)
    if (!endpointIdDeployment) {
        throw new Error(`Can't find endpointIdDeployment for eid: "${eid}".`)
    }
    const chainKey = endpointIdDeployment.chainKey

    if (!metadata[chainKey].dvns) {
        throw new Error(`Can't find DVNs for chainKey: "${chainKey}".`)
    }
    if (!metadata[chainKey].dvns[addressAsLowercase]) {
        throw new Error(`Can't find DVN for address: "${address}" on chainKey: "${chainKey}".`)
    }

    return metadata[chainKey].dvns[addressAsLowercase].canonicalName
}

function setsEqual(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) {
        return false
    }
    return Array.from(set1).every((dvn) => set2.has(dvn)) && Array.from(set2).every((dvn) => set1.has(dvn))
}

function getOptionalDVNs(
    srcChainKey: string,
    destChainKey: string,
    metadata: IMetadata,
    requiredDVNs: string[],
    maxOptionalDVNs: number
): string[] {
    const optionalDVNsAsAddresses: string[] = optionalDVNsByPreference.reduce((acc, dvn) => {
        if (acc.length >= maxOptionalDVNs) {
            return acc
        }
        try {
            if (requiredDVNs.includes(dvn)) {
                return acc
            }
            // Check if the DVN is available on the destination chain
            const srcDVN = DVNsToAddresses([dvn], srcChainKey, metadata)[0]
            if (!srcDVN) {
                return acc
            }
            const destDVN = DVNsToAddresses([dvn], destChainKey, metadata)[0]
            if (!destDVN) {
                return acc
            }

            return [...acc, dvn] // Add the DVN to the optional DVNs
        } catch (error) {
            if (error instanceof Error && error.message.includes("Can't find DVN:")) {
                return acc
            }
            throw error
        }
    }, [] as string[])

    return optionalDVNsAsAddresses
}

function getNewOptionalDVNs(
    srcEid: EndpointId,
    destEid: EndpointId,
    requiredDVNs: string[],
    metadata: IMetadata
): [string[], number] | undefined {
    const srcEndpointIdDeployment = getEndpointIdDeployment(srcEid, metadata)
    const destEndpointIdDeployment = getEndpointIdDeployment(destEid, metadata)
    if (!srcEndpointIdDeployment || !destEndpointIdDeployment) {
        return undefined
    }

    // add some optional DVNs, at most 2
    const optionalDVNsNew: string[] = getOptionalDVNs(
        srcEndpointIdDeployment.chainKey,
        destEndpointIdDeployment.chainKey,
        metadata,
        requiredDVNs,
        2
    )

    // threshold of at least 1, at most length - 1, or 0 if length is 0
    const optionalDVNThresholdNew = Math.max(Math.min(optionalDVNsNew.length - 1, 0), optionalDVNsNew.length)

    return [optionalDVNsNew, optionalDVNThresholdNew]
}

export default async function () {
    // Generate the connections config based on the pathways
    const metadata = await defaultFetchMetadata()
    const newPathways = [...pathwaysAvax].map((pathway) => {
        console.log('pathway', pathway)
        const [src, dest, channelSecuritySettings, blockConfirmations, enforcedOptions] = pathway
        const [requiredDVNs, [optionalDVNs, optionalDVNThreshold]] = channelSecuritySettings
        if (requiredDVNs.length == 0) {
            throw new Error(`Required DVNs for ${src.eid} -> ${dest.eid} are empty`)
        }
        let newOptionalDVNs = optionalDVNs ?? []
        let newOptionalDVNThreshold = optionalDVNThreshold ?? 0
        if (optionalDVNs?.length == 0) {
            const result = getNewOptionalDVNs(src.eid, dest.eid, requiredDVNs, metadata)
            if (result === undefined) {
                throw new Error(`New optional DVNs for ${src.eid} -> ${dest.eid} are undefined`)
            }

            ;[newOptionalDVNs, newOptionalDVNThreshold] = result
            channelSecuritySettings[1] = [newOptionalDVNs, newOptionalDVNThreshold]
        }
        return [src, dest, channelSecuritySettings, blockConfirmations, enforcedOptions] as TwoWayConfig
    })
    console.log('added optional DVNs', newPathways)
    const connections = await generateConnectionsConfig(newPathways)

    const generatedConnections = generatedConfig.connections
        .filter((connection) => connection.config !== undefined)
        .filter((connection) => {
            // remove connections that are already in the connections array
            return !connections.find((c) => c.from.eid === connection.from.eid && c.to.eid === connection.to.eid)
        })

    const visited = new Set<string>()

    console.log('Checking connections')
    for (const connection of generatedConnections) {
        try {
            if (connection.config === undefined) {
                throw new Error(`Connection config ${connection.from.eid} -> ${connection.to.eid} is undefined`)
            }
            // sort the eids to ensure consistent key
            const visitedKey = [connection.from.eid, connection.to.eid].sort().join('-')

            if (visited.has(visitedKey)) {
                continue
            }
            visited.add(visitedKey)
            console.log(`Checking connection ${connection.from.eid} <-> ${connection.to.eid}`)
            console.log('--------------------------------')

            // find reverse-route
            const reverseRoute = generatedConnections.find(
                (c) => c.from.eid === connection.to.eid && c.to.eid === connection.from.eid
            )
            if (reverseRoute === undefined) {
                throw new Error(`Reverse route ${connection.to.eid} -> ${connection.from.eid} not found`)
            }
            if (reverseRoute.config === undefined) {
                throw new Error(`Reverse route config ${connection.from.eid} -> ${connection.to.eid} is undefined`)
            }

            // check that the reverse route has a matching config
            const fwdSendConfig = connection.config.sendConfig?.ulnConfig
            const revSendConfig = reverseRoute.config.sendConfig?.ulnConfig
            if (!fwdSendConfig) {
                throw new Error(`Send config ${connection.from.eid} -> ${connection.to.eid} is undefined`)
            }
            if (!revSendConfig) {
                throw new Error(`Send config ${connection.to.eid} -> ${connection.from.eid} is undefined`)
            }

            const fwdReceiveConfig = connection.config.receiveConfig?.ulnConfig
            const revReceiveConfig = reverseRoute.config.receiveConfig?.ulnConfig
            if (!fwdReceiveConfig) {
                throw new Error(`Receive config ${connection.from.eid} -> ${connection.to.eid} is undefined`)
            }
            if (!revReceiveConfig) {
                throw new Error(`Receive config ${connection.to.eid} -> ${connection.from.eid} is undefined`)
            }

            // check that the send configs are equal
            if (fwdSendConfig.optionalDVNThreshold !== revReceiveConfig.optionalDVNThreshold) {
                throw new Error(
                    `Optional DVN threshold ${connection.from.eid} -> ${connection.to.eid} does not match ${connection.to.eid} -> ${connection.from.eid}`
                )
            }
            if (fwdSendConfig.optionalDVNs?.length !== revReceiveConfig.optionalDVNs?.length) {
                throw new Error(
                    `Optional DVN length ${connection.from.eid} -> ${connection.to.eid} does not match ${connection.to.eid} -> ${connection.from.eid}`
                )
            }
            if (fwdSendConfig.requiredDVNs?.length !== revReceiveConfig.requiredDVNs?.length) {
                throw new Error(
                    `Required DVN length ${connection.from.eid} -> ${connection.to.eid} does not match ${connection.to.eid} -> ${connection.from.eid}`
                )
            }

            if (revSendConfig.optionalDVNThreshold !== fwdReceiveConfig.optionalDVNThreshold) {
                throw new Error(
                    `Optional DVN threshold ${connection.to.eid} -> ${connection.from.eid} does not match ${connection.from.eid} -> ${connection.to.eid}`
                )
            }
            if (revSendConfig.optionalDVNs?.length !== fwdReceiveConfig.optionalDVNs?.length) {
                throw new Error(
                    `Optional DVN length ${connection.to.eid} -> ${connection.from.eid} does not match ${connection.from.eid} -> ${connection.to.eid}`
                )
            }
            if (revSendConfig.requiredDVNs?.length !== fwdReceiveConfig.requiredDVNs?.length) {
                throw new Error(
                    `Required DVN length ${connection.to.eid} -> ${connection.from.eid} does not match ${connection.from.eid} -> ${connection.to.eid}`
                )
            }

            // Check the actual DVNs
            const fwdSendRequiredDVNs = new Set(
                fwdSendConfig.requiredDVNs.map((dvn) => AddressToDvn(dvn, connection.from.eid, metadata))
            )
            const revReceiveRequiredDVNs = new Set(
                revReceiveConfig.requiredDVNs.map((dvn) => AddressToDvn(dvn, connection.to.eid, metadata))
            )

            if (!setsEqual(fwdSendRequiredDVNs, revReceiveRequiredDVNs)) {
                throw new Error(
                    `Required DVNs on ${connection.from.eid} -> ${connection.to.eid} do not match ${connection.to.eid} -> ${connection.from.eid}`
                )
            }

            // Check the optional DVNs
            const fwdSendOptionalDVNs = new Set(
                fwdSendConfig.optionalDVNs?.map((dvn) => AddressToDvn(dvn, connection.from.eid, metadata)) ?? []
            )
            const revReceiveOptionalDVNs = new Set(
                revReceiveConfig.optionalDVNs?.map((dvn) => AddressToDvn(dvn, connection.to.eid, metadata)) ?? []
            )

            if (!setsEqual(fwdSendOptionalDVNs, revReceiveOptionalDVNs)) {
                throw new Error(
                    `Optional DVNs on ${connection.from.eid} -> ${connection.to.eid} do not match ${connection.to.eid} -> ${connection.from.eid}`
                )
            }

            // Check other direction
            const revSendRequiredDVNs = new Set(
                revSendConfig.requiredDVNs.map((dvn) => AddressToDvn(dvn, connection.to.eid, metadata))
            )
            const fwdReceiveRequiredDVNs = new Set(
                fwdReceiveConfig.requiredDVNs.map((dvn) => AddressToDvn(dvn, connection.from.eid, metadata))
            )
            if (!setsEqual(revSendRequiredDVNs, fwdReceiveRequiredDVNs)) {
                throw new Error(
                    `Required DVNs on ${connection.to.eid} -> ${connection.from.eid} do not match ${connection.from.eid} -> ${connection.to.eid}`
                )
            }

            const revSendOptionalDVNs = new Set(
                revSendConfig.optionalDVNs?.map((dvn) => AddressToDvn(dvn, connection.to.eid, metadata)) ?? []
            )
            const fwdReceiveOptionalDVNs = new Set(
                fwdReceiveConfig.optionalDVNs?.map((dvn) => AddressToDvn(dvn, connection.from.eid, metadata)) ?? []
            )
            if (!setsEqual(revSendOptionalDVNs, fwdReceiveOptionalDVNs)) {
                throw new Error(
                    `Optional DVNs on ${connection.to.eid} -> ${connection.from.eid} do not match ${connection.from.eid} -> ${connection.to.eid}`
                )
            }
        } catch (error) {
            console.error(`Error checking connection ${connection.from.eid} <-> ${connection.to.eid}`)
            const eidFromAsDeployment = getEndpointIdDeployment(connection.from.eid, metadata)
            const eidToAsDeployment = getEndpointIdDeployment(connection.to.eid, metadata)

            console.error(`${eidFromAsDeployment?.chainKey} <-> ${eidToAsDeployment?.chainKey}`)
            throw error
        }
    }
    console.log('Connections checked')
    const newConnections = [...generatedConnections, ...connections].filter((connection) => connection !== undefined)

    console.log('Using new connections', newConnections)
    fs.writeFileSync(
        'new-connections.json',
        JSON.stringify(
            newConnections,
            (key, value) => (typeof value === 'bigint' || value instanceof BigInt ? value.toString() : value),
            2
        )
    )

    return {
        contracts: [
            ...generatedConfig.contracts,
            { contract: avaxContract },
            //{ contract: tronContract },

            // { contract: tonContract },
            // { contract: solanaContract },
        ],
        connections: newConnections,
    }
}
