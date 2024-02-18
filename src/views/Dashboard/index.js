import React from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../constant";
import WelcomeMessage from "./components/WelcomeMessage";
import StatisticsCards from "./components/StatisticsCards";
import RecentEnroll from "./components/RecentEnroll";
const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <WelcomeMessage />
      </Grid>
      <Grid item xs={12}>
        <StatisticsCards />
      </Grid>
      <Grid item xs={12}>
        <RecentEnroll />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
