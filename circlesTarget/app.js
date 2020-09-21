/**@type {HTMLCanvasElement} */
const cnv = document.getElementById('cnv')
const ctx = cnv.getContext('2d')
let W = cnv.width = 600,
    H = cnv.height = 600;

const
    pi = Math.PI,
    pi2 = pi * 2,
    piD2 = pi / 2,
    degree = pi / 180;

const Mouse = new Vector2(W / 2, H / 2)
const particles = []
const opts = {
    size: 10,
    minSpeed: 1,
    maxSpeed: 1.5,
    canvas: {
        amount: 50,
        bgc: 'rgba(34, 34, 34, 0.4)'
    }
}
const colors = [
    '#08f',
    '#f08',
    '#f80',
    '#8f0',
    '#0f8',
]
let tick = 0

function minMax(min, max) {
    return Math.floor((min + 0.5) + Math.random() * (max - min + 0.5))
}

function resize(event) {
    W = cnv.width = cnv.offsetWidth
    H = cnv.height = cnv.offsetHeight
}

window.addEventListener('resize', resize, { passive: true })
resize()

class Particle {
    constructor(x, y) {
        this.pos = new Vector2(x || 0, y || 0)
        this.acc = new Vector2()
        this.speed = new Vector2()
        this.color = colors[minMax(0, 4)]
        this.maxSpeed = minMax(opts.minSpeed, opts.maxSpeed) + Math.random()
    }

    update() {
        this.speed.add(this.acc)
        this.pos.add(this.speed)
        this.acc.set(0)

        return this
    }

    render() {
        ctx.fillStyle = this.color
        // ctx.fillRect(this.pos.x, this.pos.y, opts.size, opts.size)
        let d = this.speed.direction()
        ctx.beginPath()
        ctx.moveTo(Math.cos(d) * opts.size + this.pos.x, Math.sin(d) * opts.size + this.pos.y);
        ctx.lineTo(Math.cos(d + piD2) * (opts.size / 2) + this.pos.x, Math.sin(d + piD2) * (opts.size / 2) + this.pos.y);
        ctx.lineTo(Math.cos(d - piD2) * (opts.size / 3) + this.pos.x, Math.sin(d - piD2) * (opts.size / 3) + this.pos.y);
        ctx.lineTo(Math.cos(d) * opts.size + this.pos.x, Math.sin(d) * opts.size + this.pos.y);
        ctx.closePath()
        ctx.fill()

        return this
    }

    border() {

    }

    lookFor(target) {
        let direction = target.copy()
        direction.sub(this.pos)
        let steer = direction.sub(this.speed)
        steer.limit(this.maxSpeed)
        this.force(steer)

        return this
    }

    force(f) {
        this.acc.add(f)
    }
}

function populate() {
    particles.length = 0

    for (let i = 0; i < opts.canvas.amount; particles[i++] = new Particle(minMax(0, W), minMax(0, H))) { }
}

function setUp() {
    populate()
    window.requestAnimationFrame(loop)
}

function loop(ms) {
    ctx.fillStyle = opts.canvas.bgc
    ctx.fillRect(0, 0, W, H)
    for (let i = 0; i < particles.length; i++) {
        particles[i].lookFor(Mouse).update().render();
    }
    window.requestAnimationFrame(loop)
}

setUp()

cnv.addEventListener('mousemove', (event) => {
    Mouse.set(event.offsetX, event.offsetY)
})








































































