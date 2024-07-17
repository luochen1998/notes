import React, { useState, useEffect } from "react"
import { useLocation, NavLink } from "react-router-dom"
import { getStuList } from "../api/stuApi"
import { useSelector, useDispatch } from "react-redux"
import { getList } from "../redux/slice"
import Alert from "./Alert"
function Home(props) {
  // const [list, setList] = useState([])  //改为不调用接口获取数据 而是从仓库获取数据
  const [searchList, setSearchList] = useState([])
  const [count, setCount] = useState(0)
  const [search, setSearch] = useState("")
  const [alert, setAlert] = useState(null)
  const dispatch = useDispatch() //派发任务
  const location = useLocation() //获取路由跳转时传递的数据(类似vue useRoute)
  const list = useSelector(({ list }) => list.stuList) //获取仓库数据
  const handleSearch = (name) => {
    //搜索
    setSearch(name)
    const filterList = list.filter((item) => {
      return item.name.match(name)
    })
    setSearchList(filterList)
  }

  //获取列表
  useEffect(() => {
    /* 通过接口获取数据 */
    // getStuList().then((res) => {
    //   setList(res)
    // })
    if (!list.length) {
      dispatch(getList())
    }
    console.log("zhingxing")
  }, [list, dispatch])
  //拉列表
  useEffect(() => {
    if (location.state) setAlert(location.state)
  }, [location])

  const allList = search ? searchList : list

  const trs = allList.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.phone}</td>
        <td>
          <NavLink to={`/detail/${item.id}`}>详情</NavLink>
        </td>
      </tr>
    )
  })

  const showAlert = alert ? <Alert {...alert} /> : null
  return (
    <div>
      {showAlert}
      <h1>学生列表</h1>
      <input
        type="text"
        placeholder="搜索"
        className="form-control"
        value={search}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
      />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>联系方式</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    </div>
  )
}

export default Home
