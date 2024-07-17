import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getStuDetail, deleteStu } from "../api/stuApi"
import { delList, getList } from "../redux/slice"
import { useSelector, useDispatch } from "react-redux"

function Detail(props) {
  const { id } = useParams() //获取路由路径动态参数
  const navigate = useNavigate() //react编程式导航
  const [userInfo, setUserinfo] = useState({})
  const { stuList } = useSelector((state) => state.list)
  const dispatch = useDispatch()
  useEffect(() => {
    // getStuDetail(id).then((res) => {
    //   if (res) {
    //     setUserinfo(res[0])
    //   }
    // })
    if (!stuList.length && JSON.stringify(userInfo) === "{}") {
      dispatch(getList()).then(() => {
        const info = stuList.filter((item) => item.id === id) //~~value 类似于parseInt
        setUserinfo(info[0])
      })
    } else {
      const info = stuList.filter((item) => item.id === id) //~~value 类似于parseInt
      setUserinfo(info[0])
    }
  }, [stuList, id, dispatch, userInfo])

  const handleDelete = async () => {
    if (window.confirm("是否删除此用户")) {
      // const res = await deleteStu(id)
      // if (res) {
      //   navigate("/home", {
      //     state: {
      //       alert: "删除用户成功",
      //       type: "danger",
      //     },
      //   })
      // }
      dispatch(delList(id))
      navigate("/home", {
        state: {
          alert: "删除用户成功",
          type: "danger",
        },
      })
    }
  }
  return (
    <div>
      <h1>{userInfo?.name}</h1>
      <button
        onClick={() => {
          navigate("/home")
        }}
      >
        返回
      </button>
      <button
        onClick={() => {
          navigate(`/add/${userInfo.id}`)
        }}
      >
        编辑
      </button>
      <button onClick={handleDelete}>删除</button>
    </div>
  )
}

export default Detail
