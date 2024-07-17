### 1.reactApi

###### 1.React.createElement()，用来创建一个react元素

```js
	-参数：
  		1.元素名或组件名
		2.元素（标签）的属性
    		-class属性需要使用className设置，原因是class在js中是关键字
			-在设置事件时，属性名需要修改为驼峰命名
		3.元素的子元素或内容，添加多个子元素时同理
  	-注意点：
		react元素最终会通过虚拟DOM转化为真实的DOM元素
		react元素一旦创建就无法修改，只能通过创建新的元素进行替换
        
	const element = createElement(type, props, ...children)
    //创建react元素
	const div = React.createElement("div",{className:'div'},'我是react创建的div') 
```

###### 2.ReactDOM.createRoot(domNode)，获取根元素，根元素就是react元素插入的位置，返回一个带有两个方法的的对象，这两个方法是：[`render`](https://zh-hans.react.dev/reference/react-dom/client/createRoot#root-render) 和 [`unmount`](https://zh-hans.react.dev/reference/react-dom/client/createRoot#root-unmount)。

```js
	  const root = ReactDOM.createRoot(document.getElementById("root"))
       //ReactDOM.render(div,document.getElementById("root"))//老版本渲染
```

​	（1）**root.render（）**将一段 [JSX](https://zh-hans.react.dev/learn/writing-markup-with-jsx)（“React 节点”）或者react元素在 React 的根节点中渲染为 DOM 		节点并显示，根元素中的所有内容会被删除，被react元素替换，他会确保只修改发生变化的元		素，对DOM做最少的修改

```js
	-参数：
		reactNode：一个你想要显示的 React 节点。它总是一段 JSX，就像 <App />，但是你也总是可以	传递一个 createElement() 构造的 React 元素、一个字符串、一个数字、null 或者 undefined。
    -注意点：
		1.首次调用 root.render 时，React 会先清空根节点中所有已经存在的 HTML，然后才会渲染 		React组件。
        2.如果你的根节点包含了由 React 在构建期间通过服务端渲染生成的 HTML 内容，请使用 		hydrateRoot() 替代这个方法，这样才能把事件处理程序和现有的 HTML 绑定
   
	root.render(<App />) || root.render(div)
```

​	

​	（2）**root.unmount（）**销毁 React 根节点中的一个已经渲染的树。

```js
		-注意点：
		1.调用 root.unmout 将卸载根节点内的所有组件，该根节点上的 React 将被剥离，即所有事件处          理程序以及组件树上的状态将被移除。

		2.一旦调用 root.unmout，就不能在该根节点上调用 root.render。在一个已经卸载的根节点上尝		试调用 root.render 将会抛出异常错误信息“无法更新一个未挂载的根节点（Cannot update an 		  unmouted root）”。不过，你可以在卸载一个根节点后又重新创建它。
        
        root.unmount()
```

### 2.JSX语法

  （1）在React中可以通过JSX（JS扩展）来创建React元素，JSX需要被翻译为JS代码，才能被React执行要在React中使用JSX，必须引入babel来完成“翻译”工作

```js
 // 命令式编程
 	// const button = React.createElement('button', {}, '我是按钮');

 // 声明式编程，结果导向的编程
	//JSX就是React.createElement()的语法糖JSX在执行之前都会被babel转换为js代码
	// const div = <div>我是一个div<button>我是按钮</button></div>;
```

（2）注意事项

```js
 /*
    *   JSX的注意事项
    *       1. JSX不是字符串，不要加引号
    *       2. JSX中html标签应该小写，React组件应该大写开头
    *       3. JSX中有且只有一个根标签
    *       4. JSX的标签必须正确结束（自结束标签必须写/）
    *       5. 在JSX中可以使用{}嵌入表达式
    *              - 有值的语句的就是表达式
    *       6. 如果表达式是空值、布尔值、undefined，将不会显示
    *       7. 在JSX中，属性可以直接在标签中设置
    *           注意：
    *               class需要使用className代替
    *               style中必须使用对象设置
    *                   style={{background:'red'}}
    *
    * */
      function fn() {
        return "hello"
      }

      const name = "孙悟空"

      const div = (
        <div
          id="box"
          onClick={() => {
            alert("哈哈")
          }}
          className="box1"
          style={{ backgroundColor: "yellowgreen", border: "10px red solid" }}
        >
          我是一个div
          <ul>
            <li>列表项</li>
          </ul>
          <input type="text" />
          <div>
            {name} <br />
            {1 + 1} <br />
            {fn()} <br />
            {NaN} <br />
          </div>
        </div>
      )
      const root = ReactDOM.createRoot(document.getElementById("root"))
      root.render(div)
```

