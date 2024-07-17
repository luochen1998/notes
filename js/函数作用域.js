// function foo() {
//   function bar() {
//     return "hello"
//   }
//   return bar()
// }
// console.log(foo())

// function foo(a, c, d) {
//   console.log(a, b, c, d)
//   var b = 2
//   function c() {}
//   var d = function () {}
//   b = 3
// }
// foo(1, 2, 3)

// /* 题一 */
// function A(a, b) {
//   console.log(a, b)
//   var b = 123
//   console.log(a, b)
//   function b() {
//     var d = 123
//   }
// }
// A(1, 2)

// /* 题二 */
// var a = 1
// function b() {
//   console.log(a)
//   a = 10
//   console.log(a)
//   return
//   function a() {}
// }
// b()
// console.log(a)

// /* 题三 */

// var foo = 1;
// function bar(){
//   console.log(foo)
//   if(!foo){
//     var foo = 10;
//   }
//   console.log(foo)
// }

// bar()

/* 题四 */
// console.log(foo)
// var foo = "A"
// console.log(foo)

// var foo = function(){
//   console.log("B")
// }
// console.log(foo)

// foo();
// function foo(){
//   console.log("C")
// }
// console.log(foo)
// foo();

/*题五*/
// var foo = 1;
// function bar(a){
//   var a1 = a;
//   var a = foo;
//   function a(){
//     console.log(a);
//   }
//   a1();
// }
// bar(3);

/* 题六 */
var g1 = 123;
var a = 2;
function A(a, b){
  console.log(a, b, g1);
  var b = 123;
  function b(){}
  var a = function(){}
  console.log(a, b)
}
var g1 = 456
A(1, 2);