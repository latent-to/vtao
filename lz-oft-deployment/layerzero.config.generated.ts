import { EndpointId } from '@layerzerolabs/lz-definitions'
import { OAppEdgeConfig, OmniEdgeHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'
const arbitrum_mainnetContract = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const base_mainnetContract = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const bera_mainnetContract = {
    eid: EndpointId.BERA_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const bsc_mainnetContract = {
    eid: EndpointId.BSC_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const ethereum_mainnetContract = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const gnosis_mainnetContract = {
    eid: EndpointId.GNOSIS_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const optimism_mainnetContract = {
    eid: EndpointId.OPTIMISM_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const polygon_mainnetContract = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'vTAOOFT',
}
const subevm_mainnetContract = {
    eid: EndpointId.SUBTENSOREVM_V2_MAINNET,
    contractName: 'vTAOOFTAdapter',
}

const generatedConfig: {
    contracts: {
        contract: OmniPointHardhat
    }[]
    connections: OmniEdgeHardhat<OAppEdgeConfig | undefined>[]
} = {
    contracts: [
        { contract: arbitrum_mainnetContract },
        { contract: base_mainnetContract },
        { contract: bera_mainnetContract },
        { contract: bsc_mainnetContract },
        { contract: ethereum_mainnetContract },
        { contract: gnosis_mainnetContract },
        { contract: optimism_mainnetContract },
        { contract: polygon_mainnetContract },
        { contract: subevm_mainnetContract },
    ],
    connections: [
        {
            from: arbitrum_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x2f55C492897526677C5B68fb199ea31E2c126416',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: arbitrum_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
                receiveLibraryConfig: {
                    receiveLibrary: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x31CAe3B7fB82d847621859fb1585353c5720660D' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x758C419533ad64Ce9D3413BC8d3A97B026098EC1'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x758C419533ad64Ce9D3413BC8d3A97B026098EC1'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xcd37CA043f8479064e10635020c65FfC005d36f6',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xcd37CA043f8479064e10635020c65FfC005d36f6',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x9e059a54699a285714207b43B055483E78FAac25',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: base_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x6498b0632f3834D7647367334838111c8C889703'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x6498b0632f3834D7647367334838111c8C889703'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x282b3386571f7f794450d5789911a9804FA346b4',
                            '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x282b3386571f7f794450d5789911a9804FA346b4',
                            '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x282b3386571f7f794450d5789911a9804FA346b4',
                            '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x282b3386571f7f794450d5789911a9804FA346b4',
                            '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bera_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x31F748a368a893Bdb5aBB67ec95F232507601A73',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x31F748a368a893Bdb5aBB67ec95F232507601A73',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                            '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: bsc_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
                receiveLibraryConfig: {
                    receiveLibrary: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0xe9b5E4f9395a60799F4F608Ba3ABebDfC0ee6D9C'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0xe9b5E4f9395a60799F4F608Ba3ABebDfC0ee6D9C'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xa59BA433ac34D2927232918Ef5B2eaAfcF130BA5',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xa59BA433ac34D2927232918Ef5B2eaAfcF130BA5',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: ethereum_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
                receiveLibraryConfig: {
                    receiveLibrary: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x173272739Bd7Aa6e4e214714048a9fE699453059' },
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x747C741496a507E4B404b50463e691A8d692f6Ac'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x747C741496a507E4B404b50463e691A8d692f6Ac'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: ['0x8a893567f27893e6E0c7b6bba8769d9ab3E911Ff'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x8a893567f27893e6E0c7b6bba8769d9ab3E911Ff'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x11bb2991882a86Dc3E38858d922559A385d506bA',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: gnosis_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0x3C156b1f625D2B4E004D43E91aC2c3a719C29c7B',
                receiveLibraryConfig: {
                    receiveLibrary: '0x9714Ccf1dedeF14BaB5013625DB92746C1358cb4',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x38340337f9ADF5D76029Ab3A667d34E5a032F7BA' },
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: ['0x8a893567f27893e6E0c7b6bba8769d9ab3E911Ff'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x8a893567f27893e6E0c7b6bba8769d9ab3E911Ff'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x6A02D83e8d433304bba74EF1c427913958187142',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: optimism_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                receiveLibraryConfig: {
                    receiveLibrary: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e' },
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0xEbc3065003e67CaaC747836dA272d9E5271A37e1'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0xEbc3065003e67CaaC747836dA272d9E5271A37e1'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0x31F748a368a893Bdb5aBB67ec95F232507601A73',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0x31F748a368a893Bdb5aBB67ec95F232507601A73',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            '0x23DE2FE932d9043291f870324B74F820e11dc81A',
                            '0xD56e4eAb23cb81f43168F9F45211Eb027b9aC7cc',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: polygon_mainnetContract,
            to: subevm_mainnetContract,
            config: {
                sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
                receiveLibraryConfig: {
                    receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0xCd3F213AD101472e1713C72B1697E727C803885b' },
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: ['0x43CFcc293CdF99F7D021F21FfD443f174AB0e843'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x43CFcc293CdF99F7D021F21FfD443f174AB0e843'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: arbitrum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: base_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: bera_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: bsc_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: ethereum_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: gnosis_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(5),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: optimism_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
        {
            from: subevm_mainnetContract,
            to: polygon_mainnetContract,
            config: {
                sendLibrary: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
                receiveLibraryConfig: {
                    receiveLibrary: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: { maxMessageSize: 10000, executor: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b' },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(512),
                        requiredDVNs: ['0x282b3386571f7f794450d5789911a9804FA346b4'],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
            },
        },
    ],
}

export default generatedConfig
