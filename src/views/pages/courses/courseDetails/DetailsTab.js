import { Box, Button, Collapse } from "@mui/material";
import React, { useState } from "react";
import Swicther from "../../../../components/Switcher";
import AddChapterForm from "./chaptersRenderer/components/AddChapterForm";
import ChapterRenderer from "./chaptersRenderer";
import useSwitchOpenOfCourse from "../../../../api/useSwitchOpenOfCourse";
import useSwitchCourseVisibility from "../../../../api/useSwitchCourseVisibility";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const DetailsTab = ({ data, courseDetails }) => {
  const openSwitcher = useSwitchOpenOfCourse(courseDetails.refetch);
  const visibleSwitcher = useSwitchCourseVisibility(courseDetails.refetch);
  const [openAddChapterForm, setOpenAddChapterForm] = useState(false);
  const { course_id } = useParams();
  const { t } = useTranslation();
  const addChapterFormClick = () => {
    setOpenAddChapterForm((prev) => !prev);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
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
            label={t("courses.detaisl.details_tab.switcher.1")}
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
            label={t("courses.detaisl.details_tab.switcher.2")}
          />
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={addChapterFormClick}
        >
          {t("courses.detaisl.details_tab.buttons.add_chapter")}
        </Button>
      </Box>
      <Collapse in={openAddChapterForm}>
        <AddChapterForm course_id={course_id} />
      </Collapse>
      <ChapterRenderer chapters={data.chapters} />
    </Box>
  );
};

export default DetailsTab;
