import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { tokenAddressSymbolMap } from './config'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b1b4b9;
  border-radius: 50%;
  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

const StyledLetterLogo = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: #b1b4b9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`

const tokenLogoPath = symbol => {
  return `//crypto.com/price/coin-data/icon/${symbol}/color_icon.png`
}

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])
  const symbol = tokenAddressSymbolMap[address.toLowerCase()]
  if (error || BAD_IMAGES[address] || !symbol) {
    return (
      <Inline>
        <StyledLetterLogo {...rest} size={size}>
          {(symbol || '?').substring(0, 1).toUpperCase()}
        </StyledLetterLogo>
      </Inline>
    )
  }

  if (symbol === 'WETH') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={tokenLogoPath('ETH')}
          style={{ boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)', borderRadius: '24px' }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }
  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={tokenLogoPath(symbol)}
        size={size}
        onError={event => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
