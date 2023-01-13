import React from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { Box } from '@material-ui/core';

import HomeImage from '../../assets/img/background.jpg';

import BombFinanceSummaryCard from './components/BombFinanceSummaryCard';
import InvestSection from './components/InvestSection';
import BombFarmsSection from './components/BombFarmsSection';
import BondsSection from './components/BondsSection';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const Dashboard = () => {
  return (
    <Page>
      <BackgroundImage />

      <Box style={{ color: '#fff' }}>
        <BombFinanceSummaryCard />
        <InvestSection />
        <BombFarmsSection />
        <BondsSection />
      </Box>
    </Page>
  );
};

export default Dashboard;
