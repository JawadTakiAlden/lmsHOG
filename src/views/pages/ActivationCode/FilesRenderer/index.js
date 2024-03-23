import React from "react";
import useGetCodeFiles from "../../../../api/useGetCodeFiles";
import { Box, Skeleton, Typography } from "@mui/material";
import FileRowRenderer from "./FileRowRenderer";
import { useTranslation } from "react-i18next";

const FileRenderer = () => {
  const files = useGetCodeFiles();
  const { t } = useTranslation();
  if (files.isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={"200px"}
        sx={{
          borderRadius: "12px",
          my: 2,
        }}
      />
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: "#eee",
        borderRadius: "12px",
        p: 3,
        my: 2,
      }}
    >
      {files.data.data.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          {t("activation_codes.file_renderer.no_file_message")}
        </Typography>
      )}
      {files.data.data.map((file) => (
        <FileRowRenderer file={file} />
      ))}
    </Box>
  );
};

export default FileRenderer;
