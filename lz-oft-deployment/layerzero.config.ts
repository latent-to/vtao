import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { TwoWayConfig, generateConnectionsConfig } from '@layerzerolabs/metadata-tools'
import { OAppEnforcedOption } from '@layerzerolabs/toolbox-hardhat'

import type { OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

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

// To connect all the above chains to each other, we need the following pathways:
// Optimism <-> Arbitrum

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

const EVM_ENFORCED_OPTIONS_ARB_DESTINATION: OAppEnforcedOption[] = [
    {
        msgType: 1,
        optionType: ExecutorOptionType.LZ_RECEIVE,
        gas: 80_000, // Higher gas for Arbitrum destination
        value: 0,
    },
]

// [ requiredDVN[], [ optionalDVN[], threshold ] ]
const channelSecuritySettings: [string[], [string[], number]] = [
    // Mandatory DVN names
    ['LayerZero Labs' /* <our DVN> ← add more DVN names here */],
    // Optional DVN names, threshold
    [['Canary', 'Deutsche Telekom', 'Nethermind', 'P2P'], 2],
]

// With the config generator, pathways declared are automatically bidirectional
// i.e. if you declare A,B there's no need to declare B,A
const pathways: TwoWayConfig[] = [
    // === Arbitrum <-> All ===
    [
        arbitrumContract, // Chain A contract
        baseContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        beraContract, // Chain B contract
        channelSecuritySettings,
        [1, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        ethContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        gnosisContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        optimismContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        arbitrumContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS_ARB_DESTINATION], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Base <-> All ===
    [
        baseContract, // Chain A contract
        beraContract, // Chain B contract
        channelSecuritySettings,
        [1, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        ethContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        gnosisContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        optimismContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Bera <-> All ===
    [
        beraContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        beraContract, // Chain A contract
        ethContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        beraContract, // Chain A contract
        gnosisContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        beraContract, // Chain A contract
        optimismContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        beraContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Ethereum <-> All ===
    [
        ethContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        ethContract, // Chain A contract
        gnosisContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        ethContract, // Chain A contract
        optimismContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        ethContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Gnosis <-> All ===
    [
        gnosisContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        gnosisContract, // Chain A contract
        optimismContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        gnosisContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Optimism <-> All ===
    [
        optimismContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        optimismContract, // Chain A contract
        polygonContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === Polygon <-> All ===
    [
        polygonContract, // Chain A contract
        bscContract, // Chain B contract
        channelSecuritySettings,
        [1, 1], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    // === BSC <-> All ===
    // Already connected to Arbitrum, Base, Bera, Ethereum, Gnosis, Optimism
    // === SubEVM <-> All ===
    [
        arbitrumContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        baseContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        beraContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        bscContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        ethContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        gnosisContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        optimismContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
    [
        polygonContract, // Chain A contract
        subevmmainnetContract, // Chain B contract
        channelSecuritySettings,
        [2, 2], // [A to B confirmations, B to A confirmations]
        [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
    ],
]

export default async function () {
    // Generate the connections config based on the pathways
    const connections = await generateConnectionsConfig(pathways)
    return {
        contracts: [
            { contract: subevmmainnetContract },
            { contract: arbitrumContract },
            { contract: optimismContract },
            { contract: baseContract },
            { contract: beraContract },
            { contract: ethContract },
            { contract: gnosisContract },
            { contract: polygonContract },
            { contract: bscContract },
        ],
        connections,
    }
}
