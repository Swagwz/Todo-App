import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";

import { useProjectStore } from "../../../stores/useProjectStore";

import RemindTimeField from "../../../components/RemindTimeField";

export default function EditProjectDialog({ open, setOpen, project_data }) {
  const [project, setProject] = useState({ ...project_data });
  const update_project = useProjectStore((s) => s.update_project);

  const inputRef = useRef(null);

  const handleCreate = (e) => {
    e.preventDefault();

    if (!project.title.trim()) return;
    if (project.deadline && !dayjs(project.deadline).isValid()) return;
    update_project(project_data.id, {
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
    });
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      component="form"
      onSubmit={handleCreate}
      slotProps={{ paper: { sx: { width: 400 } } }}
    >
      <DialogTitle>Edit project</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={2}>
          <TextField
            label="Projec title"
            value={project.title}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            autoComplete="off"
            inputRef={inputRef}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="Deadline"
              format="YYYY/MM/DD HH:mm"
              value={project.deadline && dayjs(project.deadline)}
              onClick={() => {
                !project.deadline &&
                  setProject((prev) => ({ ...prev, deadline: dayjs() }));
              }}
              onChange={(v) => {
                setProject((prev) => ({ ...prev, deadline: v }));
              }}
              clearable
            />
          </LocalizationProvider>
          <RemindTimeField
            {...{
              remind_before: {
                value: project.remind_before.value,
                unit: project.remind_before.unit,
              },
              onChange: (value, unit) => {
                setProject((p) => ({ ...p, remind_before: { value, unit } }));
              },
            }}
          />
          <TextField
            label="Description"
            value={project.description}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, description: e.target.value }))
            }
            autoComplete="off"
            multiline
            minRows={3}
            maxRows={5}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="error" size="small">
          Cancel
        </Button>
        <Button type="submit" variant="contained" size="small">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
