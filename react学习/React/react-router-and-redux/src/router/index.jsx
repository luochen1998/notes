import React from "react"
import Home from "../component/Home"
import Add from "../component/Add"
import Detail from "../component/Detail"
import About from "../component/About"
import Tel from "../component/Tel"
import Email from "../component/Email"
import { useRoutes, Navigate } from "react-router-dom"
export default function Router() {
  return useRoutes([
    {
      path: "/home",
      element: <Home></Home>,
    },
    {
      path: "/add",
      element: <Add></Add>,
    },
    {
      path: "/add/:id",
      element: <Add></Add>,
    },
    {
      path: "/detail/:id",
      element: <Detail></Detail>,
    },
    {
      path: "/about",
      element: <About></About>,
      children: [
        {
          path: "email",
          element: <Email></Email>,
        },
        {
          path: "tel",
          element: <Tel></Tel>,
        },
        {
          element: <Navigate to="email"></Navigate>,
        },
      ],
    },
    {
      path: "/",
      element: <Navigate replace to="/home"></Navigate> /* 重定向 */,
    },
  ])
}
