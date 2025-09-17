import React, { useEffect, useState } from "react";
import { Divider, IconButton, MenuItem, Stack, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import type { RemindBefore } from "../types";

const MAX_VALUE = 999;
const MIN_VALUE = 1;

const UNITS: RemindBefore["unit"][] = [
  "minutes",
  "hours",
  "days",
  "weeks",
  "months",
];

const calcClampValue = (value: number): number =>
  Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));

const isValidUnit = (value: string): value is RemindBefore["unit"] => {
  return UNITS.some((unit) => unit === value);
};

interface RemindTimeFieldProps {
  remind_before: RemindBefore;
  onChange: (value: RemindBefore["value"], unit: RemindBefore["unit"]) => void;
}

export default function RemindTimeField({
  remind_before = { value: 3, unit: "days" },
  onChange,
}: RemindTimeFieldProps) {
  const [value, setValue] = useState(remind_before.value);
  const [unit, setUnit] = useState(remind_before.unit);

  const handleClick = (type: "incr" | "decr") => {
    if (type === "incr") {
      setValue((p) => (p < MAX_VALUE ? p + 1 : p));
    } else if (type === "decr") {
      setValue((p) => (p > MIN_VALUE ? p - 1 : p));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let num = +e.target.value;
    if (isNaN(num)) return;
    setValue(calcClampValue(num));
  };

  const handleUnit = (newUnit: string) => {
    if (isValidUnit(newUnit)) {
      setUnit(newUnit);
    }
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
                  onChange={(e) => handleUnit(e.target.value)}
                  variant="outlined"
                  sx={{ "& fieldset": { border: "none" } }}
                >
                  {UNITS.map((unit) => (
                    <MenuItem key={unit} value={unit}>
                      {unit}
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
