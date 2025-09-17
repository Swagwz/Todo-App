import React, { useEffect, useRef, useState } from "react";

import { IconButton, Stack } from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import ClearableInput from "../../../components/ClearableInput";

export default function TitleForm({
  handleSubmit,
  handleCancel,
  origin_title = "",
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, newTitle: string) => void;
  handleCancel: () => void;
  origin_title?: string;
}) {
  const [title, setTitle] = useState(origin_title);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => inputRef.current?.focus(), []);
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
        setInput={setTitle}
      />
      <Stack direction="row">
        <IconButton title="save" type="submit" size="small">
          <CheckCircleIcon />
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
