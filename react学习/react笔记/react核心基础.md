###### **创建**react脚手架

npx create-react-app user-app

### 1.reactApi

```js
npx create-react-app my-app
cd my-app
npm start
```



###### 1.React.createElement()，用来创建一个react元素

```js
	-##参数：
  		1.元素名或组件名
		2.元素（标签）的属性（可以填入null或者undefiend）
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

​	（1）**root.render（）**将一段 [JSX](https://zh-hans.react.dev/learn/writing-markup-with-jsx)（“React 节点”）或者react元素在 React 的根节点中渲染为 DOM 节点并显示，根元素中的所有内容会被删除，被react元素替换，他会确保只修改发生变化的元素，对DOM做最少的修改

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
		1.调用 root.unmout 将卸载根节点内的所有组件，该根节点上的 React 将被剥离，即所有事件处理程序以及组件树上的状态将被移除。

		2.一旦调用 root.unmout，就不能在该根节点上调用 root.render。在一个已经卸载的根节点上尝试调用 root.render 将会抛出异常错误信息“无法更新一个未挂载的根节点（Cannot update an 		  unmouted root）”。不过，你可以在卸载一个根节点后又重新创建它。
        
        root.unmount()
```

### 2.JSX语法

  （1）在React中可以通过JSX（JS扩展）来创建React元素，JSX需要被翻译为JS代码，才能被React执行要在React中使用JSX，必须引入babel来完成“翻译”工作,JSX本质是React.createElement的一种语法糖

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
    *       5. 在JSX中使用js表达式写在花括号中{}
    *              - 有值的语句的就是表达式
    *       6. 如果表达式是空值、布尔值、undefined，将不会显示
    *       7. 在JSX中，属性可以直接在标签中设置
    *           注意：
    *               class需要使用className代替
    *               style中必须使用对象设置
    *                   style={{background:'red'}}
    *		8.JSX中的注释要写在花括号中{}
    *		9.jsx中的数组会自动展开	
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

### 	3.组件和事件绑定

##### 	1.类组件

​		在react中使用类的方式来声明一个组件

```js
            class 类名 extents React.Component{
                render (){
                    return(
                    //一段JSX
                    )
                }
            }
```



##### 		 	2.函数组件

​		**早期**的函数组件被称为无状态组件，一般仅仅用来做纯UI展示，不会有复杂逻辑从react16.8 推出hooks后，更多使用函数组件，这不仅仅是语法的改变，同时也代表着整个react编程思想的一种转变

```js
            function 组件名（）{
                render (
                //一段JSX
                )
            }
```

##### 3.为组件绑定事件

###### 	1.注意事项	

```js
		-在React中无法通过return false 来阻止默认事件，所以必须用e.preventDefault来阻止默认行	为
		-React中的事件处理函数中传入的事件对象是一个合成事件对象，react对原生事件的二次封装
		-React也提供了访问原生事件对象的方式
			 const handleClick = (e) => {
            	e.nativeEvent  //原生事件对象
                e.preventDefault //阻止事件默认行为
          }

```

###### 	2.函数组件事件绑定

```js
       function App(){
          const handleClick = (str,e) => {
            console.log(str)
            e.nativeEvent  //原生事件对象
          }
          return (
            <>
              <button onClick={handleClick（'hello'）}>点击</button>
            </>
          )
        }
```

###### 	3.类组件事件绑定

```js
		class App extends.Component{
			handleClick(e){ console.log(this); //undefinedcon('hello')
			}
             handleAlert() {
    			window.alert("hello")
  			}
            render (){
                    return(
                     <button onClick={this.handleClick}>点击</button>
            		 <button onClick={this.handleAlert}>点击有弹窗</button>
                    )
                }
		}
```

###### 	4.类组件中的this指向

