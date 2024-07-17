# 利用vite创建VUE3项目框架

### 使用：vite框架+pinia+ts+vue-route+axios+ElementPlus(UI框架)+normalize+sass

## 1.下载vite官方版本

```
安装 vite 
    npm i vite -D
```



## 2.创建vite框架

 	创建框架 npm init vue@latest

```
Project name //设置项目名字
add TypeScript?  //是否添加ts
add JSX Support? //添加 JSX 支持？
Add Vue Router for single Page Application development?//添加 Vue 路由器进行单页应用开发？
Add Pinia for state management? //添加pinia进行状态管理？
Add Vitest for Unit Testing? //为单元测试添加 Vitest？
Add an End-to-End Testing Solution?  //添加端到端测试解决方案？
Add ESLint for code quality? //添加 ESLint 以提高代码质量？
Add Prettier for code formatting? //添加更漂亮的代码格式？(添加Prettier文件格式化代码)
```



## 3.初始化项目

```
npm i
```

## 4.删除框架多余内容

## 5.配置.eslintrc.cjs

```
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    // '@vue/eslint-config-prettier',
  ],
  'parser':'@babel/eslint-parser',
  parserOptions: {
    //npm install @typescript-eslint/parser --save-dev  安装依赖
    ecmaVersion: 'babel-eslint',
  },
  
  rules: {
    semi: ['error', 'never'], // 不使用分号结束
    quotes: ['error', 'single'], // 使用单引号
    eqeqeq: 'error', // ===
    'vue/no-unused-vars': 'error',
    'vue/no-reserved-component-names': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
```

## 5.配置.prettierrc.json文件

```
{
    "tabWidth": 4,
    "useTabs": false,
    "semi": false,
    "singleQuote": true,
    "TrailingComma": "all",
    "bracketSpacing": true,
    "jsxBracketSameLine": false,
    "arrowParens": "avoid"
}
```

## 6.配置env.d.ts文件

```
/// <reference types="vite/client" />
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
```

## 7.集成状态管理库pinia

下载pinia包

```
npm i pinia
```

在store下面创建index文件在里面集成pinia

如果需要本地持久化存储可安装持久化存储包  //安装依赖进行持久化存储  

```
npm i pinia-plugin-persist -S
```

配置持久化存储

```
import { createPinia } from 'pinia'
//引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
const storeRoot = createPinia() //创建pinia存储根store
storeRoot.use(piniaPluginPersist)//集成持久化存储插件
//导出pinia实例根
export default storeRoot
```

创建需要进行包管理库的模块

```
import { defineStore } from 'pinia'
/**
 * pinia使用defineStore方法定义模块
 * 第一个参数是store唯一的id，也可以理解成store模块名
 * 第二个是一个对象，store配置项,包含 state,actions,getters
 * */
export const useCartStore = defineStore('cart', {
    state() {
        return {
        	//状态数据
            stateAll: false,
        }
    },
    actions: {
        //异步逻辑和同步逻辑在此使用
    },
    getters: {
       //计算属性
    },
    //使用该插件，开启数据缓存，本地持久化存储
    persist:{
        enabled:true,
        strategies:[
            {
                //key的名称
                key:'userKey',
                //更改默认存储，我更改为localStorage
                storage:localStorage,
                //可以选择那些进入local存储，这样就不用全部都进去
                //默认是全部都进去
                paths:['cartGoodsList','stateAll']
            }
        ]
    }
})
```

然后在main.ts文件中集成

```
//从store引入
import storeRoot from './stores'
const app = createApp(App)
//集成到app上，必须在挂载前面
app.use(storeRoot)
app.mount('#app')
```

## 8.配置路由文件并集成到main.ts里面

首先下载路由vue-router包

```
npm i vue-route
```

然后对路由文件进行配置

```
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', //默认路由
      name: 'home',  //路由命名
      component: Home  //路由路劲
    },
  ]
})
//导出路由
export default router
```

然后在main.ts文件中集成

```
//从路由配置文件中引入
import router from './router'
const app = createApp(App)
//集成到app上面，挂载之前
app.use(router)
app.mount('#app')
```

## 9.配置axios网络请求管理包，ajax请求

下载axios包

```
 npm install axios
```

创建工具文件夹utils文件夹，在该文件下创建文件request.ts并对axios进行配置

