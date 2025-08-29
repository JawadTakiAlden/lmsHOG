import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import LesionItem from "./LesionItem";
import QuizItem from "./QuizItem";
import { useTranslation } from "react-i18next";
import useReOrderLesions from "../../../../../../../api/useReOrderLesions";
import { LoadingButton } from "@mui/lab";

const LessionsRenderer = ({ lesions, quizzes }) => {
  const { t } = useTranslation();
  const [draggingItem, setDraggingItem] = useState(null);
  const [data, setData] = useState(lesions);
  const reOrderLesion = useReOrderLesions();
  const handleSaveSort = () => {
    reOrderLesion.mutate({
      lesions: data.map((les, i) => {
        return {
          id: les.id,
          sort: i,
        };
      }),
    });
  };

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    if (!draggingItem) return;

    const currentIndex = data.indexOf(draggingItem);
    const targetIndex = data.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      data.splice(currentIndex, 1);
      data.splice(targetIndex, 0, draggingItem);
      setData(data);
    }
  };
  return (
    <Box>
      {lesions?.length === 0 && quizzes?.length === 0 && (
        <Typography
          sx={{ textAlign: "center", py: 2, textTransform: "capitalize" }}
        >
          {t(
            "courses.detaisl.details_tab.chapter_renderer.chapter_card.lesion_renderer.no_lesion_text"
          )}
        </Typography>
      )}
      {data?.length !== 0 && (
        <LoadingButton
          sx={{
            mt: 2,
          }}
          loading={reOrderLesion.isPending}
          loadingPosition="start"
          variant="outlined"
          onClick={handleSaveSort}
        >
          Save New Sort
        </LoadingButton>
      )}
      {lesions?.map((lesion, i) => {
        return (
          <Box
            sx={{
              cursor: "grab",
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, lesion)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, lesion)}
          >
            <LesionItem
              key={lesion.id}
              lesion={lesion}
              last={i === lesions.length - 1 && quizzes?.length === 0}
            />
          </Box>
        );
      })}
      {quizzes?.map((quiz, i) => {
        return (
          <QuizItem key={quiz.id} quiz={quiz} last={i === quizzes.length - 1} />
        );
      })}
    </Box>
  );
};

export default LessionsRenderer;
