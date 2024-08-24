import React from "react";
import { Box, Grid, useTheme, Typography, Skeleton } from "@mui/material";
import { gridSpacing } from "../../../constant";
import useGetBasicStatistics from "../../../api/useGetBasicStatistics";
import { useTranslation } from "react-i18next";

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
  const {t} = useTranslation()
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
          title={t('dashboard.statistics_cards.titles.students')}
          description={t('dashboard.statistics_cards.descriptions.students')}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.courses_number}
          title={t('dashboard.statistics_cards.titles.subjects')}
          description={t('dashboard.statistics_cards.descriptions.subjects')}
          color={"#E87764"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.instructors_number}
          title={t('dashboard.statistics_cards.titles.instructor')}
          description={t('dashboard.statistics_cards.descriptions.instructor')}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.enrolled_number}
          title={t('dashboard.statistics_cards.titles.enrolled')}
          description={t('dashboard.statistics_cards.descriptions.enrolled')}
          color={"#A0616A"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.codes_number}
          title={t('dashboard.statistics_cards.titles.codes')}
          description={t('dashboard.statistics_cards.descriptions.codes')}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.active_code_number}
          title={t('dashboard.statistics_cards.titles.active_codes')}
          description={t('dashboard.statistics_cards.descriptions.active_codes')}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.blocked_accounts_number}
          title={t('dashboard.statistics_cards.titles.accounts')}
          description={t('dashboard.statistics_cards.descriptions.accounts')}
          color={"#795BF1"}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <StatisticCard
          value={data.data.data.categories_number}
          title={t('dashboard.statistics_cards.titles.categories')}
          description={t('dashboard.statistics_cards.descriptions.categories')}
          color={"#795BF1"}
        />
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
