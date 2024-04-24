import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SignUp from "./Components/SignUp.jsx";
import Signin from "./Components/Signin.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import PurchasedCourses from "./Components/User/PurchasedCourses.jsx";
import User from "./Components/User/User.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewCourse from "./Components/Admin/NewCourse.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/user/purchasedCourses",
    element: <PurchasedCourses />,
  },
  {
    path: "/admin/createcourse",
    element: <NewCourse />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
