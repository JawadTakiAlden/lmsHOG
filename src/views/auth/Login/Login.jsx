import React from "react";
import { Box, Typography } from "@mui/material";
import { images } from "../../../assets/asstetsExporter";
import LoginForm from "./LoginForm";
import { useTranslation } from "react-i18next";

const Login = () => {
  const {t} = useTranslation()
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundImage: `url(${images.Login})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: { xs: "cover", sm: "60% 100%" },
        backgroundPosition: { xs: "center", sm: "right" },
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "50%" },
          height: "100%",
          borderRadius: { xs: "20px", sm: "0px 80px 80px 0px" },
          mx: { xs: "auto", sm: 0 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 2,
          backgroundColor: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: "35px",
            textTransform: "capitalize",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mb: 6,
            "&::after": {
              content: `'${t('login_page.login_keyword.part_2')}'`,
              color: "#0794EB",
              textTransform: "lowercase",
            },
          }}
        >
          {t('login_page.login_keyword.part_1')}
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
