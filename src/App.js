import React, { useState } from 'react'
import styled from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client'
import { Route, BrowserRouter } from 'react-router-dom'
import { useGlobalData, useGlobalChartData } from './contexts/GlobalData'
import OverviewPage from './pages/OverviewPage'

import LocalLoader from './components/LocalLoader'
import { useLatestBlock } from './contexts/Application'

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
`
const ContentWrapper = styled.div`
  display: grid;

  @media screen and (max-width: 1400px) {
  }

  @media screen and (max-width: 1080px) {
    max-width: 100vw;
    overflow: hidden;
    grid-gap: 0;
  }
`

/**
 * Wrap the component with the header and sidebar pinned tab
 */
const LayoutWrapper = ({ children, savedOpen, setSavedOpen }) => {
  return (
    <>
      <ContentWrapper open={savedOpen}>{children}</ContentWrapper>
    </>
  )
}

function App() {
  const [savedOpen, setSavedOpen] = useState(false)

  const globalData = useGlobalData()
  const globalChartData = useGlobalChartData()
  const latestBlock = useLatestBlock()
  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        {latestBlock &&
        globalData &&
        Object.keys(globalData).length > 0 &&
        globalChartData &&
        Object.keys(globalChartData).length > 0 ? (
          <BrowserRouter basename="/defi/swap-info">
            <Route path="/" exact>
              <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                <OverviewPage />
              </LayoutWrapper>
            </Route>
          </BrowserRouter>
        ) : (
          <LocalLoader fill="true" />
        )}
      </AppWrapper>
    </ApolloProvider>
  )
}

export default App
