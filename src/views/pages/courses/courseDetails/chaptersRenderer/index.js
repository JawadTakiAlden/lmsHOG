import { Box } from "@mui/material";
import React from "react";
import ChapterCard from "./components/ChapterCard";

const ChapterRenderer = ({ chapters }) => {
  return (
    <Box>
      {chapters?.map((chapter) => {
        return <ChapterCard key={chapter.id} chapter={chapter} />;
      })}
    </Box>
  );
};

export default ChapterRenderer;
