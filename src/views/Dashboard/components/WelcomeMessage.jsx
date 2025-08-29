import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
const WelcomeMessage = () => {
  const theme = useTheme();
  const {t} = useTranslation()
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "30px",
          textTransform: "capitalize",
          mb: 1,
        }}
      >
        {t("dashboard.welcome_message.part_1")} <span style={{ color: "#0794EB", fontWeight: "500" }}>
          {
            JSON.parse(localStorage.getItem("profile_admin_house_of_geniuses"))
              .full_name
          }
        </span>
      </Typography>

      <Typography
        sx={{
          color: theme.palette.grey[600],
          fontSize: "20px",
        }}
      >
        {t("dashboard.welcome_message.part_2")}
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
