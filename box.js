class Box {
    constructor(x, y, xdir, ydir) {
        this.position = {
            x: x,
            y: y
        }
        this.dimensions = {
            width: 75,
            height: 75,
        }
        this.direction = {
            x: xdir,
            y: ydir,
        }
        this.speed = {
            x: 0.5,
            y: 0.5
        }
        this.isDead = false
        this.color = "red"
        this.smash = new Audio("./antdead.ogg")
        this.image = new Image()
        this.image.src = "./spider01.png"
        this.imageIndexX = 0
        this.imageIndexY = 0
    }
    get left() {
        return this.position.x;
    }
    get right() {
        return this.position.x + this.dimensions.width;
    }
    get top() {
        return this.position.y;
    }
    get bottom() {
        return this.position.y + this.dimensions.height;
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.drawImage(this.image, this.imageIndexX * 64, this.imageIndexY * 64, 64, 64, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    }
    ant_kill(x, y) {
        for (let i = 0; i < 10; i++) {
            if (x >= this.left &&
                x <= this.right &&
                y > this.top &&
                y < this.bottom) {
                if (!this.isDead) {
                    // this.color = "green"
                    this.direction.x = 0
                    this.direction.y = 0
                    this.isDead = true
                    this.smash.play()
                    return 1
                }
            }
        }
        return 0
    }
    box_collision(boxes) {
    for (let i = 0; i < boxes.length; i++) {
        const other = boxes[i];
        if (other === this || other.isDead) continue;
        if (
            this.right > other.left &&
            this.left < other.right &&
            this.bottom > other.top &&
            this.top < other.bottom
        ) {
            const overlapX =
                Math.min(this.right, other.right) -
                Math.max(this.left, other.left);

            const overlapY =
                Math.min(this.bottom, other.bottom) -
                Math.max(this.top, other.top);
            if (overlapX < overlapY) {
                if (this.position.x < other.position.x) {
                    this.position.x -= overlapX;
                } else {
                    this.position.x += overlapX;
                }
                this.direction.x *= -1;
            } else {
                if (this.position.y < other.position.y) {
                    this.position.y -= overlapY;
                } else {
                    this.position.y += overlapY;
                }
                this.direction.y *= -1;
            }
        }
    }
}


    collision() {
        if (this.position.x <= 0 || this.position.x + this.dimensions.width >= window.innerWidth - 10) {
            this.direction.x *= -1
        }
        if (this.position.y <= 100 || this.position.y + this.dimensions.height >= window.innerHeight-10) {
            this.direction.y *= -1
        }
    }
    update(level) {
        this.position.x += this.speed.x * this.direction.x*level
        this.position.y += this.speed.y * this.direction.y*level
        this.collision()
    }
}
export default Box