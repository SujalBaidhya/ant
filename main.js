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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, 80);
    ctx.font = "28px Arial Narrow";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${count}`, 30, 50);
    ctx.fillText(`Level: ${level}`, canvas.width - 180, 50);
    ctx.textAlign = "center";
    ctx.fillText(`Time: ${Math.max(0, seconds)}`, canvas.width / 2, 50);
    ctx.textAlign = "left";
    if (seconds < 0)
    {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "64px Arial Narrow";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

        ctx.font = "32px Arial Narrow";
        ctx.fillText(`Final Score: ${count}`, canvas.width / 2, canvas.height / 2 + 20);

        ctx.textAlign = "left";
        return;
    }
    for (let i = 0; i < ant.length; i++) {
        ant[i].draw(ctx);
        ant[i].update(level);
        ant[i].box_collision(ant);
    }

}
gameloop()
setInterval(function () {
    for (let i = 0; i < 10; i++) {
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
