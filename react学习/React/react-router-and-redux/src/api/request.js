import axios from "axios"
const request = axios.create({
  baseURL: "http://localhost:3004",
  timeout: 5000,
})

//设置请求拦截
request.interceptors.request.use((config) => {
  return config
  //做一些其他事情，比如请求放行
})

//设置响应拦截
request.interceptors.response.use(
  (response) => {
    //对响应进行拦截
    return response.data
  },
  (error) => {
    //对错误进行处理
    return Promise.reject(error)
  }
)
export default request