```js
		由于JS中this的特殊性,事件处理函数中的this并不会指向当前的组件，需要自行对this进行修正
			//1.将事件处理函数修改为箭头函数
            	class App extends.Component{
				//handleClick(e){ 
                //    console.log(this); //undefined('hello')
				//}
                  handleClick=(e)=>{ 
                   console.log(this);
				  }
            		render (){
                    return(
                     <button onClick={this.handleClick}>点击</button>
                    )
                	}
				}
                
              //2. 将事件绑定修改为箭头函数
                
                 class App extends.Component{
					handleClick(e){ 
                   	console.log(this)
					}
            		render (){
                    return(
                     <button onClick={（）=>{this.handleClick()}}>点击</button>
                    )
                	}
				}
                
              //3.使用bind方法来强制绑定this的指向
                  class App extends.Component{
					handleClick(e){ 
                   	console.log(this)
					}
            		render (){
                    return(
                     <button onClick={this.handleClick.bind(this,id)}>点击</button>
                    )
                	}
				}
               
```

###### 	5.向事件处理程序传递参数	

- 通过bind方法在绑定this指向时向事件处理函数进行传参

  ```js
   <button onClick={this.handleClick.bind(this,1)}>点击</button>
  ```

- 绑定事件时，通过书写箭头函数的形式来传参

  ```js
  <button onClick={(e)=>{this.handleClick(1,e)}}>点击</button>
  ```

### 4.组件状态与数据传递

​	本章主要包含以下知识点：

- 组件状态

- *props*

- *props* 验证

