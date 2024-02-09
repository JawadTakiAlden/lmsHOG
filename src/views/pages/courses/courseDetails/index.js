import { ArrowBack, Telegram } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useShowCourseDetails from "../../../../api/useShowCourseDetails";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DetailsTab from "./DetailsTab";
import EditTab from "./EditTab";
import DeleteTab from "./DeleteTab";

const CourseDetails = () => {
  const { course_id } = useParams();
  const courseDetails = useShowCourseDetails({ course_id });
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  if (courseDetails.isLoading) {
    return (
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
          <CircularProgress  />
      </Box>
    );
  }

  if(courseDetails.isError){
    return "error"
  }
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CircularProgress
        color="primary"
        sx={{
          position: "fixed",
          transform: `translateX(-50%)`,
          transition: "0.6s",
          left: "50%",
          top: courseDetails.isRefetching ? "30px" : "-100%",
        }}
      />
      <Typography
        sx={{
          color: "#8D8D8D",
          textDecoration: "none",
          fontWeight: "400",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "fit-content",
          mb: 3,
        }}
        component={Link}
        to={-1}
      >
        <ArrowBack />
        back
      </Typography>
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Hacen Tunisia",
            fontSize: "32px",
            fontWeight: "400",
            lineHeight: "49px",
            letterSpacing: "0em",
            width: "fit-content",
            textAlign: "left",
            mb: 1,
          }}
        >
          Course Details
        </Typography>
        <Typography
          sx={{
            fontFamily: "Hacen Tunisia",
            fontSize: "18px",
            fontWeight: "400",
            textAlign: "left",
            color: "#8D8D8D",
            width: "fit-content",
          }}
        >
          Course | Course Details
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <Avatar
            src={courseDetails?.data?.data?.data?.image}
            srcSet={courseDetails?.data?.data?.data?.image}
          />
          <Typography
            sx={{
              fontFamily: "Hacen Tunisia",
              fontSize: "28px",
              fontWeight: "400",
              textAlign: "left",
              color: theme.palette.primary.main,
            }}
          >
            {courseDetails?.data?.data?.data?.name}
          </Typography>
        </Box>
        <Button
          LinkComponent={"a"}
          href={courseDetails?.data?.data?.data?.telegram_channel_link}
          target="_blank"
          variant="contained"
          startIcon={<Telegram />}
        >
          {courseDetails?.data?.data?.data?.telegram_channel_link}
        </Button>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Details" value="1" />
            <Tab label="Editing" value="2" />
            <Tab label="Delete" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><DetailsTab data={courseDetails?.data?.data?.data} courseDetails={courseDetails} /></TabPanel>
        <TabPanel value="2"><EditTab data={courseDetails?.data?.data?.data} /></TabPanel>
        <TabPanel value="3"><DeleteTab data={courseDetails?.data?.data?.data} /></TabPanel>
      </TabContext>
    </Box>
  );
};

export default CourseDetails;
