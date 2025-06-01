import React, { useEffect, useRef, useState } from "react";

import { IconButton, Stack } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import ClearableInput from "../../../components/ClearableInput";

export default function TitleForm({
  handleSubmit,
  handleCancel,
  origin_title = "",
}) {
  const [title, setTitle] = useState(origin_title);
  const inputRef = useRef(null);

  useEffect(() => inputRef.current.focus(), []);
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{ flexGrow: 1, alignItems: "center" }}
      component="form"
      onSubmit={(e) => handleSubmit(e, title)}
      onClick={(e) => e.stopPropagation()}
    >
      <ClearableInput
        size="small"
        autoComplete="off"
        label="Todo title"
        fullWidth
        required
        inputRef={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Stack direction="row">
        <IconButton title="save" type="submit" size="small">
          <SaveIcon />
        </IconButton>
        <IconButton
          title="cancel"
          onClick={handleCancel}
          sx={{ color: "error.light" }}
          size="small"
        >
          <CancelIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
