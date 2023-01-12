import React from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import HomeImage from '../../assets/img/background.jpg';
// import { makeStyles } from '@material-ui/styles';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;

const useStyles = makeStyles((theme) => ({
    heading: {
      color: '100%',
    },
  }));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Page>
            <BackgroundImage />

            <Grid container>
                <Grid item xs={12}>
                    <Typography color="white" variant="body1" align="center" style={{ fontSize: 36, color: "white" }}>Bomb Finance Summary</Typography>
                </Grid>
                <Grid item xs={6}>two</Grid>
                <Grid item xs={6}>three</Grid>
                <Grid item xs={12}>four</Grid>
                <Grid item xs={12}>five</Grid>
            </Grid>
        </Page>
    )
}

export default Dashboard;