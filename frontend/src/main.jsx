import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import BentoGridDemo from "./pages/CoursesPage";
import { ExpandableCardDemo } from "./pages/Teachers";
import Layout from "./components/Layout"; // Import your Layout component
import "./index.css";
import StudentsPage from "./pages/StudentsPage";
import AddCoursesPage from "./pages/AddCoursesPage";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify

// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Wrap with Layout
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <SignupPage />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/teachers",
    element: (
      <Layout>
        <ExpandableCardDemo />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/courses",
    element: (
      <Layout>
        <BentoGridDemo />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/students",
    element: (
      <Layout>
        <StudentsPage />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/add-courses",
    element: (
      <Layout>
        <AddCoursesPage />
      </Layout>
    ), // Wrap with Layout
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      {/* Use RouterProvider to manage routing */}
      <RouterProvider router={router} />
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </NextUIProvider>
  </React.StrictMode>
);
