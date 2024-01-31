import React from "react";
import { Box } from "@mui/material";
import  logo  from "../../../assets/images/logo.png";
const LogoSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        gap: 2,
        mb: 5,
      }}
    >
      <img src={logo} alt="logo" loading="lazy" style={{maxWidth : '100px'}} />
      <Box>
        House of <br />{" "}
        <span style={{ fontSize: "22px", fontWeight: "700" }}>geniuses</span>
      </Box>
    </Box>
  );
};

export default LogoSection;
