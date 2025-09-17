// eslint-disable-next-line
import { motion, type Variants } from "motion/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Checkbox, IconButton, Stack, Typography } from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import TodoWrapper from "../../../../../components/TodoWrapper";
import type { SubTodo } from "../../../../../types";

const variant: Variants = {
  hidden: {
    width: 0,
    opacity: 0,
    visibility: "hidden",
  },
  show: {
    width: "auto",
    opacity: 1,
    visibility: "visible",
  },
};

interface SubTodoDragPreviewProps {
  subTodo: SubTodo;
}

export default function SubTodoDragPreview({
  subTodo: st,
}: SubTodoDragPreviewProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: st.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    touchAction: "none",
  };

  return (
    <TodoWrapper variant="secondary" style={style} ref={setNodeRef}>
      <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
        <Checkbox checked={st.completed} disabled />

        <Typography
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {st.title}
        </Typography>
        <Stack sx={{ ml: "auto" }} direction="row">
          <IconButton size="small" title="edit title" disabled>
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            title="delete subTodo"
            sx={{ color: "error.main" }}
            disabled
          >
            <DeleteIcon />
          </IconButton>
          <motion.div
            variants={variant}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <IconButton size="small" {...attributes} {...listeners}>
              <DragIndicatorIcon />
            </IconButton>
          </motion.div>
        </Stack>
      </Stack>
    </TodoWrapper>
  );
}
