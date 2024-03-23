import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import useShowNewsDetails from "../../../../api/useShowNewsDetails";
import DetailsTab from "./DetailsTab";
import DeleteTab from "./DeleteTab";
import { useTranslation } from "react-i18next";
import LogoLoader from "../../../../components/LogoLoader";

const NewsDetails = () => {
  const [value, setValue] = React.useState("1");
  const categoryDetails = useShowNewsDetails();
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (categoryDetails.isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoLoader />
      </Box>
    );
  }
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label={t("news.detail.tabs.1")} value="1" />
          <Tab label={t("news.detail.tabs.2")} value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DetailsTab data={categoryDetails?.data?.data?.data} />
      </TabPanel>
      <TabPanel value="2">
        <DeleteTab data={categoryDetails?.data?.data?.data} />
      </TabPanel>
    </TabContext>
  );
};

export default NewsDetails;
