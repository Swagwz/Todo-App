import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import RootLayout from "./pages/RootLayout/RootLayout";
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";
import NotFound from "./pages/NotFound";

import { useProjectStore } from "./stores/useProjectStore";
import { useSettingStore } from "./stores/useSettingStore";

const fontFamily = [
  '"Baloo 2"',
  '"Funnel Display"',
  '"Zain"',
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");

declare module "@mui/material/styles" {
  interface TypeBackground {
    primary: string;
    secondary: string;
  }
}

const dark = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#121212",
      default: "#121212",
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: { fontFamily },
});

const light = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#eee",
      default: "#ddd",
      primary: "#d4d4d4",
      secondary: "#c0c0c0",
    },
  },
  typography: { fontFamily },
});

console.log("Hello");

function App() {
  const projects = useProjectStore((s) => s.projects);
  const setting = useSettingStore((s) => s.setting);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <ThemeProvider theme={setting.dark_mode ? dark : light}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
