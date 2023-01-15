import React, { useMemo } from 'react';
import { Box, Grid, Typography, ButtonBase, Card, CardContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TokenSymbol from '../../../components/TokenSymbol';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import { FaDiscord } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import usebShareStats from '../../../hooks/usebShareStats';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../../hooks/useBombStats';
import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';
import CountUp from 'react-countup';
import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import DepositModal from '../../Boardroom/components/DepositModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useBombFinance from '../../../hooks/useBombFinance';
import useModal from '../../../hooks/useModal';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import WithdrawModal from '../../Boardroom/components/WithdrawModal';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import useClaimRewardTimerBoardroom from '../../../hooks/boardroom/useClaimRewardTimerBoardroom';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecorationLine: 'underline',
    color: '#728cdf',
    cursor: 'pointer',
    textAlign: 'right',
  },
  btn: {
    backgroundColor: '#12939d',
    color: '#fff',
    width: '100%',
    padding: '5px',
    margin: '5px 0px',
  },
  btn2: {
    backgroundColor: '#8c9e99',
    color: '#000',
    width: '100%',
    padding: '5px',
    margin: '5px 0px',
  },
  box: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '10px 20px',
    border: '2px solid #728cdf',
    borderRadius: '8px',
    color: '#fff',
  },
  chip: {
    backgroundColor: '#0aa784',
    padding: '1px 3px',
    borderRadius: '4px',
    fontSize: '12px',
    margin: '0px 10px',
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
  chip2_disabled: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1px 8px',
    border: '1px solid white',
    borderRadius: '16px',
    width: '100%',
    opacity: 0.5,
  },
  latestNews: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '10px 20px',
    border: '2px solid #728cdf',
    borderRadius: '8px',
  },
  latestNewsHeading: {
    color: '#fff',
    fontSize: 22,
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

const InvestSection = () => {
  const classes = useStyles();
  const totalStaked = useTotalStakedOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const bShareStats = usebShareStats();
  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const BombEarnings = useEarningsOnBoardroom();
  const bombStats = useBombStats();
  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const boardroomAPR = useFetchBoardroomAPR();
  const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
    //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
  //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';
  const canClaimReward = useClaimRewardCheck();
  const { onReward } = useHarvestFromBoardroom();
  const bombFinance = useBombFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);
  const { onStake } = useStakeToBoardroom();
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );
  const { onWithdraw } = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();
  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );
  const { from, to } = useClaimRewardTimerBoardroom();

  return (
    <Box style={{ width: '100%' }}>
      <Grid container style={{ padding: '20px 0px' }}>
        <Grid item xs={8} style={{ padding: '0px 15px 0px 0px' }}>
          <a
            href="https://docs.bomb.money/welcome-start-here/strategies"
            rel="noopener noreferrer"
            target="_blank"
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Typography className={classes.link}>Read Investment Strategy &gt;</Typography>
          </a>
          <ButtonBase variant="contained" className={classes.btn} href={buyBombAddress} target="_blank">
            <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>Invest Now</Typography>
          </ButtonBase>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <ButtonBase variant="contained" className={classes.btn2}>
                <a
                  href="http://discord.bomb.money/"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                      style={{ padding: '2px 3px', backgroundColor: '#fff', borderRadius: '50%', margin: '0px 4px' }}
                    >
                      <FaDiscord size={24} color="#5969b3" />
                    </Box>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>Chat on Discord</Typography>
                  </Box>
                </a>
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <ButtonBase variant="contained" className={classes.btn2}>
                <a
                  href="https://docs.bomb.money"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                      style={{ padding: '2px 3px', backgroundColor: '#fff', borderRadius: '50%', margin: '0px 4px' }}
                    >
                      <IoDocumentText size={24} color="grey" />
                    </Box>
                    <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>Read Docs</Typography>
                  </Box>
                </a>
              </ButtonBase>
            </Grid>
          </Grid>
          <Box className={classes.box}>
            <Grid container>
              <Grid item xs={1}>
                <TokenSymbol symbol="BSHARE" size={48} />
              </Grid>
              <Grid item xs={8}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography style={{ fontSize: 20 }}>Boardroom</Typography>
                  <Box className={classes.chip}>Recommended</Box>
                </Box>
                <Typography style={{ fontSize: '12px' }}>Stake BSHARE and earn BOMB every epoch</Typography>
              </Grid>
              <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <Typography>
                  TVL:{' '}
                  <span style={{ color: 'white' }}>
                    <CountUp
                      style={{ fontSize: '16px' }}
                      end={parseInt(bSharePriceInDollars * getDisplayBalance(totalStaked))}
                      separator=","
                      prefix="$"
                    />
                  </span>
                </Typography>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <DividerLine full />
              </Grid>
            </Grid>

            <Box>
              <Typography align="right" style={{ fontSize: '16px' }}>
                Total Staked: <TokenSymbol symbol="BSHARE" size={20} />
                {parseFloat(getDisplayBalance(totalStaked)).toFixed(2)}
              </Typography>

              <Grid container style={{ marginTop: '10px' }}>
                <Grid item xs={3}>
                  <Typography style={{ fontSize: '14px' }}>Daily Returns:</Typography>
                  <Typography style={{ fontSize: '20px' }}>{(boardroomAPR / 365).toFixed(2)}%</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography style={{ fontSize: '14px' }}>Your Stake:</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TokenSymbol symbol="BSHARE" size={28} />
                    <Typography>{getDisplayBalance(stakedBalance)}</Typography>
                  </Box>
                  <Typography>≈ ${bSharePriceInDollars * getDisplayBalance(stakedBalance)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography style={{ fontSize: '14px' }}>Earned:</Typography>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TokenSymbol symbol="BOMB" size={28} />
                    <Typography>={getDisplayBalance(BombEarnings)}</Typography>
                  </Box>
                  <Typography>≈ ${bombPriceInDollars * getDisplayBalance(BombEarnings)}</Typography>
                </Grid>
                <Grid item xs={5} className={classes.flex}>
                  <Grid container className={classes.flex} spacing={2}>
                    <Grid item xs={6}>
                      <ButtonBase
                        className={classes.chip2}
                        onClick={approveStatus !== ApprovalState.APPROVED ? approve : onPresentDeposit}
                      >
                        <Typography>{approveStatus !== ApprovalState.APPROVED ? 'Approve' : 'Deposit'}</Typography>
                        <ArrowUpwardIcon />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={6}>
                      <ButtonBase
                        className={!canWithdrawFromBoardroom || approveStatus !== ApprovalState.APPROVED ? classes.chip2_disabled : classes.chip2}
                        // cannot withdraw if token not approved
                        disabled={!canWithdrawFromBoardroom || approveStatus !== ApprovalState.APPROVED}
                        onClick={onPresentWithdraw}
                      >
                        <Typography>Withdraw</Typography>
                        <ArrowDownwardIcon />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                      {canWithdrawFromBoardroom ? (
                        ''
                      ) : (
                        <Card>
                          <CardContent>
                            <Typography style={{ textAlign: 'center' }}>Withdraw possible in</Typography>
                            <ProgressCountdown
                              hideBar={true}
                              base={from}
                              deadline={to}
                              description="Withdraw available in"
                            />
                          </CardContent>
                        </Card>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonBase
                        style={{ justifyContent: 'center' }}
                        onClick={onReward}
                        className={BombEarnings.eq(0) || !canClaimReward ? classes.chip2_disabled : classes.chip2}
                        disabled={BombEarnings.eq(0) || !canClaimReward}
                      >
                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Typography style={{ width: '100%', textAlign: 'center' }}>Claim Rewards</Typography>
                          <TokenSymbol symbol="BSHARE" size={28} />
                        </Box>
                      </ButtonBase>
                      <Box mt={2} style={{ color: '#FFF' }}>
                        {canClaimReward ? (
                          ''
                        ) : (
                          <Card>
                            <CardContent>
                              <Typography style={{ textAlign: 'center' }}>Claim possible in</Typography>
                              <ProgressCountdown
                                hideBar={true}
                                base={from}
                                deadline={to}
                                description="Claim available in"
                              />
                            </CardContent>
                          </Card>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className={classes.latestNews}>
          <Typography className={classes.latestNewsHeading}>Latest News</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InvestSection;
