import React from "react";
import useShowQuiz from "../../../../api/useShowQuiz";
import { Box, IconButton, Typography } from "@mui/material";
import UpdateQuizForm from "./UpdateQuizForm";
import { grey } from "@mui/material/colors";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import QuestionInfo from "./QuestionInfo";
import DeleteSection from "./DeleteSection";
import { useTranslation } from "react-i18next";
import LogoLoader from "../../../../components/LogoLoader";

const QuizDetials = () => {
  const quizDetaisl = useShowQuiz();
  const { t } = useTranslation();
  const navigate = useNavigate();
  if (quizDetaisl.isLoading) {
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
      <Box>
        <IconButton sx={{ mb: 2 }} onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("quizzes.quiz_details.h1")}
        </Typography>
        <Typography variant="h5" sx={{ textTransform: "capitalize", mb: 1 }}>
          {quizDetaisl?.data?.data?.data?.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            fontWeight: "normal",
            color: grey[600],
          }}
        >
          {quizDetaisl?.data?.data?.data?.description}
        </Typography>
      </Box>
      <UpdateQuizForm quiz={quizDetaisl?.data?.data?.data} />
      <QuestionInfo quiz={quizDetaisl?.data?.data?.data} />
      <DeleteSection quiz={quizDetaisl?.data?.data?.data} />
    </Box>
  );
};

export default QuizDetials;
