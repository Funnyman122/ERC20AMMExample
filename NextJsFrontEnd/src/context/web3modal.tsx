'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '8d5263e58362992b4c151baa40d9e0a7'

// 2. Set chains
const mainnet = [{
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}, {
  chainId: 10,
  name: 'Optimism',
  currency: 'ETH',
  explorerUrl: 'https://optimistic.etherscan.io',
  rpcUrl: 'https://mainnet.optimism.io'

}]

// 3. Create a metadata object
const metadata = {
  name: 'Dex',
  description: 'My Website description',
  url: 'https://images.bal.sh', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}
// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
})

createWeb3Modal({
  ethersConfig,
  chains: [...mainnet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
})

export function Web3Modal({ children }: {children:any}) {
  return children
}