```
import axios from 'axios' //引入axios
export const baseURL='http://10.7.163.165:8089' //配置根地址
//创建axios
const axiosInstance=axios.create({
    baseURL,
    timeout:3000,  //响应事件
})

// /**
//  * 请求拦截器
//  */
axiosInstance.interceptors.request.use(
        config => {
            // 请求拦截处理
            // console.log('请求拦截处理 >>> ', config)
            const token = localStorage.getItem('TOKEN')
            
            if(token){
                config.headers['Authorization'] = token
            }
            return config
        },
        error => {
            // 请求出错处理
            return Promise.reject(error)
        }
    )
    
//     /**
//      * 响应拦截器
//      */
    axiosInstance.interceptors.response.use(
        response => {
            // 响应拦截处理
            // console.log('响应拦截器处理 >>> ', response)
            
            return response.data
        },
        error => {
            const { response } = error
            if (response) {
                const status = response.status
                switch (status) {
                    case 404:
                        // ElMessage({type:'error',message:'资源不存在 404'})
                        break
                    case 401:
                        // ElMessage({type:'error',message:'Unauthorized 身份验证凭证缺失!'})
                        break
                    case 403:
                        // ElMessage({type:'error',message:'403 Forbidden - 拒绝访问!'})
                        break
                    case 500:
                        // ElMessage({type:'error',message:'服务器出错'})
                        break
                    default:
                        // ElMessage({type:'error',message:'出现异想不到的错误！'})
                        break
                }
            }else {
                // 说明服务器连结果都没有返回，可能的原因有两种：
                /**
                 * 1. 服务器崩掉了
                 * 2. 前端客户端断网状态
                 */
                if (!window.navigator.onLine) {
                    // 判断为断网，可以跳转到断网页面
                    // ElMessage({type:'error',message:'网络不可用,请检查您的网络连接!'})
                    return
                } else {
                    // ElMessage({type:'error',message:'连接服务端出错!' + error?.message})
                    return Promise.reject(error)
                }
            }
            return Promise.reject(error)
        }
    )
//导出axiosInstance
export default axiosInstance
```

创建axios二次封装文件api文件，内部文件模块化封装请求

```
import axiosInstance from '@/utils/request'
/**
 * 登录接口
 * @param {*} username
 * @param {*} password
 * @returns
 */
export const requestLogin = (username,password) => {
    return axiosInstance({
        method: 'post',
        url: '/api/login',
        // headers: { 'Content-Type': 'multipart/form-data'},
        data: {
            username,
            password,
        },
    })
}
```

## 10.创建并配置配置ts类型文件types

在src目录下创建types文件夹，在该文件夹下创建types.ts文件进行配置

```
//sxios网络接受数据类型文件
export interface axiosCode {
    resultCode: number
    resultInfo: any
    token?: string
}
```

## 11.配置ts识别文件tsconfig.json,因为ts无法识别vue文件

```
{
  "extends": "@vue/tsconfig/tsconfig.web.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },

  "references": [
    {
      "path": "./tsconfig.config.json"
    }
  ]
}

```

## 12.引入UI组件库Element PLUS

使用包管理器

```
npm install element-plus --save
```

### 按需导入[#](https://element-plus.org/zh-CN/guide/quickstart.html#按需导入)

您需要使用额外的插件来导入要使用的组件。

#### 自动导入推荐[#](https://element-plus.org/zh-CN/guide/quickstart.html#自动导入-推荐)

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

```
// vite.config.ts
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//按需引入组件库的三个配置文件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //配置组件库
    AutoImport({
      resolvers: [ElementPlusResolver()],
  }),
  Components({
      resolvers: [ElementPlusResolver()],
  }),
	//到这里
  ],
  //配置路劲@为src
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
```

在main.ts文件引入ElementPlus的css样式

```
import 'element-plus/dist/index.css'
```

## 13.引入重置样式表包管理器

```
npm i normalize.css
```

在main.ts文件引入

```
import 'normalize.css'
```

## 14.引入css模板语法sass

```
npm i sass
```



## 15.app.vue

```
<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped></style>
```

## 16.main.ts

```
import { createApp } from 'vue'
import storeRoot from './stores'

import App from './App.vue'
import router from './router'
//重置样式表
import 'normalize.css'
//引入组件库样式
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(storeRoot)
app.use(router)

app.mount('#app')
```

