/**
 *1.把this转化成一个对象（数组本身是对象不需要转化）
 *2.定义一个变量len等于this（数组）的长度
 *3.判断callback是不是一个函数不是抛出异常
 *4.定义一个k等于0
 *5.Repeat循环 k小于数组长度，把k转成字符串pk,判断pk是不是（this）里面的属性
 *
 */

const arr = [1, 2, 3]
const arr1 = [1, 2, 3]
const arr2 = [, , 3]
Array.prototype.mayForEach = function (callback) {
  const len = this.length
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function")
  }
  let k = 0
  while (k < len) {
    const pk = String(k)
    if (pk in this) {
      const kValue = this[pk]
      // console.log(kValue,'kValue')
      callback.call(this, kValue, k, this)
    }
    k++
  }
}
arr.forEach((item, i) => {
  // arr.push(2)
  arr.splice(i, 1)
})
arr1.mayForEach((item, i) => {
  arr1.splice(i, 1)
})
console.log(arr)
console.log(arr1)
