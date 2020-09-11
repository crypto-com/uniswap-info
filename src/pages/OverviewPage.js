import React, { useEffect } from 'react'

import styled from 'styled-components'

import 'feather-icons'

import TopTokenList from '../components/TokenList'
import PairList from '../components/PairList'
import TxnList from '../components/TxnList'
import Title from '../components/Title'

import { AutoColumn } from '../components/Column'

import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import GlobalStats from '../components/GlobalStats'
import { useAllPairData } from '../contexts/PairData'
import { useAllTokenData } from '../contexts/TokenData'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import { Box } from 'rebass'
import { formattedNum, formattedPercent } from '../utils'

import { useGlobalData, useGlobalTransactions } from '../contexts/GlobalData'

import { useMedia } from 'react-use'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  js: new Date(),
  gtmId: process.env.REACT_APP_GTM || ''
}

TagManager.initialize(tagManagerArgs)

const AnalyticTitle = styled.div`
  width: 100%;
  font-size: 40px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #0b1426;
  text-align: center;
`

function OverviewPage() {
  const allTokens = useAllTokenData()
  const allPairs = useAllPairData()

  const transactions = useGlobalTransactions()

  const { totalLiquidityUSD, oneDayVolumeUSD, volumeChangeUSD, liquidityChangeUSD } = useGlobalData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below800 = useMedia('(max-width: 800px)')

  return (
    <PageWrapper>
      <FullWrapper>
        <Title />
        <AutoColumn gap="24px" style={{ paddingBottom: below800 ? '0' : '24px', marginTop: 40 }}>
          <AnalyticTitle>DeFi Swap Analytics</AnalyticTitle>
          <GlobalStats />
        </AutoColumn>
        {below800 && ( // mobile card
          <Box mb={20}>
            <Panel>
              <Box>
                <AutoColumn gap="36px">
                  <AutoColumn gap="20px">
                    <RowBetween>
                      <TYPE.main>Volume (24hrs)</TYPE.main>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={600}>
                        {formattedNum(oneDayVolumeUSD, true)}
                      </TYPE.main>
                      <TYPE.main fontSize={12}>{formattedPercent(volumeChangeUSD)}</TYPE.main>
                    </RowBetween>
                  </AutoColumn>
                  <AutoColumn gap="20px">
                    <RowBetween>
                      <TYPE.main>Total Liquidity</TYPE.main>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.main fontSize={'1.5rem'} lineHeight={1} fontWeight={600}>
                        {formattedNum(totalLiquidityUSD, true)}
                      </TYPE.main>
                      <TYPE.main fontSize={12}>{formattedPercent(liquidityChangeUSD)}</TYPE.main>
                    </RowBetween>
                  </AutoColumn>
                </AutoColumn>
              </Box>
            </Panel>
          </Box>
        )}
        <RowBetween>
          <TYPE.largeHeader>Tokens</TYPE.largeHeader>
        </RowBetween>
        <Panel style={{ marginTop: '6px', padding: below800 && '1rem 0 0 0 ' }}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Panel>

        <RowBetween>
          <TYPE.largeHeader>Pairs</TYPE.largeHeader>
        </RowBetween>
        <Panel style={{ padding: below800 && '1rem 0 0 0 ' }}>
          <PairList pairs={allPairs} disbaleLinks={true} maxItems={50} />
        </Panel>

        <RowBetween>
          <TYPE.largeHeader>Transactions</TYPE.largeHeader>
        </RowBetween>
        <Panel style={{ margin: '1rem 0' }}>
          <TxnList transactions={transactions} />
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default OverviewPage
