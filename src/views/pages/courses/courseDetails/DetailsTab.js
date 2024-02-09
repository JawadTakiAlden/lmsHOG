import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Swicther from "../../../../components/Switcher";
import AddChapterForm from "./chaptersRenderer/components/AddChapterForm";
import ChapterRenderer from "./chaptersRenderer";
import useSwitchOpenOfCourse from "../../../../api/useSwitchOpenOfCourse";
import useSwitchCourseVisibility from "../../../../api/useSwitchCourseVisibility";
import { useParams } from "react-router";

const DetailsTab = ({ data, courseDetails }) => {
  const openSwitcher = useSwitchOpenOfCourse(courseDetails.refetch);
  const visibleSwitcher = useSwitchCourseVisibility(courseDetails.refetch);
  const [openAddChapterForm, setOpenAddChapterForm] = useState(false);
  const { course_id } = useParams();
  const addChapterFormClick = () => {
    setOpenAddChapterForm((prev) => !prev);
  };

  const addChapterCloseHandler = () => {
    setOpenAddChapterForm(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap : 'wrap',
          justifyContent: "flex-end",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Swicther
            originalRow={{
              id: data.id,
              is_open: data.is_open,
            }}
            switchermutate={openSwitcher}
            checkedAttribute={"is_open"}
            label={"Free Course"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Swicther
            originalRow={{
              id: data.id,
              is_visible: data.is_visible,
            }}
            switchermutate={visibleSwitcher}
            checkedAttribute={"is_visible"}
            label={"Visible Course"}
          />
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={addChapterFormClick}
        >
          add chapter
        </Button>
      </Box>
      {openAddChapterForm && <AddChapterForm course_id={course_id} />}
      <ChapterRenderer chapters={data.chapters} />
    </Box>
  );
};

export default DetailsTab;
