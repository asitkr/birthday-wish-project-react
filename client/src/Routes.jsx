import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import WithLayout from "./withLayout"; // Ensure the correct import path

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

/**
 * Route Configuration
 */
const configRoutes = [
  { path: "/", element: <WithLayout Component={Home} isProtected={true} /> }, // ✅ Protected (Only for logged-in users)
  { path: "/register", element: <WithLayout Component={Register} isProtected={false} /> }, // ✅ Guest-only
  { path: "/login", element: <WithLayout Component={Login} isProtected={false} /> }, // ✅ Guest-only
];

// Create Router
const PageRouter = createBrowserRouter(configRoutes);

export default PageRouter;
