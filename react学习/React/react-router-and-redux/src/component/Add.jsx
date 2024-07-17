import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addStu, editStu, getStuDetail } from "../api/stuApi"
import { useDispatch, useSelector } from "react-redux"
import { addList, editList } from "../redux/slice"
function Add(props) {
  const [userinfo, setUserinfo] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    education: "本科",
    graduationschool: "",
    profession: "",
    profile: "",
  })
  const { id } = useParams()
  const navigate = useNavigate() /* 类似vue useRouter */
  const dispatch = useDispatch()
  const item = useSelector((state) => {})

  /*更改时触发*/
  const changeInfo = (val, key) => {
    if (key === "age" && isNaN(val)) return
    const newUserinfo = { ...userinfo }
    newUserinfo[key] = val.trim()
    setUserinfo(newUserinfo)
  }

  useEffect(() => {
    if (id) {
      getStuDetail(id).then((res) => {
        setUserinfo(res[0])
      })
    }
  }, [id])

  const submitInfo = async (e) => {
    e.preventDefault() /* 阻止默认事件 */
    for (const key in userinfo) {
      if (!userinfo[key]) {
        alert("请完善表单的每一项")
        return
      }
    }
    if (id) {
      // const res = await editStu(userinfo, id)
      // if (res) {

      // }
      dispatch(editList({ userinfo, id }))
      navigate("/home", {
        state: {
          alert: "用户编辑成功",
          type: "success",
        },
      })
    } else {
      // const res = await addStu(userinfo)
      // if (res) {
      //   navigate("/home", {
      //     state: {
      //       alert: "用户添加成功",
      //       type: "success",
      //     },
      //   })
      // } else {
      //   navigate("/home")
      // }
      dispatch(addList(userinfo))
      navigate("/home", {
        state: {
          alert: "用户添加成功",
          type: "success",
        },
      })
    }
  }
  return (
    <div className="container">
      <h1>{(id ? "编辑" : "添加") + "用户"}</h1>
      <form onSubmit={submitInfo}>
        <div className="form-group">
          <label>姓名</label>
          <input
            type="text"
            className="form-control"
            placeholder="请填写姓名"
            value={userinfo.name}
            onChange={(e) => {
              changeInfo(e.target.value, "name")
            }}
          />
        </div>
        <div className="form-group">
          <label>年龄</label>
          <input
            type="text"
            className="form-control"
            placeholder="请填写用户年龄"
            value={userinfo.age}
            onChange={(e) => {
              changeInfo(e.target.value, "age")
            }}
          />
        </div>
        <div className="form-group">
          <label>电话</label>
          <input
            type="text"
            className="form-control"
            placeholder="请填写用户电话"
            value={userinfo.phone}
            onChange={(e) => {
              changeInfo(e.target.value, "phone")
            }}
          />
        </div>
        <div className="form-group">
          <label>邮箱</label>
          <input
            type="email"
            className="form-control"
            placeholder="请填写用户邮箱"
            value={userinfo.email}
            onChange={(e) => {
              changeInfo(e.target.value, "email")
            }}
          />
        </div>
        <div className="form-group">
          <label>学历</label>
          <select
            value={userinfo.education}
            className="form-control"
            onChange={(e) => {
              changeInfo(e.target.value, "education")
            }}
          >
            <option>本科</option>
            <option>大专</option>
            <option>高中</option>
            <option>初中</option>
            <option>小学</option>
          </select>
        </div>
        <div className="form-group">
          <label>毕业学校</label>
          <input
            type="text"
            className="form-control"
            placeholder="请填写用户毕业学校"
            value={userinfo.graduationschool}
            onChange={(e) => {
              changeInfo(e.target.value, "graduationschool")
            }}
          />
        </div>
        <div className="form-group">
          <label>职业</label>
          <input
            type="text"
            className="form-control"
            placeholder="请填写用户职业"
            value={userinfo.profession}
            onChange={(e) => {
              changeInfo(e.target.value, "profession")
            }}
          />
        </div>
        <div className="form-group">
          <label>个人简介</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="请填写用户个人简介"
            value={userinfo.profile}
            onChange={(e) => {
              changeInfo(e.target.value, "profile")
            }}
          />
        </div>
        <button type="submit" className="btn btn-default">
          提交
        </button>
      </form>
    </div>
  )
}

export default Add
