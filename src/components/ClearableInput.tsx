import React, { type SetStateAction } from "react";
import { IconButton, TextField, type TextFieldProps } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type ClearableInputProps = TextFieldProps & {
  setInput: React.Dispatch<SetStateAction<string>>;
};

export default function ClearableInput(props: ClearableInputProps) {
  const { value, setInput, ...rest } = props;
  return (
    <TextField
      value={value}
      onChange={(e) => setInput(e.target.value)}
      slotProps={{
        input: {
          endAdornment: value ? (
            <IconButton
              size="small"
              title="clear input"
              aria-label="clear input"
              onClick={() => setInput("")}
            >
              <ClearIcon />
            </IconButton>
          ) : null,
        },
      }}
      {...rest}
    />
  );
}
