import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getStuList, deleteStu, addStu, editStu } from "../api/stuApi"

//获取数据
export const getList = createAsyncThunk(
  "list/getListAsync",
  async (_, thunkAPI) => {
    const res = await getStuList()
    thunkAPI.dispatch(initList(res))
  }
)

//删除数据
export const delList = createAsyncThunk("list/delListAsync", (id, thunkAPI) => {
  deleteStu(id)
  thunkAPI.dispatch(del(id))
  //thunkAPI.dispatch(initList(res))
})

//添加数据
export const addList = createAsyncThunk(
  "list/addListAsync",
  async (data, thunkAPI) => {
    const res = await addStu(data)
    if (res) thunkAPI.dispatch(add(res))
    //thunkAPI.dispatch(initList(res))
  }
)
//编辑数据
export const editList = createAsyncThunk(
  "list/editListAsync",
  async ({ userinfo, id }, thunkAPI) => {
    const res = await editStu(userinfo, id)

    if (res) thunkAPI.dispatch(edit({ res, id }))
    //thunkAPI.dispatch(initList(res))
  }
)

//创建仓库切片
export const listSlice = createSlice({
  name: "list",
  initialState: {
    //初始值
    stuList: [],
  },
  reducers: {
    /**/
    initList: (state, { payload }) => {
      //   console.log(state) //一个proxy代理对象
      state.stuList = payload
    },
    del: (state, { payload }) => {
      state.stuList.forEach((item, index) => {
        if (item.id === payload) {
          state.stuList.splice(index, 1)
          return
        }
      })
    },
    add: (state, { payload }) => {
      console.log("====================================")
      console.log(payload)
      console.log("====================================")
      state.stuList.push(payload)
    },
    edit: (state, { payload }) => {
      console.log("====================================")
      console.log(payload)
      console.log("====================================")
      state.stuList.forEach((item, index) => {
        if (item.id === payload.id) {
          state.stuList[index] = payload.res

        }
      })
    },
  },
})

export const { initList, del, add, edit } = listSlice.actions
export default listSlice.reducer
