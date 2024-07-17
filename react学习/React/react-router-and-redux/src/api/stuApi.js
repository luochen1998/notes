//封装请求函数
import request from "./request.js"

export const getStuList = () => {
  return request({
    url: "student",
    method: "get",
  })
}
export const addStu = (data) => {
  return request({
    url: "student",
    method: "post",
    data,
  })
}
export const getStuDetail = (id) => {
  return request({
    url: "student",
    method: "get",
    params: {
      id,
    },
  })
}
export const editStu = (data, id) => {
  return request({
    url: `student/${id}`,
    method: "patch",
    data,
  })
}
export const deleteStu = (id) => {
  return request({
    url: `student/${id}`,
    method: "delete",
  })
}
