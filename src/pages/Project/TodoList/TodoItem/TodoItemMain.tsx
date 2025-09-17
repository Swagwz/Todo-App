import { useContext } from "react";

import { IconButton, Stack, Typography } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { TodoContext } from "../../../../contexts/TodoContext";

export default function TodoItemMain() {
  const context = useContext(TodoContext);
  if (!context) return null;

  const { todo, expand, setExpand, setAnchorEl, setDrag, drag } = context;

  return (
    <>
      <Typography
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {todo.title}
      </Typography>
      <Stack
        sx={{ ml: "auto" }}
        direction="row"
        onClick={(e) => e.stopPropagation()}
      >
        {drag ? (
          <IconButton
            color="success"
            size="small"
            title="save order"
            onClick={() => setDrag(false)}
          >
            <DoneIcon />
          </IconButton>
        ) : (
          <>
            {todo.subTodos.length > 0 && (
              <IconButton
                size="small"
                title={expand ? "fold" : "expand"}
                onClick={() => setExpand((p) => !p)}
                disabled={drag}
              >
                <ExpandLessIcon
                  sx={{
                    rotate: expand ? "0deg" : "180deg",
                    transition: "0.5s",
                  }}
                />
              </IconButton>
            )}
            <IconButton
              size="small"
              title="open menu"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreHorizIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
}
