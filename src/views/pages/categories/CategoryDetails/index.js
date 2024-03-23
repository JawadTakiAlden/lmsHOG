import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import DetailsTab from "./DetailsTab";
import DeleteTab from "./DeleteTab";
import useShowCategoryDetails from "../../../../api/useShowCategoryDetails";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import LogoLoader from "../../../../components/LogoLoader";

const CategoryDetails = () => {
  const [value, setValue] = React.useState("1");
  const { category_id } = useParams();
  const { t } = useTranslation();
  const categoryDetails = useShowCategoryDetails({ category_id });
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
          <Tab label={t("categories.detail.tabs.1")} value="1" />
          <Tab label={t("categories.detail.tabs.2")} value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DetailsTab
          data={categoryDetails?.data?.data?.data}
          courseDetails={categoryDetails}
        />
      </TabPanel>
      <TabPanel value="2">
        <DeleteTab data={categoryDetails?.data?.data?.data} />
      </TabPanel>
    </TabContext>
  );
};

export default CategoryDetails;
