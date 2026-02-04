import Box from "./box.js"
const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight ;
const ctx = canvas.getContext("2d")
let seconds = 60
let level=1
setInterval(function () {
    seconds--    
}, 1000)
let ant = []
let directions = [1, -1]
let count = 0
function create_ant(){
    for (let i = 0; i < 10; i++) {
    let x = Math.floor(Math.random() * (canvas.width - 50))
    let y = Math.floor(Math.random() * (canvas.height - 50-100))+100
    let xdir = Math.floor(Math.random() * 2)
    let ydir = Math.floor(Math.random() * 2)
    ant[i] = new Box(x, y, directions[xdir], directions[ydir], ctx)
    ant[i].draw(ctx)
}}
function clicked(event) {
    let x = event.x
    let y = event.y
    for (let i = 0; i < 20; i++) {
        count+=ant[i].ant_kill(x, y)
    }
}
create_ant()
canvas.addEventListener("mousedown", clicked)
function gameloop() {
    requestAnimationFrame(gameloop)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillText(`Score:${count}`,100,100)
    if(level<=count/10){    
        level++
        create_ant()
    }
    ctx.fillText(`Level:${level}`,canvas.width-200,100)
    for (let i = 0; i < 10; i++) {
        ctx.font = "40px Arial Narrow"
        ctx.fillStyle = "black"
        if (seconds < 0) {
            ctx.fillText("Game Finished", canvas.width / 2-50, 100)
            count=0
        }
        else{ 
        ctx.fillText(seconds, canvas.width / 2, 100)
        ant[i].draw(ctx)
        ant[i].update(level)
        ant[i].box_collision(ant)
    } 
    }
}
gameloop()
setInterval(function () {
    for (let i = 0; i < 20; i++) {
        if (!ant[i].isDead) {
            if (ant[i].direction.y == -1) {
                ant[i].imageIndexX++
                ant[i].imageIndexY = 0
                if (ant[i].imageIndexX > 9) {
                    ant[i].imageIndexX = 4
                }
            }
            else if (ant[i].direction.y == 1 && ant[i].direction.x == -1) {
                ant[i].imageIndexX++
                ant[i].imageIndexY = 1
                if (ant[i].imageIndexX > 9)
                    ant[i].imageIndexX = 4
            }
            else if (ant[i].direction.y == 1 && ant[i].direction.x == 1) {
                ant[i].imageIndexX++
                ant[i].imageIndexY = 2
                if (ant[i].imageIndexX > 9)
                    ant[i].imageIndexX = 4
            }
            else if (ant[i].direction.y == 1 && ant[i].direction.x == 1) {
                ant[i].imageIndexX++
                ant[i].imageIndexY = 3
                if (ant[i].imageIndexX > 9)
                    ant[i].imageIndexX = 4
            }
        }

        if (ant[i].isDead) {
            ant[i].imageIndexY = 4
            if (ant[i].imageIndexX < 3) {
                ant[i].imageIndexX++
            }
            else {
                ant[i].imageIndexX = 3
            }
        }
    }
}, 100)
