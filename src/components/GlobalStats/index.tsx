import React from 'react'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import StatsBox from '../StatsBox'
import { useMedia } from 'react-use'
import { useGlobalData, useEthPrice } from '../../contexts/GlobalData'

import { formattedNum, localNumber } from '../../utils'

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`

const RowGrid = styled(RowBetween)`
  display: grid;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  @media (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export default function GlobalStats() {
  const SHOW_PERCENTAGES = process.env.REACT_APP_SHOW_PERCENT === 'true'

  const below816 = useMedia('(max-width: 816px)')

  // src/context/GlobalData:267-304
  const {
    oneDayVolumeUSD,
    volumeChangeUSD,
    oneDayTxns,
    txnChange,
    totalLiquidityUSD,
    liquidityChangeUSD
  } = useGlobalData()

  const [ethPrice, oneDayPrice] = useEthPrice()
  const formattedEthPrice = ethPrice ? formattedNum(ethPrice, true) : '-'

  let ethPercentage = ((ethPrice - oneDayPrice) * 100) / oneDayPrice

  return (
    <Header>
      <RowGrid style={{ padding: below816 ? '0.5rem' : '.5rem' }}>
        <StatsBox title="ETH Price" ethIcon amount={formattedEthPrice} percentage={SHOW_PERCENTAGES && ethPercentage} />
        <StatsBox
          title="Total Liquidity"
          amount={formattedNum(totalLiquidityUSD, true)}
          percentage={SHOW_PERCENTAGES && liquidityChangeUSD}
        />
        <StatsBox
          title="Volume (24H):"
          amount={formattedNum(oneDayVolumeUSD, true)}
          percentage={SHOW_PERCENTAGES && volumeChangeUSD}
        />
        <StatsBox
          title=" Transactions (24H)"
          amount={localNumber(oneDayTxns)}
          percentage={SHOW_PERCENTAGES && txnChange}
        />
      </RowGrid>
    </Header>
  )
}
