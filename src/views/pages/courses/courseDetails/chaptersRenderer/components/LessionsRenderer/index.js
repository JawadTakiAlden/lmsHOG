import { Box, Typography } from "@mui/material";
import React from "react";
import LesionItem from "./LesionItem";
import QuizItem from "./QuizItem";
import { useTranslation } from "react-i18next";

const LessionsRenderer = ({ lesions, quizzes }) => {
  const { t } = useTranslation();
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
      {lesions?.map((lesion, i) => {
        return (
          <LesionItem
            key={lesion.id}
            lesion={lesion}
            last={i === lesions.length - 1 && quizzes?.length === 0}
          />
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
