
//初始化canvas
let canvas = document.createElement('canvas')
document.body.append(canvas)
canvas.width = 400
canvas.height = 400
let ctx = canvas.getContext('2d')
ctx.translate(200, 200);

//绘制圆
ctx.save()
ctx.beginPath()
ctx.arc(0, 0, 200, 0, Math.PI * 2)
ctx.stroke()
ctx.restore()
//绘制大刻度
ctx.save()
ctx.beginPath()
ctx.strokeStyle = '#ccc'
ctx.lineWidth = 8
for (let i = 0; i < 12; i++) {
    ctx.beginPath()
    ctx.moveTo(0, -200)
    ctx.lineTo(0, - 180)
    ctx.stroke()
    ctx.rotate(Math.PI * 2 / 12) //这里表示每次旋转的角度已经自动算了  
}
ctx.restore()

//绘制小刻度
ctx.save()
ctx.beginPath()
ctx.strokeStyle = '#000'
ctx.lineWidth = 4
for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
        ctx.beginPath()
        ctx.moveTo(0, -200)
        ctx.lineTo(0, - 190)
        ctx.stroke()
    }
    ctx.rotate(Math.PI * 2 / 60) //这里表示每次旋转的角度已经自动算了  
}
ctx.restore()

//绘制大刻度数字
// ctx.save()
// ctx.beginPath()
// ctx.font = '20px sans-serif'
// ctx.textAlign = 'center'
// ctx.textBaseline = 'middle'
// const r = 160
// const hd = Math.PI * 2 / 12
// for (let i = 0; i < 12; i++) {
//     const text = i === 0 ? 12 : i
//     const x = Math.sin(hd * i) * r
//     const y = -Math.cos(hd * i) * r
//     ctx.fillText(text, x, y)
// }
// ctx.restore()

//创建第二个canvas只绘制时针分针秒针
// canvas = document.createElement('canvas')
// document.body.append(canvas)
// canvas.width = 400
// canvas.height = 400
// ctx = canvas.getContext('2d')
// ctx.translate(200, 200);
// (function draw() {
//     ctx.clearRect(-200, -200, canvas.width, canvas.height)
//     //获得当前时间的时分秒，
//     const now = new Date()
//     const hour = now.getHours() % 12
//     const minute = now.getMinutes()
//     const second = now.getSeconds()
//     // console.log(hour, minute, second);

//     //绘制时针
//     ctx.save()
//     ctx.beginPath()
//     ctx.rotate(Math.PI * 2 / 3600 / 12 * (hour * 3600 + minute * 60 + second)) //绘制分针
//     ctx.moveTo(-5, 0)
//     ctx.lineTo(-5, -100)
//     ctx.quadraticCurveTo(-15, -100, 0, -120)
//     ctx.quadraticCurveTo(15, -100, 5, -100)
//     ctx.lineTo(5, 0)
//     ctx.closePath()
//     ctx.fill()
//     ctx.restore()
//     //绘制分针
//     ctx.save()
//     ctx.beginPath()
//     ctx.rotate(Math.PI * 2 / 3600 * (minute * 60 + second)) //绘制分针
//     ctx.lineWidth = 6
//     ctx.strokeStyle = '#ccc'
//     ctx.moveTo(0, 15)
//     ctx.lineTo(0, -140)
//     ctx.stroke()
//     ctx.restore()
//     //绘制秒针
//     ctx.save()
//     ctx.beginPath()
//     ctx.rotate(Math.PI * 2 / 60 * second) //绘制秒针
//     ctx.lineWidth = 2
//     ctx.strokeStyle = '#f00'
//     ctx.moveTo(0, 15)
//     ctx.lineTo(0, -190)
//     ctx.stroke()
//     ctx.restore()
//     //绘制圆点
//     ctx.save()
//     ctx.beginPath()
//     ctx.arc(0, 0, 6, 0, Math.PI * 2)
//     ctx.fill()
//     ctx.restore()
//     setInterval(draw, 1000)
// })();
