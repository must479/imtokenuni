/**
 * Add opacity information to a hex color
 * @param amount opacity value from 0 to 100
 * @param hexColor
 */

import { useWeb3React } from '@web3-react/core'
import { BaseVariant } from 'featureFlags'
import { useRedesignFlag } from 'featureFlags/flags/redesign'
import { useEffect, useState } from 'react'
import { useDarkModeManager } from 'state/user/hooks'

import { SupportedChainId } from '../constants/chains'

export function opacify(amount: number, hexColor: string): string {
  if (!hexColor.startsWith('#')) {
    return hexColor
  }

  if (hexColor.length !== 7) {
    throw new Error(`opacify: provided color ${hexColor} was not in hexadecimal format (e.g. #000000)`)
  }

  if (amount < 0 || amount > 100) {
    throw new Error('opacify: provided amount should be between 0 and 100')
  }

  const opacityHex = Math.round((amount / 100) * 255).toString(16)
  const opacifySuffix = opacityHex.length < 2 ? `0${opacityHex}` : opacityHex

  return `${hexColor.slice(0, 7)}${opacifySuffix}`
}

export function GlowByChain(): any {
  const { chainId } = useWeb3React()
  const [darkMode] = useDarkModeManager()
  const redesignFlag = useRedesignFlag()
  const redesignFlagEnabled = redesignFlag === BaseVariant.Enabled

  const [shadow, setShadow] = useState('')

  useEffect(() => {
    switch (chainId) {
      case SupportedChainId.ARBITRUM_ONE:
      case SupportedChainId.ARBITRUM_RINKEBY:
        setShadow(
          darkMode
            ? `box-shadow: 0px 20px 120px rgba(10, 41, 75, 0.7);`
            : `box-shadow: 0px 20px 120px rgba(205, 232, 251, 0.7);`
        )
        break
      case SupportedChainId.OPTIMISM:
      case SupportedChainId.OPTIMISM_GOERLI:
        setShadow(
          darkMode
            ? `box-shadow: 0px 20px 120px rgba(62, 46, 56, 0.8);`
            : `box-shadow: 0px 20px 120px rgba(255, 251, 242, 0.8);`
        )
        break
      case SupportedChainId.POLYGON:
      case SupportedChainId.POLYGON_MUMBAI:
        setShadow(
          darkMode
            ? `box-shadow: 0px 20px 120px rgba(130, 71, 229, 0.2);`
            : `box-shadow: 0px 20px 120px rgba(130, 71, 229, 0.2);`
        )
        break
      case SupportedChainId.CELO:
      case SupportedChainId.CELO_ALFAJORES:
        setShadow(
          darkMode
            ? `box-shadow: 0px 20px 120px rgba(186, 228, 210, 0.7);`
            : `box-shadow: 0px 20px 120px rgba(20, 49, 37, 0.29);`
        )
        break
      default:
        setShadow(
          darkMode
            ? `box-shadow: 0px 40px 120px rgba(251, 17, 142, 0.30);`
            : `box-shadow: 0px 40px 120px rgba(251, 17, 142, 0.30);`
        )
        break
    }
  }, [chainId, darkMode, redesignFlagEnabled])

  return shadow
}
