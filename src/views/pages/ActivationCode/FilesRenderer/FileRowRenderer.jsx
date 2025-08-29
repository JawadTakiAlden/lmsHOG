import React from "react";
import useDownloadFile from "../../../../api/useDownloadFile";
import useDeleteFile from "../../../../api/useDeleteFile";
import { Box, Typography } from "@mui/material";
import {
  CloudDownload,
  DeleteOutlined,
  FileCopyOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const FileRowRenderer = ({ file }) => {
  const downloadFile = useDownloadFile();
  const deleteFile = useDeleteFile();
  const { t } = useTranslation();
  return (
    <Box
      key={file.id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        mb: 2,
        boxShadow: "1px 1px 10px -6px #ccc",
        borderRadius: "10px",
        px: 2,
        py: 1,
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FileCopyOutlined />
        <Typography
          sx={{
            wordBreak: "break-word",
          }}
        >
          {file.path}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: "15px",
        }}
      >
        <LoadingButton
          size="small"
          onClick={() => downloadFile.callFuntion(file.path)}
          endIcon={<CloudDownload />}
          loading={downloadFile.isPending}
          loadingPosition="end"
          variant="contained"
          color="primary"
        >
          <span>{t("activation_codes.file_renderer.download_btn")}</span>
        </LoadingButton>
        <LoadingButton
          size="small"
          onClick={() => deleteFile.callFuntion(file.path)}
          endIcon={<DeleteOutlined />}
          loading={deleteFile.isPending}
          loadingPosition="end"
          variant="contained"
          color="error"
        >
          <span>{t("activation_codes.file_renderer.delete_btn")}</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default FileRowRenderer;
