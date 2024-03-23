import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import ChoiceCard from "./ChoiceCard";
import { useTranslation } from "react-i18next";

const Detailtab = ({ question }) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography
        sx={{
          mb: 5,
          lineHeight: "1.6",
          textTransform: "capitalize",
          fontSize: "1.2rem",
        }}
      >
        <span style={{ color: "#09c" }}>
          {t("questions.question_detials.detials_tab.title")} :{" "}
        </span>{" "}
        {question.title || t("questions.question_detials.detials_tab.untitle")}
      </Typography>

      <Typography
        sx={{
          mb: 5,
          lineHeight: "1.6",
          fontSize: "1.2rem",
          textTransform: "capitalize",
        }}
      >
        <span style={{ color: "#09c" }}>
          {t("questions.question_detials.detials_tab.clarification")} :
        </span>{" "}
        {question.clarification_text ||
          "{t('questions.question_detials.detials_tab.unclarification')}"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          mb: 5,
        }}
      >
        <Card sx={{ maxWidth: 345, flex: 1, minWidth: "250px" }}>
          <CardHeader
            title={t("questions.question_detials.detials_tab.title_image")}
          />
          <CardMedia
            component="img"
            loading="lazy"
            height="250"
            image={question.image}
            alt={question.image}
          />
          <CardContent>
            <Link
              component={"a"}
              target="_blank"
              variant={"caption"}
              size="small"
              href={question.image}
            >
              {t("questions.question_detials.detials_tab.full_image")}
            </Link>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 345, flex: 1, minWidth: "250px" }}>
          <CardHeader
            title={t(
              "questions.question_detials.detials_tab.clarification_image"
            )}
          />
          <CardMedia
            component="img"
            loading="lazy"
            height="250"
            image={question.clarification_image}
            alt={question.clarification_image}
          />
          <CardContent>
            <Link
              component={"a"}
              target="_blank"
              variant={"caption"}
              size="small"
              href={question.clarification_image}
            >
              {t("questions.question_detials.detials_tab.full_image")}
            </Link>
          </CardContent>
        </Card>
      </Box>
      <Typography variant="h5" mb={2}>
        {t("questions.question_detials.detials_tab.choices")}
      </Typography>
      {question.choices.length === 0 && (
        <Typography
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {t("questions.question_detials.detials_tab.no_choices")}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {question.choices.map((choice, index) => (
          <Box
            sx={{
              flexBasis: "25%",
              minWidth: "250px",
            }}
          >
            <ChoiceCard key={index} choice={choice} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Detailtab;
