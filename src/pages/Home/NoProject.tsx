import React, { useState } from "react";
// eslint-disable-next-line
import { motion } from "motion/react";

import { Box, Button } from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";

import CreateProjectDialog from "../RootLayout/CreateProjectDialog";
import Typewriter from "../../components/Typewriter";
import DelayMount from "../../components/DelayMount";

const btn_variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.7,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "tween",
      duration: 0.2,
      delay: 0,
    },
  },
  tap: {
    scale: 0.9,
  },
};

export default function NoProject() {
  const [open, setOpen] = useState(false);
  const text = "Create your todo";
  const speed = 100;
  const delay = (text.length + 2) * speed;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typewriter
        text={text}
        style={{ fontSize: 32, color: "text.main" }}
        stopBlinking={true}
      />
      <DelayMount delay={delay}>
        <motion.div
          variants={btn_variants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            size="large"
            variant="contained"
            endIcon={<CreateIcon />}
            onClick={() => setOpen(true)}
            sx={{ width: "fit-content" }}
          >
            create
          </Button>
        </motion.div>
      </DelayMount>

      <CreateProjectDialog {...{ open, setOpen }} />
    </Box>
  );
}
