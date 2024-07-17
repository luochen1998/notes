import ReactDOM from "react-dom/client" //引入reactDOM最新版本client表示客户端，serve表示服务端
import './index.css' //引入样式表
// import ReactDOM from "react-dom"  //引入reactDOM  18版本以前
const App = (
  <div className="logs">
    <div className="item">
      <div className="date">
        <div className="month">4月</div>
        <div className="day">12</div>
      </div>
      <div className="content">
        <h2 className="desc">内容区域</h2>
        <p className="time">40分钟</p>
      </div>
    </div>
  </div>
)
//获取根容器
const root = ReactDOM.createRoot(document.getElementById("root"))
//渲染
root.render(App)
