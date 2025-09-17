import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { OpenStateProps } from "../types";

type ConfirmDialogProps = OpenStateProps & {
  title?: string;
  message?: string;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  setOpen,
  title,
  message,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>{title || "Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: "pre-line" }}>
          {message ||
            "The action can't undone. \n Are you sure you want to delete?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
