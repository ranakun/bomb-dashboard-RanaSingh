import React from 'react';
import { Box, Typography, Divider, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetamaskFox from '../../../assets/img/metamask-fox.svg';
import CardIcon from '../../../components/CardIcon';
import TokenSymbol from '../../../components/TokenSymbol';

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
          {price1}
        </Typography>
        <Typography style={{ color: 'white', width: '100%', fontSize: 15 }} align="center">
          {price2}
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
            currentSupply="8.66M"
            totalSupply="60.9k"
            price1="$0.24"
            price2="1.05 BTCB"
            icon="BOMB"
          />

          <DividerLine full />

          <RowData
            name="$BSHARE"
            currentSupply="11.43k"
            totalSupply="8.49M"
            price1="$300"
            price2="13000 BTCB"
            icon="BSHARE"
          />

          <DividerLine full />

          <RowData
            name="$BBOND"
            currentSupply="20.00k"
            totalSupply="175k"
            price1="$0.28"
            price2="1.15 BTCB"
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
            258
          </Typography>
          <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '6px' }} />
          <Typography style={{ color: 'white', width: '100%', fontSize: 28 }} align="center">
            03:38:36
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 20 }} align="center">
            Next Epoch in
          </Typography>
          <Divider orientation="horizontal" style={{ backgroundColor: 'rgba(255,255,255,0.4)', marginTop: '6px' }} />
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            Live TWAP: <span style={{ color: 'green' }}>1.17</span>
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            TVL: <span style={{ color: 'green' }}>$5,002,221</span>
          </Typography>
          <Typography style={{ color: 'white', width: '100%', fontSize: 14 }} align="center">
            Last Epoch TWAP: <span style={{ color: 'green' }}>1.22</span>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BombFinanceSummaryCard;
