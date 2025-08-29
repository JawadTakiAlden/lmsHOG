import { ArrowBack } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, IconButton, Tab } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import Detailtab from "./Detailtab";
import useShowQuestion from "../../../../api/useShowQuestion";
import ChoicesTab from "./ChoicesTab";
import DeleteTab from "./DeleteTab";
import { useTranslation } from "react-i18next";
import LogoLoader from "../../../../components/LogoLoader";
import UpdateTab from "./UpdateTab";

const QuestionDetails = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");
  const { t } = useTranslation();
  const questionDetaisl = useShowQuestion();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (questionDetaisl.isLoading) {
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
    <Box>
      <IconButton
        size="large"
        sx={{ mb: 2 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBack />
      </IconButton>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={t("questions.question_detials.tabs.1")} value="1" />
            <Tab label={t("questions.question_detials.tabs.2")} value="2" />
            <Tab label={t("questions.question_detials.tabs.3")} value="3" />
            <Tab label={t("questions.question_detials.tabs.4")} value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Detailtab question={questionDetaisl?.data?.data?.data} />
        </TabPanel>
        <TabPanel value="2">
          <UpdateTab question={questionDetaisl?.data?.data?.data} />
        </TabPanel>
        <TabPanel value="3">
          <ChoicesTab question={questionDetaisl?.data?.data?.data} />
        </TabPanel>
        <TabPanel value="4">
          <DeleteTab question={questionDetaisl?.data?.data?.data} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default QuestionDetails;
