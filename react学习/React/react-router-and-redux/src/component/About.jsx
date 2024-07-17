import React from "react"
import { NavLink,Outlet } from "react-router-dom"
import "../css/index.css"
function About(props) {
  return (
    <>
      <h1>使用说明</h1>
      <p>通过此系统来熟悉react 以及react Router的使用说明</p>
      <p>联系方式</p>
      <NavLink to="/about/email" className="link">
        邮箱
      </NavLink>
      <NavLink to="/about/tel" className="link">
        电话
      </NavLink>
      <Outlet></Outlet>{/* 子路由出口位置 */}
    </>
  )
}

export default About
