import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function ProjectInfoItem({
  title,
  placeholder,
  content,
  color,
}) {
  return (
    <Stack direction="row" color="text.main" sx={{ flexWrap: "wrap" }}>
      <Box sx={{ width: 150 }}>{title}</Box>
      {content ? (
        <Typography
          color={color || "text.secondary"}
          sx={{
            flex: "1 0 300px",
            overflowWrap: "anywhere",
          }}
        >
          {content}
        </Typography>
      ) : (
        <Typography color="text.disabled" sx={{ flex: "1 0 300px" }}>
          {placeholder}
        </Typography>
      )}
    </Stack>
  );
}
