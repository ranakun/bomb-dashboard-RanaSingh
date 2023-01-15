import React, {useCallback, useMemo}  from 'react';
import { Box, Typography, Grid, ButtonBase, Divider } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import TokenSymbol from '../../../components/TokenSymbol';
import useBondStats from '../../../hooks/useBondStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import {useTransactionAdder} from '../../../state/transactions/hooks';
import { useWallet } from "use-wallet";
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';
import UnlockWallet from '../../../components/UnlockWallet';
import useModal from '../../../hooks/useModal';
import ExchangeModal from '../../Bond/components/ExchangeModal';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';

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
  btn:  {
    padding: '2px 10px', 
    border: '1px solid white', 
    borderRadius: '16px' 
  },
  btn_disabled: {
    padding: '2px 10px', 
    border: '1px solid white', 
    borderRadius: '16px',
    opacity: 0.5
  }
}));

const BondsSection = () => {
  const classes = useStyles();
  const tBondStats = useBondStats();
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const catchError = useCatchError();
  const bondsPurchasable = useBondsPurchasable();
  const {account} = useWallet();
  const {
    contracts: { Treasury },
  } = useBombFinance();
  const addTransaction = useTransactionAdder();
  // const balance = useTokenBalance(bombFinance.BOMB);
  const [approveStatus, approve] = useApprove(bombFinance.BOMB, Treasury.address);
  const handleBuyBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );
  const handleRedeemBonds = useCallback(
    async (amount) => {
      const tx = await bombFinance.redeemBonds(amount);
      addTransaction(tx, {summary: `Redeem ${amount} BBOND`});
    },
    [bombFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title="Purchase"
      description={
        !isBondPurchasable
          ? 'BOMB is over peg'
          : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
      }
      max={bondsPurchasable}
      onConfirm={(value) => {
        handleBuyBonds(value);
        onDismiss();
      }}
      action="Purchase"
      tokenName="BBOND"
    />,
  );
  const [RedeemonPresent, RedeemonDismiss] = useModal(
    <ExchangeModal
      title="Redeem"
      description={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`
      }
      max={handleRedeemBonds}
      onConfirm={(value) => {
        handleRedeemBonds(value);
        RedeemonDismiss();
      }}
      action="Redeem"
      tokenName="BOND"
    />,
  );



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
            <Typography style={{ fontSize: '18px' }}>BBOND = {tBondPriceInBNB} BTCB</Typography>
          </Grid>
          <Grid item xs={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography>Available to redeem:</Typography>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <TokenSymbol symbol="BBOND" size={40} />
              <Typography style={{ fontSize: '50px' }}>{Number(getDisplayBalance(bondBalance))}</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box>
              <Typography>Purchase BBond</Typography>
              <Box className={classes.flex}>
                <Typography>{!bondStat || isBondRedeemable ? "Bomb is over peg":null}</Typography>
                {!!account ? (
              <>
              {approveStatus !== ApprovalState.APPROVED && bondStat || !isBondRedeemable ? (
                <ButtonBase
                className={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN ? classes.btn_disabled : classes.btn}
                disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN }
                onClick={() => catchError(approve(), `Unable to approve BOMB`)}
              >
                <Typography style={{ textAlign: 'center' }}>Approve</Typography>
                <ShoppingCartIcon />
              </ButtonBase>
              ) : (
                <ButtonBase
                className={!bondStat || isBondRedeemable ? classes.btn_disabled : classes.btn}
                disabled={!bondStat || isBondRedeemable}
                onClick={onPresent}
                >
                <Typography style={{ textAlign: 'center' }}>Purchase</Typography>
                <ShoppingCartIcon />
                </ButtonBase>
              )}
              </>
            ) : (
              <UnlockWallet />
            )}
              </Box>
              <Divider style={{ backgroundColor: 'white', margin: '10px 0px' }} />
              <Box className={classes.flex}>
                <Typography>Redeem Bomb</Typography>
                <ButtonBase className={!isBondRedeemable ? classes.btn_disabled : classes.btn}
                disabled={!isBondRedeemable}
                onClick={RedeemonPresent}
                >
                  <Typography style={{ textAlign: 'center' }}>Redeem</Typography>
                  <ArrowDownwardIcon />
                </ButtonBase>
              </Box>
              <Typography>{!isBondRedeemable ? `Enabled when 10,000 BOMB > ${BOND_REDEEM_PRICE}BTC`:null}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BondsSection;
