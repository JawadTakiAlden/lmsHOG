import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
const WelcomeMessage = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "30px",
          textTransform: "capitalize",
          mb: 1,
        }}
      >
        welcome{" "}
        <span style={{ color: "#0794EB", fontWeight: "500" }}>
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
        Have a nice day
      </Typography>
    </Box>
  );
};

export default WelcomeMessage;
