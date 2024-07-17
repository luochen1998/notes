import { Routes, Route, Navigate, NavLink } from "react-router-dom"
import RouterConfig from "./router" /* 配置路由 */
import Home from "./component/Home"
import About from "./component/About"
import Add from "./component/Add"
import Detail from "./component/Detail"
import Tel from "./component/Tel"
import Email from "./component/Email"
import "./css/index.css"
function App() {
  return (
    <>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="navbar-brand">学生管理系统</div>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/home">主页</NavLink>
              </li>
              <li>
                <NavLink to="/about">关于我们</NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/add">添加用户</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content">
        {/* <Routes>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route path="/about" element={<About />}>
            <Route path="/about/email" element={<Email />}></Route>
            <Route path="/about/tel" element={<Tel />}></Route>
            <Route
              path="/about"
              element={<Navigate to="/about/email"></Navigate>}
            ></Route>
          </Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/add/:id" element={<Add />}></Route>
          <Route path="/Detail/:id" element={<Detail />}></Route>
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
        </Routes> */}
        <RouterConfig></RouterConfig>
      </div>
    </>
  )
}

export default App
