import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { useMedia } from 'react-use'
import { Flex } from 'rebass'
import { RowFixed } from '../Row'
import Logo from '../../assets/logo_white.svg'
import SmallLogo from '../../assets/cro-icon.png'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

const ReturnText = styled.a`
  width: auto;
  height: 19px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #81868f;

  display: flex;
  align-self: center;
`

const swapLink = process.env.REACT_APP_DEFI_SWAP_APP

export default function Title() {
  const history = useHistory()

  const below1080 = useMedia('(max-width: 1080px)')
  const below680 = useMedia('(max-width: 680px)')
  const below600 = useMedia('(max-width: 600px)')
  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed style={{ width: '100%', justifyContent: 'space-between' }}>
          <a href={swapLink}>
            {below600 ? (
              <img height={'30px'} src={SmallLogo} alt="logo" />
            ) : (
              <img height={'30px'} src={Logo} alt="logo" />
            )}
          </a>
          <ReturnText href={swapLink}>{below600 ? 'Back' : 'Back to Crypto.com DeFi Swap'}</ReturnText>
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}
