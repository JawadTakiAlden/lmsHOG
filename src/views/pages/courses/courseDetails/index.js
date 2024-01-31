import { ArrowBack, Telegram } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useShowCourseDetails from "../../../../api/useShowCourseDetails";
import Swicther from "../../../../components/Switcher";
import useSwitchOpenOfCourse from "../../../../api/useSwitchOpenOfCourse";
import useSwitchCourseVisibility from "../../../../api/useSwitchCourseVisibility";
import ChapterRenderer from "./chaptersRenderer";
import AddChapterForm from "./chaptersRenderer/components/AddChapterForm";

const CourseDetails = () => {
  const {course_id} = useParams();
  const courseDetails = useShowCourseDetails({ course_id });
  const openSwitcher = useSwitchOpenOfCourse(courseDetails.refetch)
  const visibleSwitcher = useSwitchCourseVisibility(courseDetails.refetch)
  const [openAddChapterForm , setOpenAddChapterForm] = useState(false)
  const theme = useTheme();

  const addChapterFormClick = () => {
    setOpenAddChapterForm((prev) => !prev)
  }

  const addChapterCloseHandler = () => {
    setOpenAddChapterForm(false)
  }

  if(courseDetails.isLoading){
    return <Box
      sx={{
        height : '100vh',
        width : '100vw',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
      }}
    >
      <CircularProgress />
    </Box>
  }

  return (
    <Box
      sx={{
        position : 'relative',
        overflow : 'hidden'
      }}
    >
      <CircularProgress 
        color="primary"
        sx={{
          position : 'fixed',
          transform : `translateX(-50%)`,
          transition : '0.6s',
          left : '50%',
          top : courseDetails.isRefetching ? '30px' : '-100%',
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
          width : 'fit-content',
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
            width : 'fit-content',
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
            width : 'fit-content',
          }}
        >
          Course | Course Details
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb : 3
        }}
      >
        <Avatar src={courseDetails?.data?.data?.data?.image} srcSet={courseDetails?.data?.data?.data?.image}  />
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
      <Box
        sx={{
          mb : 2
        }}
      >
        <Button LinkComponent={'a'} href={courseDetails?.data?.data?.data?.telegram_channel_link} target="_blank" variant="contained" startIcon={<Telegram />}>{courseDetails?.data?.data?.data?.telegram_channel_link}</Button>
      </Box>

        <Box
          sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : 'fit-content',
            gap : 3
          }}
        >
          <Box
            sx={{
              display : 'flex',
              alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column'
            }}
          >
            <Typography
              sx={{
                textAlign : 'center',
                color : '#cdcdcd',
                textTransform : 'capitalize',
                fontSize : '18px'
              }}
            >
              Free Course
            </Typography>
            <Swicther originalRow={{id : courseDetails?.data?.data?.data?.id , is_open : courseDetails?.data?.data?.data?.is_open}} switchermutate={openSwitcher} checkedAttribute={'is_open'} />
          </Box>
          <Box
            sx={{
              display : 'flex',
              alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column'
            }}
          >
          <Typography
              sx={{
                textAlign : 'center',
                color : '#cdcdcd',
                textTransform : 'capitalize',
                fontSize : '18px'
              }}
            >
              Visible Course
            </Typography>
            <Swicther originalRow={{id : courseDetails?.data?.data?.data?.id , is_visible : courseDetails?.data?.data?.data?.is_visible}} switchermutate={visibleSwitcher} checkedAttribute={'is_visible'} />
          </Box>
        </Box>
        <Box
          sx={{
            display : 'flex',
            alignItems : 'center',
            my : 2
          }}
        >
          <Button variant="outlined" color="primary" onClick={addChapterFormClick}>add chapter</Button>
        </Box>
        {openAddChapterForm && <AddChapterForm course_id={course_id} />}
        <ChapterRenderer chapters={courseDetails?.data?.data?.data?.chapters} />
    </Box>
  );
};

export default CourseDetails;
