import React from "react";
import { Box, Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { gridSpacing } from "../../../constant";
import useGetBasicStatistics from "../../../api/useGetBasicStatistics";

const SkeletonLoader = () => {
   return <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
      <CardWrapper>
        <Skeleton variant="rectangular" width={210} height={100} />
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width={180} height={20} />
      </CardWrapper>
      </Grid>
    </Grid>
}

const CardWrapper = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        borderRadius: "15px",
        backgroundColor: theme.palette.common.white,
        p: 3,
        transition : '0.3s',
        "&:hover" : {
          boxShadow: "0px 1px 11.100000381469727px 0px #00000026",
        }
      }}
    >
      {children}
    </Box>
  );
};

const StatisticCard = ({ value, title, description, color }) => {
  const theme = useTheme();
  return (
    <CardWrapper>
      <Typography
        sx={{
          color: color || "#0794EB",
          fontSize: "48px",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "400",
          textTransform: "capitalize",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "400",
          textTransform: "capitalize",
          color: theme.palette.grey[600],
        }}
      >
        {description}
      </Typography>
    </CardWrapper>
  );
};

const StatisticsCards = () => {
  const {isLoading , isError , data , error} = useGetBasicStatistics()

  if(isLoading){
    return <SkeletonLoader />
  }

  if(isError){
    return JSON.stringify(error)
  }
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.students_number}
          title={"students"}
          description={"number of students"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.courses_number}
          title={"Subjects"}
          description={"number of subjects"}
          color={"#E87764"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.instructors_number}
          title={"Instructor"}
          description={"number of Instructor"}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.enrolled_number}
          title={"Enrolled"}
          description={"number of Enrolled"}
          color={"#A0616A"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.codes_number}
          title={"Codes"}
          description={"All Generated Codes"}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.active_code_number}
          title={"Codes"}
          description={"inuse Generated Codes"}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.blocked_accounts_number}
          title={"Accounts"}
          description={"Blocked Accounts Number"}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.categories_number}
          title={"Categories"}
          description={"Categories Number"}
          color={"#795BF1"}
        />
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
