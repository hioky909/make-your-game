document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    const scoreDisplay = document.querySelector(".score")
    const timerDisplay = document.querySelector(".timer")
    const livesDisplay = document.querySelector(".lives")
    const gamePause = document.querySelector(".style")
    const continueGame = document.querySelector(".continue")
    const youLoose = document.querySelector("#loose")
    const youWin = document.querySelector("#win")


    
    const width = 10
    const squareSize = 30
    let score = 0;
    let pacmanX = 1 * squareSize
    let pacmanY = 1 * squareSize
    let pacmanDirection = null
    let ghostX = 8 * squareSize
    let ghostY = 8 * squareSize
    let isPaused = false  
    let time = 0
    let lives = 3

    const layout = [
        1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,1,0,0,0,0,1,
        1,0,1,0,1,0,1,1,0,1,
        1,0,1,0,0,0,0,1,0,1,
        1,0,1,1,1,1,0,1,0,1,
        1,0,0,0,0,1,0,0,0,1,
        1,0,1,1,0,1,1,1,0,1,
        1,0,1,0,0,0,0,1,0,1,
        1,0,0,0,1,1,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1
    ]

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement("div")
            square.style.width = `${squareSize}px`
            square.style.height = `${squareSize}px`
            grid.appendChild(square)
            if (layout[i] === 1) square.classList.add("wall")
            if (layout[i] === 0) square.classList.add("dot")
        }
        updateTimer()
    }
    createBoard()
    
    function updateTimer() {
        if (!isPaused) {
            time++
            timerDisplay.innerText = time + "s"
        }
    }

    setInterval(updateTimer, 1000)

    

    function togglePause() {
        isPaused = !isPaused
        gamePause.style.display = isPaused ? "block" : "none"
        if (isPaused) {
            clearInterval(moveInterval)
            clearInterval(ghostInterval)
            clearInterval(timerInterval)
          } else {
            moveInterval = setInterval(movePacman, 200)
            ghostInterval = setInterval(moveGhost, 300)
            timerInterval = setInterval(updateTimer, 1000)
        }
    }

    const pacman = document.createElement("div")
    pacman.classList.add("pacman")
    pacman.style.width = `${squareSize}px`
    pacman.style.height = `${squareSize}px`
    pacman.style.position = "absolute"
    pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`
    grid.appendChild(pacman)

    const ghost = document.createElement("div")
    ghost.classList.add("ghost")
    ghost.style.width = `${squareSize}px`
    ghost.style.height = `${squareSize}px`
    ghost.style.position = "absolute"
    ghost.style.transform = `translate(${ghostX}px, ${ghostY}px)`
    grid.appendChild(ghost)


    function checkCollision() {
        if (pacmanX === ghostX && pacmanY === ghostY) {
            lives--
            livesDisplay.textContent = `${lives}`
            if (lives <= 0) {
                gameOver()
            } else {
                resetPacmanPosition()
            }
        }
    }
    
    function resetPacmanPosition() {
        pacmanX = 1 * squareSize
        pacmanY = 1 * squareSize
        pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`
    }
    
    function gameOver() {
        isPaused = true
        youLoose.style.display = isPaused ? "block" : "none"
        clearInterval(moveInterval)
        clearInterval(ghostInterval)
        clearInterval(timerInterval)
    }
    
    function movePacman() {
        if (isPaused) return
        let targetX = pacmanX
        let targetY = pacmanY
        if (targetX % squareSize !== 0 || targetY % squareSize !== 0) return
        if (pacmanDirection === "left" && pacmanX > 0) targetX -= squareSize
        if (pacmanDirection === "right" && pacmanX < (width - 1) * squareSize) targetX += squareSize
        if (pacmanDirection === "up" && pacmanY > 0) targetY -= squareSize
        if (pacmanDirection === "down" && pacmanY < (width - 1) * squareSize) targetY += squareSize
    
        let nextIndex = (targetY / squareSize) * width + (targetX / squareSize)
        if (layout[nextIndex] === 1) return
    
        let startX = pacmanX
        let startY = pacmanY
        let startTime = performance.now()
        let duration = 200
    
        function animate(currentTime) {
            let progress = Math.min((currentTime - startTime) / duration, 1)
            pacmanX = startX + (targetX - startX) * progress
            pacmanY = startY + (targetY - startY) * progress
            pacman.style.transform = `translate(${pacmanX}px, ${pacmanY}px)`
    
            if (progress < 1) {
                requestAnimationFrame(animate)
            } else {
                checkDotCollision()
                checkCollision()
                movePacman()
            }
        }
    
        requestAnimationFrame(animate)
    }

    setInterval(movePacman, 200)

    let ghostDirection = { x: 0, y: 0 }
    const ghostSpeed = 3
    let ghostMoving = false
    
    function moveGhost() {
        if (isPaused || ghostMoving) return
        ghostMoving = true
    
        let dx = pacmanX - ghostX
        let dy = pacmanY - ghostY
        let moveX = dx !== 0 ? (dx / Math.abs(dx)) * squareSize : 0
        let moveY = dy !== 0 ? (dy / Math.abs(dy)) * squareSize : 0
    
        let possibleDirections = []

        let directions = [
            { x: squareSize, y: 0 },
            { x: -squareSize, y: 0 },
            { x: 0, y: squareSize },
            { x: 0, y: -squareSize }
        ]
    
        for (let dir of directions) {
            let testX = ghostX + dir.x
            let testY = ghostY + dir.y
            let testIndex = (testY / squareSize) * width + (testX / squareSize)
            if (layout[testIndex] !== 1 && !(dir.x === -ghostDirection.x && dir.y === -ghostDirection.y)) {
                possibleDirections.push(dir)
            }
        }
    
        let nextDirection

        if (Math.abs(dx) > Math.abs(dy)) {
            nextDirection = possibleDirections.find(dir => dir.x === moveX) || possibleDirections.find(dir => dir.y === moveY)
        } else {
            nextDirection = possibleDirections.find(dir => dir.y === moveY) || possibleDirections.find(dir => dir.x === moveX)
        }
    
        if (!nextDirection) {
            nextDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
        }
    
        if (nextDirection) {
            ghostDirection = nextDirection;
            animateGhostMove(ghostX, ghostY, ghostX + nextDirection.x, ghostY + nextDirection.y)
        } else {
            ghostMoving = false
        }
    }
    
    function animateGhostMove(startX, startY, endX, endY) {
        let progress = 0;
        function step() {
            progress += ghostSpeed;
            let ratio = progress / squareSize
    
            if (ratio >= 1) {
                ghostX = endX
                ghostY = endY
                ghost.style.transform = `translate(${ghostX}px, ${ghostY}px)`
                ghostMoving = false
                checkCollision()
                return
            }
    
            let currentX = startX + (endX - startX) * ratio
            let currentY = startY + (endY - startY) * ratio
            ghost.style.transform = `translate(${currentX}px, ${currentY}px)`
    
            requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }
    
    setInterval(moveGhost, 100)
    

    document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            togglePause()
            return
        }
        if (!isPaused) {
            if (e.key === "ArrowLeft") pacmanDirection = "left"
            if (e.key === "ArrowRight") pacmanDirection = "right"
            if (e.key === "ArrowUp") pacmanDirection = "up"
            if (e.key === "ArrowDown") pacmanDirection = "down"
        }
    })

    continueGame.addEventListener("click", () => {
        togglePause()
    })
    
    function checkDotCollision() {
        let pacmanIndex = Math.round(pacmanY / squareSize) * width + Math.round(pacmanX / squareSize)
        const dots = document.querySelectorAll(".dot")
        dots.forEach((dot) => {
            let dotIndex = Array.from(grid.children).indexOf(dot)
            if (dotIndex === pacmanIndex) {
                dot.classList.remove("dot")
                score++
                scoreDisplay.textContent = `${score}`

                 youWinGame()
            }
         })
    }

    function youWinGame() {
        const dots = document.querySelectorAll(".dot")
        if (dots.length === 0) {
            isPaused = true
            youWin.style.display = isPaused ? "block" : "none"
            clearInterval(moveInterval)
            clearInterval(ghostInterval)
            clearInterval(timerInterval)
        }
    }

})

let lastTime = performance.now()

function gameLoop(currentTime) {
    if(isPaused) return
    lastTime = currentTime
    requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)


let moveInterval = setInterval(movePacman, 200)
let ghostInterval = setInterval(moveGhost, 300)
let timerInterval = setInterval(updateTimer, 1000)

