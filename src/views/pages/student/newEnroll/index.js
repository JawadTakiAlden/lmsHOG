import React from "react";
import { Divider, Typography } from "@mui/material";
import CardWrapper from "../../../../components/CardWrapper";
import EnrollForm from "./EnrollForm";
import { useTranslation } from "react-i18next";

const NewEnroll = () => {
  const { t } = useTranslation();
  return (
    <CardWrapper>
      <Typography
        sx={{
          color: "#232323",
          fontFamily: "Hacen Tunisia",
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "37px",
          letterSpacing: "0em",
          textAlign: "left",
          px: 2,
          mb: 2,
        }}
      >
        {t("students.new_enroll.requried")}
      </Typography>
      <Divider />
      <EnrollForm />
    </CardWrapper>
  );
};

export default NewEnroll;
