import React from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "../../constant";
import WelcomeMessage from "./components/WelcomeMessage";
import StatisticsCards from "./components/StatisticsCards";
import RecentEnroll from "./components/RecentEnroll";
import PushNotification from "./components/PushNotification";
import CoursesWithTypeOfCode from "./components/CoursesWithTypeOfCode";
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
      <Grid item xs={12}>
        <CoursesWithTypeOfCode />
      </Grid>
      <Grid item xs={12}>
        <PushNotification />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
