import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useProjectStore } from "../stores/useProjectStore";

export default function usePageTitle() {
  const location = useLocation();
  const { id } = useParams();
  const project = useProjectStore((s) => s.get_project(id));
  useEffect(() => {
    if (project) document.title = `${project.title} | Todo App`;
    else if (location.pathname === "/") document.title = `Home | Todo App`;
    else document.title = `Not Found | Todo App`;
  }, [location.pathname, project]);
  return null;
}
