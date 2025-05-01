import { Box } from "@mui/material";
import React from "react";
import ResetPasswordForm from "../../student/studentList/studentDetialPanel/ResetPasswordForm";
import ResetDeviceToken from "../../student/studentList/studentDetialPanel/ResetDeviceToken";

const AccountDetailPanel = ({ originalRow }) => {
  return (
    <Box>
      <ResetPasswordForm userID={originalRow.id} />
      <ResetDeviceToken userID={originalRow.id} />
    </Box>
  );
};

export default AccountDetailPanel;
