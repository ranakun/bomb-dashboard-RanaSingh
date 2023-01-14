import React, { useMemo } from 'react';
import { Box, Typography, Divider, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import ProgressCountdown from './ProgressCountdown';
import moment from 'moment';
import TokenSymbol from '../../../components/TokenSymbol';
import { roundAndFormatNumber } from '../../../0x';
import useBondStats from '../../../hooks/useBondStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useBombStats from '../../../hooks/useBombStats';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import CountUp from 'react-countup';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useCashPriceInPreviousEpochTWAP from '../../../hooks/useCashPriceInPreviousEpochTWAP';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  listHeading: {
    color: '#fff',
    fontSize: '12px',
    textAlign: 'center',
  },
}));

const DividerLine = ({ full }) => {
  return (
    <Grid container style={{ margin: '10px' }}>
      {!full && <Grid item xs={2}></Grid>}
      <Grid item xs={!full ? 10 : 12}>
        <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '4px' }} />
      </Grid>
    </Grid>
  );
};

const RowData = ({ name, currentSupply, totalSupply, price1, price2, icon }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <TokenSymbol symbol={icon} size={28} />
      </Grid>
      <Grid item xs={1} className={classes.item}>
        {name}
      </Grid>
      <Grid item xs={3} className={classes.item}>
        {currentSupply}
      </Grid>
      <Grid item xs={3} className={classes.item}>
        {totalSupply}
      </Grid>
      <Grid item xs={3} className={classes.item} style={{ flexDirection: 'column' }}>
        <Typography style={{ color: 'white', width: '100%', fontSize: 15 }} align="center">
          ${price1}
        </Typography>
        <Typography style={{ color: 'white', width: '100%', fontSize: 15 }} align="center">
          {price2} BTCB
        </Typography>
      </Grid>
      <Grid item xs={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton>
          <img alt="metamask fox" style={{ width: '25px' }} src={MetamaskFox} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const BombFinanceSummaryCard = () => {
  const classes = useStyles();
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
  const currentEpoch = useCurrentEpoch();
  const { to } = useTreasuryAllocationTimes();
  const TVL = useTotalValueLocked();
  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const cashPrice = useCashPriceInPreviousEpochTWAP();
  const bondScale = (Number(cashPrice) / 100000000000000).toFixed(4); 





  return (
    <Box style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px 40px', width: '100%' }}>
      <Typography color="white" variant="body1" align="center" style={{ fontSize: 18, color: 'white' }}>
        Bomb Finance Summary
      </Typography>
      <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '6px' }} />

      <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={6}>
          <Grid container style={{ margin: '10px' }}>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <Typography className={classes.listHeading}>Current Supply</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.listHeading}>Total Supply</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.listHeading}>Price</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <DividerLine />

          <RowData
            name={'$BOMB'}
            currentSupply={roundAndFormatNumber(bombCirculatingSupply, 2)}
            totalSupply={roundAndFormatNumber(bombTotalSupply, 2)}
            price1={bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}
            price2={bombPriceInBNB ? bombPriceInBNB : '-.----'}
            icon="BOMB"
          />

          <DividerLine full />

          <RowData
            name="$BSHARE"
            currentSupply={roundAndFormatNumber(bShareCirculatingSupply, 2)}
            totalSupply={roundAndFormatNumber(bShareTotalSupply, 2)}
            price1={bSharePriceInDollars ? roundAndFormatNumber(bSharePriceInDollars, 2) : '-.--'}
            price2={bSharePriceInBNB ? bSharePriceInBNB : '-.----'}
            icon="BSHARE"
          />

          <DividerLine full />

          <RowData
            name="$BBOND"
            currentSupply={roundAndFormatNumber(tBondCirculatingSupply, 2)}
            totalSupply={roundAndFormatNumber(tBondTotalSupply, 2)}
            price1={tBondPriceInDollars ? roundAndFormatNumber(tBondPriceInDollars, 2) : '-.--'}
            price2={tBondPriceInBNB ? tBondPriceInBNB : '-.----'}
            icon="BBOND"
          />

          <DividerLine />
        </Grid>

        <Grid item xs={4}></Grid>

        <Grid item xs={2} style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography style={{ color: 'white', width: '100%', fontSize: 20 }} align="center">
            Current Epoch
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 28 }} align="center">
            {Number(currentEpoch)}
          </Typography>
          <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '6px' }} />
          <Typography style={{ color: 'white', width: '100%', fontSize: 28 }} align="center">
          <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} />
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 20 }} align="center">
            Next Epoch in
          </Typography>
          <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '6px' }} />
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            Live TWAP: <span style={{ color: 'green' }}>{scalingFactor}</span>
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            TVL: <span style={{ color: 'green' }}><CountUp style={{ fontSize: '14px' }} end={TVL} separator="," prefix="$" /></span>
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            Last Epoch TWAP: <span style={{ color: 'green' }}>{bondScale || '-'}</span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BombFinanceSummaryCard;
