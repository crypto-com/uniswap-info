import React, { useState } from 'react'
import styled from 'styled-components'
import { RowFixed } from '../Row'
import { formattedPercent } from '../../utils'

import { TYPE } from '../../Theme'

import { Text } from 'rebass'

import ETH_icon from '../../assets/eth.png'

const BoxContainer = styled.div`
  height: 100px;
  width: 1fr;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  background-color: '#FFFFFF';
  flex: 1;
`

interface Props {
  percentage?: number | string
  title: string
  ethIcon?: string | null
  amount: string | number
}

export default function StatsBox({ percentage, title, ethIcon, amount } : Props) {
  const formatted = percentage && percentage !== Number.POSITIVE_INFINITY ? formattedPercent(percentage) : null

  return (
    <BoxContainer>
      <Text
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'center',
          display: 'flex',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        <RowFixed
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <TYPE.light_medium mr={'1rem'} style={{ position: 'relative' }}>
            {title}
          </TYPE.light_medium>
          {ethIcon ? <img style={{ width: '24px', height: '24px' }} src={ETH_icon} alt="Etheruem" /> : <div />}
        </RowFixed>
        <RowFixed style={{ width: '100%', justifyContent: 'space-between' }}>
          <TYPE.largeHeader>{amount}</TYPE.largeHeader>
          {formatted}
        </RowFixed>
      </Text>
    </BoxContainer>
  )
}
