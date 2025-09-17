import { useState } from "react";
import { Link, Outlet } from "react-router";

import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Link as StyleLink,
  Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import EditSquareIcon from "@mui/icons-material/EditSquare";

import Sidebar from "./Sidebar";
import CreateProjectDialog from "./CreateProjectDialog";
import SettingDialog from "./SettingDialog";
import usePageTitle from "../../hooks/usePageTitle";

export default function RootLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  usePageTitle();

  const handleSettingOpen = () => {
    setOpenSidebar(false);
    setOpenSetting(true);
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{ "&>*": { color: "common.white" } }}>
          <IconButton title="open sidebar" onClick={() => setOpenSidebar(true)}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <StyleLink
              underline="none"
              component={Link}
              to="/"
              title="back to home page"
              sx={{ fontSize: 32, color: "common.white" }}
            >
              Todo App
            </StyleLink>
          </Box>
          <IconButton
            title="create new project"
            onClick={() => setOpenDialog(true)}
          >
            <EditSquareIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Outlet />
      </Container>

      <Sidebar
        {...{ open: openSidebar, setOpen: setOpenSidebar, handleSettingOpen }}
      />
      {openDialog && (
        <CreateProjectDialog
          {...{ open: openDialog, setOpen: setOpenDialog }}
        />
      )}
      {openSetting && (
        <SettingDialog {...{ open: openSetting, setOpen: setOpenSetting }} />
      )}
    </>
  );
}
