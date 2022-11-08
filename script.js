import { setupDino } from "./dino.js";
import { setupGround, updateGround } from "./ground.js"

const worldWidth=100;
const worldHeight=30;
const worldElem = document.querySelector('[data-world');
const scoreElem = document.querySelector("[data-score");
const startScreenElem = document.querySelector("[data-start-screen]");
const speedScaleIncrease = 0.00001

//resizes game with window
setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, { once: true})

setupGround() 

let lastTime
let speedScale
let score

function update(time) {
    if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
}
const delta = time - lastTime

updateGround(delta, speedScale)
updateDino(delta, speedScale)
updateCactus(delta, speedScale)
updateSpeedScale(delta)
updateScore(delta)
if (checkLose()) return handleLose()

lastTime = time
window.requestAnimationFrame(update)
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollsion(rect, dinoRect))
}

function isCollsion(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleStart() {
    lastTime = null
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    window.requestAnimationFrame(update)
    startScreenElem.classList.add("hide")
    window.requestAnimationFrame(update)
}

function updateSpeedScale(delta) {
    speedScale += delta * speedScaleIncrease
}

function updateScore(delta) {
    score += delta * 0.01
    scoreElem.textContent = Math.floor(score)
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true})
        startScreenElem.classList.remove("hide")
    }, 100)
}

function setPixelToWorldScale() {
    let worldToPixelScale
    if (window.innerWidth / window.innerHeight < worldWidth/worldHeight) {
        worldToPixelScale = window.innerWidth / worldWidth
    } else {
        worldToPixelScale = window.innerHeight / worldHeight
    }
    worldElem.style.width = `${worldWidth * worldToPixelScale}px`
    worldElem.style.height = `${worldHeight * worldToPixelScale}px`
}

