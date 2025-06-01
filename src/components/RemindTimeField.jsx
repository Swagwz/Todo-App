import React, { useEffect, useState } from "react";
import { Divider, IconButton, MenuItem, Stack, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const MAX_VALUE = 999;
const MIN_VALUE = 1;

export default function RemindTimeField({
  remind_before = { value: 3, unit: "days" },
  onChange,
}) {
  const [value, setValue] = useState(remind_before.value);
  const [unit, setUnit] = useState(remind_before.unit);

  const handleClick = (type) => {
    if (type === "incr") {
      setValue((p) => (p < MAX_VALUE ? p + 1 : p));
    } else if (type === "decr") {
      setValue((p) => (p > MIN_VALUE ? p - 1 : p));
    }
  };

  const handleChange = (e) => {
    let num = +e.target.value;
    if (isNaN(num)) return;
    const clampedValue = Math.max(MIN_VALUE, Math.min(num, MAX_VALUE));
    setValue(clampedValue);
  };

  useEffect(() => onChange(value, unit), [value, unit]);

  return (
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <TextField
        value={value}
        onChange={handleChange}
        fullWidth
        autoComplete="off"
        label="Remind before"
        slotProps={{
          input: {
            startAdornment: (
              <IconButton size="small" onClick={() => handleClick("decr")}>
                <RemoveIcon />
              </IconButton>
            ),
            endAdornment: (
              <Stack
                direction="row"
                sx={{ alignItems: "center" }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <IconButton size="small" onClick={() => handleClick("incr")}>
                  <AddIcon />
                </IconButton>
                <TextField
                  select
                  size="small"
                  autoComplete="off"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  variant="outlined"
                  sx={{ "& fieldset": { border: "none" } }}
                >
                  {["minutes", "hours", "days", "weeks", "months"]
                    .map((unit) => ({ value: unit, label: unit }))
                    .map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                </TextField>
              </Stack>
            ),
          },
          htmlInput: {
            sx: { textAlign: "center" },
          },
        }}
      />
    </Stack>
  );
}
