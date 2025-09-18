'use client'

import { useState, useEffect } from 'react'
import { useMiniKit } from '@coinbase/minikit'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnect() {
  const { user, context } = useMiniKit()
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string>('')

  useEffect(() => {
    if (user?.wallet?.address) {
      setIsConnected(true)
      setAddress(user.wallet.address)
    } else {
      setIsConnected(false)
      setAddress('')
    }
  }, [user])

  const handleConnect = async () => {
    try {
      // MiniKit handles wallet connection automatically
      console.log('Wallet connection initiated')
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setAddress('')
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 bg-surface px-3 py-2 rounded-lg">
          <Wallet size={16} className="text-primary" />
          <span className="text-sm text-text-primary font-medium">
            {formatAddress(address)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors"
          title="Disconnect"
        >
          <LogOut size={16} />
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center space-x-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      <Wallet size={16} />
      <span className="text-sm font-medium">Connect</span>
    </button>
  )
}
