import { RouteConfig } from "@/types/routes";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export const publicRoutes: RouteConfig[] = [
    { path: "/", element: <Home /> },
];

export const fallbackRoute = { path: "*", element: <NotFound /> };
