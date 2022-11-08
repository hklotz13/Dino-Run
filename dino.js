import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty"

const dinoElem = document.querySelector("[data-dino")
const jumpSpeed = 0.45
const gravity = 0.0015
const dinoFrameCount = 2
const frameTime = 100
let isJumping
let yVelocity
let dinoFrame
let currentFrameTime

export function setupDino() {
    isJumping= false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino() {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = "dino-lose.png"
}

function handleRun() {
    if (isJumping) {
        dinoElem.src = `dino-stationary.png`
        return
    }
    if (currentFrameTime >= frameTime) {
        dinoFrame = (dinoFrame + 1) % dinoFrameCount
        dinoElem.src = `dino-run-${dinoFrame}.png`
        currentFrameTime -= frameTime
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= gravity * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return
    yVelocity =jumpSpeed
    isJumping = true
}