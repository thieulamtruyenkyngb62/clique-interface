import { AbstractConnector } from '@web3-react/abstract-connector'
import { Token } from './token'
import { fortmatic, injected, portis, walletconnect, walletlink } from '../connectors'
import JSBI from 'jsbi'
import { ChainId } from './chain'
import { PrivateReceivingTokenProps } from 'state/building/actions'
import IconTokenSvg from '../assets/images/icon-token.svg'
import KlaytnTokenSvg from '../assets/svg/klaytn_logo.svg'
import MATICTokenSvg from '../assets/svg/matic.svg'
import ETHTokenImg from '../assets/images/token-eth.png'
import { isDaoframeSite } from 'utils/dao'

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BAST_TOKEN: { [chainId in ChainId]: Token } = {
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, '0x719a98d252b36bacf8354a02222a57276d663d72', 18, 'STPT', 'STPT'),
  [ChainId.STP]: new Token(ChainId.STP, '0x719a98d252b36bacf8354a02222a57276d663d72', 18, 'STPT', 'STPT'),
  [ChainId.KLAYTN_BAOBAB]: new Token(
    ChainId.KLAYTN_BAOBAB,
    '0x719a98d252b36bacf8354a02222a57276d663d72',
    18,
    'STPT',
    'STPT'
  ),
  [ChainId.MATIC]: new Token(ChainId.MATIC, '0x719a98d252b36bacf8354a02222a57276d663d72', 18, 'STPT', 'STPT'),
  [ChainId.POLYGON_TESTNET]: new Token(
    ChainId.POLYGON_TESTNET,
    '0x719a98d252b36bacf8354a02222a57276d663d72',
    18,
    'STPT',
    'STPT'
  )
}

export const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]

export const DAO_FACTORY_ADDRESS = {
  [ChainId.RINKEBY]: '0x9C15CD1F9069A11E8D1b64F57633bBE4Aa671239',
  [ChainId.STP]: '0x706d4f4E574Fd1A919c4Dad4cDCf6349a5bB1759',
  [ChainId.KLAYTN_BAOBAB]: '0x4cAdc16713DbFDbFe9F505A5Cf8140a3C52c9571',
  [ChainId.MATIC]: '',
  [ChainId.POLYGON_TESTNET]: '0xAf64127961e233331aC24e77e6590d8b96c3Da76'
}

export const FARM_STAKING_ADDRESS = {
  [ChainId.RINKEBY]: '0xd533AB014c8138fA99A24169Ed31a19c0b42CC26',
  [ChainId.STP]: '',
  [ChainId.KLAYTN_BAOBAB]: '',
  [ChainId.MATIC]: '',
  [ChainId.POLYGON_TESTNET]: ''
}

export const DefaultChainId = ChainId.STP

export const PriceDecimals = 12

// price decimals 12
export const privateReceivingTokens: { [chainid in ChainId]: PrivateReceivingTokenProps[] } = {
  [ChainId.RINKEBY]: [
    {
      name: 'TT',
      value: 'TT',
      chainId: 4,
      logo: IconTokenSvg,
      address: '0x86029a4deD57C14Bb8620ED177F3B2a4D300C040',
      decimals: 18
    },
    {
      name: 'ETH',
      value: 'ETH',
      chainId: 4,
      logo: ETHTokenImg,
      address: ZERO_ADDRESS,
      decimals: 18
    }
  ],
  [ChainId.STP]: [
    {
      name: 'STPT',
      value: 'STPT',
      chainId: 72,
      logo: IconTokenSvg,
      address: ZERO_ADDRESS,
      decimals: 18
    },
    {
      name: 'TT',
      value: 'TT',
      chainId: 72,
      logo: IconTokenSvg,
      address: '0x1030222B08320C659078537F80D03FD82B858Eb3',
      decimals: 18
    }
  ],
  [ChainId.KLAYTN_BAOBAB]: [
    {
      name: 'TT',
      value: 'TT',
      chainId: 1001,
      logo: IconTokenSvg,
      address: '0xc8f97936d7aad25466213f0712036f3e7561a3d9',
      decimals: 18
    },
    {
      name: 'KLAY',
      value: 'KLAY',
      chainId: 1001,
      logo: KlaytnTokenSvg,
      address: ZERO_ADDRESS,
      decimals: 18
    }
  ],
  [ChainId.MATIC]: [
    {
      name: 'TT',
      value: 'TT',
      chainId: 1001,
      logo: IconTokenSvg,
      address: '0xfd8E6fc58E077546a320491438E3b712ab5147c6',
      decimals: 18
    },
    {
      name: 'MATIC',
      value: 'MATIC',
      chainId: 137,
      logo: MATICTokenSvg,
      address: ZERO_ADDRESS,
      decimals: 18
    }
  ],
  [ChainId.POLYGON_TESTNET]: [
    {
      name: 'TT',
      value: 'TT',
      chainId: 1001,
      logo: IconTokenSvg,
      address: '0xfd8E6fc58E077546a320491438E3b712ab5147c6',
      decimals: 18
    },
    {
      name: 'MATIC',
      value: 'MATIC',
      chainId: 80001,
      logo: MATICTokenSvg,
      address: ZERO_ADDRESS,
      decimals: 18
    }
  ]
}
export const EXTERNAL_SUPPORT_NETWORK = [4]
export const BASE_DAO_SUPPORT_NETWORK = [4, 72, 1001]
export const CROSS_SUPPORT_IMPORT_NETWORK = [4]
export const CROSS_SUPPORT_CREATE_NETWORK = [72, 80001]
export const stpExplorerBaseUrl = 'https://testnet-explorer.stp.network/'
export const serverBaseUrl = isDaoframeSite() ? 'https://api.daoframe.com/' : 'https://testapi.myclique.io/'
// export const serverBaseUrl = isDaoframeSite() ? 'https://testapi.daoframe.com/' : 'https://testapi.daoframe.com/'
export const mycliqueUrl = 'https://test.myclique.io/'
export const daoframeUrl = 'https://daoframe.com/'
