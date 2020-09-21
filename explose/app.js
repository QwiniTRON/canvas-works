/**@type {HTMLCanvasElement} */
const cnv = document.getElementById('cnv')
const ctx = cnv.getContext('2d')
const W = cnv.width = 600,
    H = cnv.height = 600,
    vh = H / 100,
    vw = W / 100;



const gameOptions = {
    partLifeTime: 65,
    fpsOnFrame: 1,
    partSize: 5
}


function minMax(min, max) {
    return Math.floor((min + 0.5) + Math.random() * (max - min + 0.5))
}

let prevTime = 0
const timeConst = 1000 / 60
const exploses = []
let ticks = 0

function loop(ms) {
    window.requestAnimationFrame(loop)
    ticks = normalizeRange(ticks, 1000)

    if(ticks % gameOptions.fpsOnFrame == 0){
        let theta = ((ms - prevTime) / timeConst).toFixed(3)
    
        clearLayout()
        drawExpolses(theta)
        prevTime = ms 
    }
    ticks++
}

function generateExplose(x, y) {
    const expolse = []
    let partCount = minMax(30, 60)

    for (let i = 0; i < partCount; i++) {
        expolse.push({
            x: x,
            y: y,
            xv: 5 * (2 * (Math.random() - 0.5)),
            yv: 5 * (2 * (Math.random() - 0.5)),
            age: 0,
            w: gameOptions.partSize,
            h: gameOptions.partSize
        })
    }
    exploses.push(expolse)
}

function normalizeRange(num, range){
    if(num > range){
        return 0
    }else{
        return num
    }
}

function clearLayout() {
    ctx.clearRect(0, 0, W, H)
}

function drawExpolses(theta) {
    for (let i in exploses) {
        let explose = exploses[i]
        if (explose.length > 0) {
            drawExplose(theta, explose)
        } else {
            exploses.splice(i, 1)
        }
    }
}

function drawExplose(theta, explose) {
    for (const j in explose) {
        const part = explose[j]
        if (part.age > gameOptions.partLifeTime) {
            explose.splice(j, 1)
        } else {
            part.x += part.xv
            part.y += part.yv

            ctx.fillStyle = `rgba(
                    ${minMax(0, 255)}, 
                    ${minMax(0, 255)}, 
                    ${minMax(0, 255)}, 
                    ${1 - 0.2 * part.age / gameOptions.partLifeTime}
                )`
            ctx.fillRect(part.x, part.y, part.w, part.h)

            part.age += minMax(1, 3)
        }
    }
}

cnv.addEventListener('click', (event) => {
    let xScale = W / cnv.offsetWidth
    let yScale = H / cnv.offsetHeight

    generateExplose(event.offsetX * xScale, event.offsetY * yScale)
})

document.querySelectorAll('input[type="range"]').forEach((el) => {
    el.addEventListener('change', (event) => {
        gameOptions[event.target.name] = Math.round(event.target.value)
    })
})





// START
loop()