- 状态提升

  ###### 1.组件状态（state）

  ```js
  class 类名 extends React.Component{
    constructor(){
      super();
      // 设置组件自身的数据状态
      this.state = {
        xxx : xxx
      }
    }
    render(){
      return (
      	// 通过 {this.state.xxx} 来获取状态数据
      )
    }
  }
  
  // 或者
  class 类名 extends React.Component{
    state = {
        xxx : xxx
    }
    render(){
      return (
      	// 通过 {this.state.xxx} 来获取状态数据
      )
    }
  }
  
  	1.不要直接去修改状态值，直接修改不会重新渲染组件。而是通过setState方法修改组件的state状态数据
      class App extends React.Component {
    		state = {
      	num: 2,
    		}
            clickHandle = () => { //不能直接修改使用 setState()
              this.state.num++ //Do not mutate state directly. Use setState()
            }
            render() {
              return (
                <>
                  <button onClick={this.clickHandle}>+{this.state.num}</button>
                </>
              )
            }
          }
      2.setState它对状态的改变可能是异步，如果改变的状态处于某个HTML元素事件中，则其是异步，否则是同步。出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用值。
      	class App extends React.Component {
            state = {
              num: 1,
            }
            clickHandle = () => {
              this.setState({
                num: this.state.num + 1,
              })
              this.setState({
                num: this.state.num + 1,
              })
              this.setState({
                num: this.state.num + 1,
              })
              console.log(this.state.num)
            }
           
            render() {
              console.log("render")
              return (
                <>//最终结果每次+1而不是+3
                  <button onClick={this.clickHandle}>+{this.state.num}</button>
                </>
              )
            }
          }
      3.如果在事件处理函数里面想拿到 setState 执行后的数据，可以提前使用一个变量来存储计算结果，或者使用 setState 的第二个参数，它是一个回调函数，这个函数会在 state 更新后被调用。
  		class App extends React.Component {
            state = {
              num: 1,
            }
             /*clickHandle = () => { //变量存储方式（render函数执行前获取执行后的数据）
      			const newNum = this.state.num + 1
      			this.setState({
        			num: newNum,
      			})
      			console.log(newNum) //2
    			} */
  			  clickHandle = () => { //回调函数形式（render函数执行后执行回调函数）
                  this.setState(
                    {
                      num: this.state.num + 1,
                    },
                    () => {
                      console.log(this.state.num) 
                    }
                  )
                }
            render() {
              console.log("render")
              return (
                <>
                  <button onClick={this.clickHandle}>+{this.state.num}</button>
                </>
              )
            }
          }
          
         4.如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（setState 的第一个数）或者在第二个参数回调函数中设置（会导致回调地狱）
         	class App extends React.Component {
            state = {
              num: 1,
            }
              clickHandle = () => {  //根据之前状态进行运算
                  this.setState((state) => ({
                    num: state.num + 1,
                  }))
                  this.setState((state) => ({
                    num: state.num + 1,
                  }))
                  this.setState((state) => ({
                    num: state.num + 1,
                  }))
                }
           
            render() {
              console.log("render")
              return (
                <>//最终结果每次+3
                  <button onClick={this.clickHandle}>+{this.state.num}</button>
                </>
              )
            }
          }
         ##注意点： 
         		1.把所有的 setState 当作是异步的
              2.永远不要信任 setState 调用之后的状态
              3.如果要使用改变之后的状态，需要使用回调函数（setState 的第二个参数）
              4.如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（setState 的第一个函数）	
              5.出于性能考虑React 会对异步的 setState 进行优化，将多次 setState 进行合并（将多次状态改变完成后，再统一对 state 进行改变，然后触发 render）
              clickHandle = () => {  //根据之前状态进行运算
                  this.setState((state) => ({
                    num: state.num + 1,
                  }),
        			() => {
          		console.log(this.state.num)//num初始值为1，最终结果4
        			})
                  this.setState((state) => ({
                    num: state.num + 1,
                  }))
                  this.setState((state) => ({
                    num: state.num + 1,
                  }))
                }
  ```

  ###### 	2.props

  ​		**1.props传递数据**，如果是父组件向子组件传递数据，则使用 *prop*s。

  ```js
              //1.如果是函数组件，props 作为函数的一个参数传入：
  			function 组件名(props) {
                return (
                  // 一段 JSX
                  // 通过 props.xxx 获取传入的值
                  <div>
                    <p>姓名：{props.name}</p>
                    <p>年龄：{props.age}</p>
                    <p>性别：{props.gender}</p>   
                  </div>
                );
              }
              
              //2.如果是类组件，则需要在 constructor 中将 props 通过 super 传递给父类，然后通过 this.props 的方式来获取传入的值：
                   class 组件名 extends React.Component {
            			constructor(props) {
              			super(props);
            			}	
                    render() {
                      return (
                         // 一段 JSX
                           // 通过 this.props.xxx 获取传入的值
                          <div>
                            <p>姓名：{this.props.name}</p>
                            <p>年龄：{this.props.age}</p>
                            <p>性别：{this.props.gender}</p>   
                          </div>
                       );
                      }
                  }
                  
                //3.通过 props.children，可以实现类似于 Vue 中插槽的功能，例如：(功能没有vue插槽功能丰富)或者传递组件实现插槽  
              		class 组件B extends React.Component{
                            constructor(props){
                              super(props);
                            }
                            render(){
                              return (
                                <div>
                                    {this.props.children}
                                  <div> {this.props.left}</div>
                                </div>
                                
                              );
                            }
                          }
                          class 组件A extends React.Component{
                            constructor(props){
                              super(props);
                            }
                            render(){
                              return (
                                <组件B left={<p>插槽</p>}>
                                  <p>Hello, React</p>
                                  <p>Hello, Redux</p>
                                  <p>Hello, Facebook</p>
                                  <p>Hello, Google</p>
                                </组件B>
                              );
                            }
                          }
  ```

  ```js
  
  ```

  ​	2.**props验证和默认值设置**：在 *Vue* 中，可以对传入的 *props* 设置默认值，以及验证 *props* 的有效性，在 *React* 中，针对 *props* 也可以做这些事。通过 *defaultprops* 就可以对 *props* 设置默认值。

  ​		1.默认值设置

  ```react
          //1.函数组件默认值设置
  		function Greeting(props) {
            const { name, age, gender } = props;
            return (
              <div>
                <p>姓名：{name}</p>
                <p>年龄：{age}</p>
                <p>性别：{gender}</p>   
              </div>
             );
          }
          // 设置默认的 props 值，当组件没有传值时会使用默认值
          Greeting.defaultProps = {
            name : 'luochen',
            age : 18,
            gender : 'male'
          };
  
  		//2.类组件默认值设置（在类组件静态属性上面设置或者使用defaultProps）
  		class Greeting extends React.Component {
            constructor(props) {
              super(props);
            }
            // 设置默认的 defaultProps 属性值
            static defaultProps = {
              name : "xiejie",
              age : 18,
              gender : 'male' 
            }
            render() {
              return (
                <div>
                  <p>姓名：{this.props.name}</p>
                  <p>姓名：{this.props.age}</p>
                  <p>姓名：{this.props.gender}</p>
                </div>
              );
            }
          }
          // 或者
          Greeting.defaultProps = {
              name : "luochen",
              age : 18,
              gender : 'male' 
          }
  ```

  ​		

