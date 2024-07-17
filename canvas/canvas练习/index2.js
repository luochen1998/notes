//初始化canvas
const canvas = document.createElement('canvas')
document.body.append(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.backgroundColor = '#000'
const ctx = canvas.getContext('2d')