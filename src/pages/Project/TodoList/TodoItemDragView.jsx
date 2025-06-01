import { motion } from "motion/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import TodoWrapper from "../../../components/TodoWrapper";

const variant = {
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

export default function TodoItemDragView({ todo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    touchAction: "none",
  };

  return (
    <Box style={style} ref={setNodeRef}>
      <TodoWrapper
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          mb: 0.5,
          cursor: "pointer",
          "&:hover": {
            outline: "2px solid",
            outlineColor: "info.main",
          },
        }}
      >
        <Checkbox checked={todo.completed} />

        <Typography
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {todo.title}
        </Typography>
        <Stack sx={{ ml: "auto" }} direction="row">
          {todo.subTodos.length > 0 && (
            <IconButton size="small" title="expand" disabled>
              <ExpandLessIcon
                sx={{
                  rotate: "180deg",
                }}
              />
            </IconButton>
          )}
          <IconButton size="small" title="create subTodo" disabled>
            <MoreHorizIcon />
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
      </TodoWrapper>
    </Box>
  );
}
