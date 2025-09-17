import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useProjectStore } from "../stores/useProjectStore";

export default function usePageTitle() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const project = useProjectStore((s) => s.get_project(id || ""));

  useEffect(() => {
    if (project) document.title = `${project.title} | Todo App`;
    else if (pathname === "/") document.title = `Home | Todo App`;
    else document.title = `Not Found | Todo App`;
  }, [pathname, project]);
}
