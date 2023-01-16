import React, {useEffect} from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Box, Typography } from '@material-ui/core';

import HomeImage from '../../assets/img/background.jpg';

import BombFinanceSummaryCard from './components/BombFinanceSummaryCard';
import InvestSection from './components/InvestSection';
import BombFarmsSection from './components/BombFarmsSection';
import BondsSection from './components/BondsSection';
import AccountButton from '../../components/Nav/AccountButton';
import useWallet from 'use-wallet';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Dashboard = () => {
  const {account} = useWallet();

  useEffect(() => {}, [account]);

  return (
    <Page>
      <BackgroundImage />


      { account ? (
      <Box style={{ color: '#fff' }}>
        <BombFinanceSummaryCard />
        <InvestSection />
        <BombFarmsSection />
        <BondsSection />
      </Box>
      ) : (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AccountButton />
          <Typography style={{ color: '#fff', fontSize: 28, marginTop: 10 }}>Please connect your Wallet to continue!</Typography>
        </Box>
      ) }
    </Page>
  );
};

export default Dashboard;
