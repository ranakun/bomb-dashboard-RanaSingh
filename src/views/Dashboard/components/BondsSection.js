import React from 'react';
import { Box, Typography, Grid, ButtonBase, Divider } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import TokenSymbol from '../../../components/TokenSymbol';

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '10px 20px',
    border: '2px solid #728cdf',
    borderRadius: '8px',
    color: '#fff',
  },
}));

const BondsSection = () => {
  const classes = useStyles();

  return (
    <Box style={{ width: '100%' }}>
      <Box className={classes.box} style={{ margin: '20px 0px' }}>
        <Box style={{ display: 'flex' }}>
          <TokenSymbol symbol="BBOND" size={50} />
          <Box>
            <Typography style={{ fontSize: '22px' }}>Bonds</Typography>
            <Typography style={{ fontSize: '14px' }}>
              BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1
            </Typography>
          </Box>
        </Box>

        <Grid container style={{ marginTop: '15px' }}>
          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography>Current Price: &#40;Bomb&#41;&#94;2</Typography>
            <Typography style={{ fontSize: '18px' }}>BBOND = 6.2872 BTCB</Typography>
          </Grid>
          <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography>Available to redeem:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <TokenSymbol symbol="BBOND" size={50} />
              <Typography style={{ fontSize: '20px' }}>456</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box>
              <Typography>Purchase BBond</Typography>
              <Box className={classes.flex}>
                <Typography>Bomb is over peg</Typography>
                <ButtonBase style={{ padding: '2px 10px', border: '1px solid white', borderRadius: '16px' }}>
                  <Typography style={{ textAlign: 'center' }}>Purchase</Typography>
                  <ShoppingCartIcon />
                </ButtonBase>
              </Box>
              <Divider style={{ backgroundColor: 'white', margin: '10px 0px' }} />
              <Box className={classes.flex}>
                <Typography>Bomb is over peg</Typography>
                <ButtonBase style={{ padding: '2px 10px', border: '1px solid white', borderRadius: '16px' }}>
                  <Typography style={{ textAlign: 'center' }}>Redeem</Typography>
                  <ArrowDownwardIcon />
                </ButtonBase>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BondsSection;
