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

import { useProjectStore } from "../../stores/useProjectStore";
import { useNavigate } from "react-router";
import RemindTimeField from "../../components/RemindTimeField";
import { useSettingStore } from "../../stores/useSettingStore";

const init_project = {
  title: "",
  description: "",
  deadline: null,
};

export default function CreateProjectDialog({ open, setOpen }) {
  const [project, setProject] = useState({ ...init_project });
  const create_project = useProjectStore((s) => s.create_project);
  const { value, unit } = useSettingStore((s) => s.setting.remind_before);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!project.title.trim()) return;
    if (project.deadline && !dayjs(project.deadline).isValid()) return;

    const id = create_project({
      ...project,
      title: project.title.trim(),
      description: project.description.trim(),
    });

    setOpen(false);
    navigate(`/project/${id}`);
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
      <DialogTitle>Create new project</DialogTitle>
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
              onClick={() =>
                setProject((prev) => ({ ...prev, deadline: dayjs() }))
              }
              onChange={(v) => {
                setProject((prev) => ({ ...prev, deadline: v }));
              }}
              clearable
            />
          </LocalizationProvider>
          <RemindTimeField
            {...{
              remind_before: { value, unit },
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
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
