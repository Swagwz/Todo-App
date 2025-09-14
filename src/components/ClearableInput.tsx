import React from "react";
import { IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

/**@typedef {import('@mui/material/TextField').TextFieldProps} TextFieldProps */
/**
 * @param {TextFieldProps} props
 */
export default function ClearableInput(props) {
  const { value, onChange } = props;
  return (
    <TextField
      value={value}
      onChange={onChange}
      slotProps={{
        input: {
          endAdornment: props.value && (
            <IconButton
              size="small"
              title="clear input"
              aria-label="clear input"
              onClick={() =>
                onChange?.({
                  target: { value: "" },
                })
              }
            >
              <ClearIcon />
            </IconButton>
          ),
        },
      }}
      {...props}
    />
  );
}
