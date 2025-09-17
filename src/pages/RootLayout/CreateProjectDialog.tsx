import React, { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

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
import type { OpenStateProps, Project } from "../../types";

export default function CreateProjectDialog({ open, setOpen }: OpenStateProps) {
  const remind_before = useSettingStore((s) => s.setting.remind_before);
  const [newProject, setNewProject] = useState<
    Pick<Project, "title" | "description" | "deadline" | "remind_before">
  >({
    title: "",
    description: "",
    deadline: null,
    remind_before,
  });
  const create_project = useProjectStore((s) => s.create_project);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const handleCreate = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!newProject.title.trim()) return;
    if (newProject.deadline && !dayjs(newProject.deadline).isValid()) return;

    const id = create_project({
      ...newProject,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
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
            value={newProject.title}
            onChange={(e) =>
              setNewProject((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            autoComplete="off"
            inputRef={inputRef}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="Deadline"
              format="YYYY/MM/DD HH:mm"
              value={newProject.deadline ? dayjs(newProject.deadline) : null}
              onChange={(newValue: Dayjs | null) => {
                setNewProject((prev) => ({ ...prev, deadline: newValue }));
              }}
              clearable
            />
          </LocalizationProvider>
          <RemindTimeField
            {...{
              remind_before,
              onChange: (value, unit) => {
                setNewProject((p) => ({
                  ...p,
                  remind_before: { value, unit },
                }));
              },
            }}
          />
          <TextField
            label="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject((prev) => ({
                ...prev,
                description: e.target.value,
              }))
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
