import React, { useContext, useEffect, useRef, useState } from "react";
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
import { ProjectContext } from "../../../contexts/ProjectContext";
import type { OpenStateProps, Project } from "../../../types";

export default function EditProjectDialog({ open, setOpen }: OpenStateProps) {
  const context = useContext(ProjectContext);
  if (!context) return null;

  const { project } = context;
  const [editData, setEditData] = useState<Project>({ ...project });
  const update_project = useProjectStore((s) => s.update_project);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleCreate = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!editData.title.trim()) return;
    if (editData.deadline && !dayjs(editData.deadline).isValid()) return;
    update_project(project.id, {
      ...editData,
      title: editData.title.trim(),
      description: editData.description.trim(),
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
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            autoComplete="off"
            inputRef={inputRef}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimeField
              label="Deadline"
              format="YYYY/MM/DD HH:mm"
              value={editData.deadline && dayjs(editData.deadline)}
              onClick={() => {
                !editData.deadline &&
                  setEditData((prev) => ({ ...prev, deadline: dayjs() }));
              }}
              onChange={(v) => {
                setEditData((prev) => ({ ...prev, deadline: v }));
              }}
              clearable
            />
          </LocalizationProvider>
          <RemindTimeField
            {...{
              remind_before: editData.remind_before,
              onChange: (value, unit) => {
                setEditData((p) => ({ ...p, remind_before: { value, unit } }));
              },
            }}
          />
          <TextField
            label="Description"
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
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
