import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ChoiceCard from "./ChoiceCard";
import AddChoiceForm from "./AddChoiceForm";
import { useTranslation } from "react-i18next";

const ChoicesTab = ({ question }) => {
  const [addChoiceFormOpen, setAddChoiceFormOpen] = useState(false);
  const { t } = useTranslation();
  const handelAddChoiceFormToggle = () => {
    setAddChoiceFormOpen((prev) => !prev);
  };

  const handelAddChoiceFormClose = () => {
    setAddChoiceFormOpen(false);
  };
  return (
    <Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handelAddChoiceFormToggle}
          sx={{
            mb: 2,
          }}
        >
          {t("questions.question_detials.choices_tab.add_btn")}
        </Button>
        <Collapse in={addChoiceFormOpen}>
          <AddChoiceForm handelClose={handelAddChoiceFormClose} />
        </Collapse>
      </Box>
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
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {question.choices.map((choice, index) => (
          <Box
            sx={{
              flexBasis: "25%",
              minWidth: "250px",
            }}
          >
            <ChoiceCard key={index} choice={choice} withAction />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChoicesTab;
