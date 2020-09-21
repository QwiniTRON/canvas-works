/**@type {HTMLCanvasElement} */
const cnv = document.getElementById('cnv')
const ctx = cnv.getContext('2d')
let W,
    H,
    tick = 0;

    const opts = {
        color: 'rgba(39, 173, 96, {alpha})',
        spawnOpacity: 1,
        sizeRandom: 10,
        size: 50,
        rectLife: '0.1',
        rectCount: 1
    }

function resize(event){
    W = cnv.width = cnv.offsetWidth
    H = cnv.height = cnv.offsetHeight
}
resize()
window.addEventListener('resize', resize)

function setUp(){
    window.requestAnimationFrame(loop)
}

function loop(ms){
    ++tick
    if(tick % 10 == 0){
        render()
    }
    window.requestAnimationFrame(loop)
}

function render(){
    let color = opts.color.replace('{alpha}', opts.spawnOpacity)
    ctx.fillStyle = color

    for(let i = 0; i < opts.rectCount; i++){
        let random = Math.random() * opts.sizeRandom
        ctx.fillRect(Math.random() * W - opts.size/2, Math.random() * H  - opts.size/2, opts.size + random, opts.size + random)
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${opts.rectLife})`
    ctx.fillRect(0, 0, W, H)
}

setUp()




