import React from 'react';
import { Box, Grid, Typography, ButtonBase, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TokenSymbol from '../../../components/TokenSymbol';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

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

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '10px 20px',
    border: '2px solid #728cdf',
    borderRadius: '8px',
    color: '#fff',
  },
  latestNewsHeading: {
    color: '#fff',
    fontSize: 22,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chip2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1px 8px',
    border: '1px solid white',
    borderRadius: '16px',
    width: '100%',
  },
  chip: {
    backgroundColor: '#0aa784',
    padding: '1px 3px',
    borderRadius: '4px',
    fontSize: '12px',
    margin: '0px 10px',
  },
}));

const BombFarmsSection = () => {
  const classes = useStyles();

  return (
    <Box style={{ width: '100%' }}>
      <Box className={classes.box} style={{ padding: '0px' }}>
        <Grid container style={{ padding: '10px 20px' }}>
          <Grid item xs={10}>
            <Typography className={classes.latestNewsHeading}>Bomb Farms</Typography>
            <Typography style={{ fontSize: '12px' }}>
              Stake your LP tokens in our farms to start earning $BSHARE
            </Typography>
          </Grid>
          <Grid item xs={2} className={classes.flex}>
            <ButtonBase className={classes.chip2} style={{ justifyContent: 'center' }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ width: '100%', textAlign: 'center' }}>Claim All</Typography>
                <TokenSymbol symbol="BSHARE" size={28} />
              </Box>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }}>
            <Grid container>
              <Grid item xs={1}>
                <TokenSymbol symbol="BOMB-BTCB-LP" size={50} />
              </Grid>
              <Grid item xs={8}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography style={{ fontSize: 20 }}>BOMB-BTCB</Typography>
                  <Box className={classes.chip}>Recommended</Box>
                </Box>
              </Grid>
              <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Typography>TVL: $1,008,430</Typography>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <DividerLine full />
              </Grid>
            </Grid>

            <Box>
              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={3}>
                  <Typography style={{ fontSize: '14px' }}>Daily Returns:</Typography>
                  <Typography style={{ fontSize: '20px' }}>2%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography style={{ fontSize: '14px' }}>Your Stake:</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TokenSymbol symbol="BSHARE" size={28} />
                    <Typography>6.0000</Typography>
                  </Box>
                  <Typography>≈ $1171.62</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography style={{ fontSize: '14px' }}>Earned:</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TokenSymbol symbol="BOMB" size={28} />
                    <Typography>1160.4413</Typography>
                  </Box>
                  <Typography>≈ $298.88</Typography>
                </Grid>
                <Grid item xs={5} className={classes.flex}>
                  <Grid container className={classes.flex} spacing={2}>
                    <Grid item xs={4}>
                      <ButtonBase className={classes.chip2}>
                        <Typography>Deposit</Typography>
                        <ArrowUpwardIcon />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={4}>
                      <ButtonBase className={classes.chip2}>
                        <Typography>Withdraw</Typography>
                        <ArrowDownwardIcon />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={4}>
                      <ButtonBase className={classes.chip2} style={{ justifyContent: 'center' }}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography style={{ width: '100%', textAlign: 'center' }}>Claim Rewards</Typography>
                          <TokenSymbol symbol="BSHARE" size={28} />
                        </Box>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Divider style={{ backgroundColor: '#fff' }} />
        <Box style={{ padding: '10px 20px' }}>
          <Grid container>
            <Grid item xs={1}>
              <TokenSymbol symbol="BOMB-BTCB-LP" size={50} />
            </Grid>
            <Grid item xs={8}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ fontSize: 20 }}>BSHARE-BNB</Typography>
                <Box className={classes.chip}>Recommended</Box>
              </Box>
            </Grid>
            <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Typography>TVL: $1,008,430</Typography>
            </Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
              <DividerLine full />
            </Grid>
          </Grid>
          <Box>
            <Grid container style={{ marginTop: '10px' }}>
              <Grid item xs={3}>
                <Typography style={{ fontSize: '14px' }}>Daily Returns:</Typography>
                <Typography style={{ fontSize: '20px' }}>2%</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={{ fontSize: '14px' }}>Your Stake:</Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <TokenSymbol symbol="BSHARE" size={28} />
                  <Typography>6.0000</Typography>
                </Box>
                <Typography>≈ $1171.62</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography style={{ fontSize: '14px' }}>Earned:</Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <TokenSymbol symbol="BOMB" size={28} />
                  <Typography>1160.4413</Typography>
                </Box>
                <Typography>≈ $298.88</Typography>
              </Grid>
              <Grid item xs={5} className={classes.flex}>
                <Grid container className={classes.flex} spacing={2}>
                  <Grid item xs={4}>
                    <ButtonBase className={classes.chip2}>
                      <Typography>Deposit</Typography>
                      <ArrowUpwardIcon />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={4}>
                    <ButtonBase className={classes.chip2}>
                      <Typography>Withdraw</Typography>
                      <ArrowUpwardIcon />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={4}>
                    <ButtonBase className={classes.chip2} style={{ justifyContent: 'center' }}>
                      <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={{ width: '100%', textAlign: 'center' }}>Claim Rewards</Typography>
                        <TokenSymbol symbol="BSHARE" size={28} />
                      </Box>
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BombFarmsSection;
