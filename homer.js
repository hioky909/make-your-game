let countainer = document.getElementById("mainCountainer")
let displayScore = document.getElementById("displayScore")
let pauseMenu = document.getElementById("pause-menu")
let timerDisplay = document.getElementById('timer')
let burns = document.getElementById('burns')
let win = document.getElementById('you-win')
let loose = document.getElementById('you-loose')

const sounds = ["burp.mp3", "scream.mp3", "woo-hoo.mp3", "victory.mp3", "ouch.mp3", "pause.mp3"]

let pacmanCurrentIndex = 490
let width = 28
let score = 0
let lives = 3
let burnsNum = 4 
let time = 0
let timerInterval
let armys
let isPaused = false
let youLoose = false
let youWin = false



const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 5, 2, 2, 2, 2, 5, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 2, 2, 2, 2, 2, 2, 5, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 5, 5, 5, 5, 5, 5, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]

const squares = []

//createBoard

function createBoard(){
    for(let i = 0; i < layout.length; i++){
        let square = document.createElement("div")
        countainer.appendChild(square)
        squares.push(square)
        if(layout[i] === 0){
            squares[i].classList.add("pacmanfood")
        }else if(layout[i] === 1){
            squares[i].classList.add("wall")
        }else if(layout[i] === 2){
            squares[i].classList.add("notallow")
        }else if(layout[i] === 3){
             squares[i].classList.add("powerpellet")
        }else if(layout[i] === 5){
            squares[i].classList.add("block")
        }
    }
}
createBoard()
startTimer()



squares[pacmanCurrentIndex].classList.add("pacman")

let keys = {}
let pacmanDirection = null
let lastMove = 0;
let moveInterval = 125

document.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "q", "ArrowUp", "z", "ArrowRight", "d", "ArrowDown", "s"].includes(e.key)) {
        keys[e.key] = true
        setPacmanDirection(e.key)
    }
    if (e.key === " ") {
        togglePause()
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false
});

function setPacmanDirection(key) {
    if (["ArrowLeft", "q"].includes(key)) pacmanDirection = "left"
    if (["ArrowUp", "z"].includes(key)) pacmanDirection = "up"
    if (["ArrowRight", "d"].includes(key)) pacmanDirection = "right"
    if (["ArrowDown", "s"].includes(key)) pacmanDirection = "down"
    
}

function movePacman(timestamp) {
    
    if (!isPaused && timestamp - lastMove > moveInterval) {
        lastMove = timestamp

        let newIndex = pacmanCurrentIndex
        let nextIndex = getNextIndex(pacmanDirection)

        if (nextIndex !== null) {
            newIndex = nextIndex
        }

        if (newIndex !== pacmanCurrentIndex) {
            squares[pacmanCurrentIndex].classList.remove("pacman")
            pacmanCurrentIndex = newIndex
            squares[pacmanCurrentIndex].classList.add("pacman")
            
            foodEaten()
            powerPellet()
            gameOver()
            checkForGameWin()
        }
    }

}



function getNextIndex(direction) {
    let nextIndex = null

    if (direction === "left") {
        if (pacmanCurrentIndex % width === 0) {
            nextIndex = pacmanCurrentIndex + (width - 1)
        } else if (
            !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex - 1].classList.contains("notallow")
        ) {
            nextIndex = pacmanCurrentIndex - 1
        }
    }

    if (direction === "right") {
        if (pacmanCurrentIndex % width === width - 1) {
            nextIndex = pacmanCurrentIndex - (width - 1)
        } else if (
            !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
            !squares[pacmanCurrentIndex + 1].classList.contains("notallow")
        ) {
            nextIndex = pacmanCurrentIndex + 1
        }
    }

    if (direction === "up" && pacmanCurrentIndex - width >= 0 &&
        !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex - width].classList.contains("notallow")) {
        nextIndex = pacmanCurrentIndex - width
    }

    if (direction === "down" && pacmanCurrentIndex + width < width * width &&
        !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
        !squares[pacmanCurrentIndex + width].classList.contains("notallow")) {
        nextIndex = pacmanCurrentIndex + width
    }

    return nextIndex
}

let countBeers = 0

//foodeaten

function playSound(sound) {
    let audio = new Audio(sound)
    audio.play()
}

function foodEaten(){
    if(squares[pacmanCurrentIndex].classList.contains("pacmanfood")){
        countBeers++
        if(countBeers > 0 && countBeers % 10 === 0) playSound(sounds[0])
        score += 1
        displayScore.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove("pacmanfood")
    }
}

function powerPellet(){
    if(squares[pacmanCurrentIndex].classList.contains("powerpellet")){
        score += 10
        armys.forEach(army => army.isScared = true)
        setTimeout(unScared, 5000) 
        squares[pacmanCurrentIndex].classList.remove("powerpellet")
    }
}


function unScared(){
    armys.forEach(army => army.isScared = false)
}

//display army

class Army{
    constructor(className, startIndex, speed){
        this.className = className,
        this.startIndex = startIndex,
        this.speed = speed,
        this.timerId = NaN,
        this.currentIndex = startIndex,
        this.isScared = false
    }
}

armys = [
    new Army("armyBlack", 348, 200), 
    new Army("armyBlack", 376, 175), 
    new Army("armyBlack", 351, 150), 
    new Army("armyBlack", 379, 255) 
]


armys.forEach(army => {
    squares[army.currentIndex].classList.remove("notallow")
    squares[army.currentIndex].classList.add(army.className)
    squares[army.currentIndex].classList.add("army")
})


//move army

let lastMoveTime = {}

function animate(timestamp) {
    if (!isPaused) {
        armys.forEach(army => moveArmy(army, timestamp))
    }
}

function moveArmy(army, timestamp) {
    if (!army.id) {
        army.id = Symbol('army')
    }

    if (!lastMoveTime[army.id]) {
        lastMoveTime[army.id] = timestamp
    }

    if (timestamp - lastMoveTime[army.id] < army.speed) {
        return
    }

    lastMoveTime[army.id] = timestamp

    let directions = [-1, +1, -width, +width]

    if (army.isInStartZone) {
        let possibleExit = directions.find(dir => {
            let nextIndex = army.currentIndex + dir;
            return !squares[nextIndex].classList.contains("wall") &&
                   !squares[nextIndex].classList.contains("army") &&
                   !squares[nextIndex].classList.contains("block")
        })

        if (possibleExit) {
            army.currentDirection = possibleExit
            army.isInStartZone = false
        }
    }


    if (!army.currentDirection) {
        let availableDirections = directions.filter(dir => {
            let newIndex = army.currentIndex + dir
            return !squares[newIndex].classList.contains("wall") &&
                   !squares[newIndex].classList.contains("army") &&
                   !squares[newIndex].classList.contains("block")
        })

        if (availableDirections.length > 0) {
            army.currentDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        }
        if (army.currentIndex % width === 0) {
            squares[army.currentIndex].classList.remove(army.className, "army", "armyScr")
            army.currentIndex = army.currentIndex + (width - 1)
        } else if (army.currentIndex % width === width - 1) {
            squares[army.currentIndex].classList.remove(army.className, "army", "armyScr")
            army.currentIndex = army.currentIndex - (width - 1)
        }
    }

    let nextIndex = army.currentIndex + army.currentDirection

    let canContinue = !squares[nextIndex].classList.contains("wall") &&
                      !squares[nextIndex].classList.contains("army") &&
                      !squares[nextIndex].classList.contains("block")

    if (!canContinue) {
        if (army.currentIndex % width === 0) {
            squares[army.currentIndex].classList.remove(army.className, "army", "armyScr")
            army.currentIndex = army.currentIndex + (width - 1)
        } else if (army.currentIndex % width === width - 1) {
            squares[army.currentIndex].classList.remove(army.className, "army", "armyScr")
            army.currentIndex = army.currentIndex - (width - 1)
        }
        
        let possibleDirections = directions.filter(dir => {
            let newIndex = army.currentIndex + dir
            return !squares[newIndex].classList.contains("wall") &&
                   !squares[newIndex].classList.contains("army") &&
                   !squares[newIndex].classList.contains("block")
        })

        if (possibleDirections.length > 0) {
            army.currentDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]
        }
    }

    squares[army.currentIndex].classList.remove(army.className, "army", "armyScr")
    army.currentIndex += army.currentDirection
    squares[army.currentIndex].classList.add(army.className, "army")


    if (army.isScared) {
        squares[army.currentIndex].classList.remove(army.className, "army")
        squares[army.currentIndex].classList.add("armyScr")
    }

    if (army.isScared && squares[army.currentIndex].classList.contains("pacman")) {
        squares[army.currentIndex].classList.remove("armyScr", army.className, "army")
        armys = armys.filter(a => a !== army)
        playSound(sounds[2])
        burnsNum--
        burns.innerHTML = burnsNum

    }

    gameOver()
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            time++
            timerDisplay.innerText = time
        }
    }, 1000)
}

function gameOver(){
    if(squares[pacmanCurrentIndex].classList.contains("army") &&
    !squares[pacmanCurrentIndex].classList.contains("armySrc")){
       
        playSound(sounds[4])

        lives--
        document.getElementById("lives").innerText = lives
                    
        if(squares[pacmanCurrentIndex].classList.contains("pacman")) {
            squares[pacmanCurrentIndex].classList.remove("pacman")
            pacmanCurrentIndex = 490
            squares[pacmanCurrentIndex].classList.add("pacman")
            }
        if(lives === 0){
            isPaused = true
            youLoose = true
            playSound(sounds[1])
            loose.style.display = youLoose ? "block" : "none"
            clearInterval(timerInterval)
            return
        }
                    
    }
}

function checkForGameWin(){
    if(score === 274 || armys.length === 0){
        isPaused = true
        youWin = true
        playSound(sounds[3])
        win.style.display = youWin ? "block" : "none"
        clearInterval(timerInterval)
        return
        }
}



function togglePause() {
    isPaused = !isPaused
    pauseMenu.style.display = isPaused ? "block" : "none"

    if (isPaused) {
        playSound(sounds[5])
        clearInterval(timerInterval)
        armys.forEach(army => clearInterval(army.timerId))
    } else {
        startTimer()
        armys.forEach(army => moveArmy(army))
    }
}

function gameLoop(timestamp) {
    lastFrameTime = timestamp
    requestAnimationFrame(movePacman)
    requestAnimationFrame(animate)
    requestAnimationFrame(gameLoop)
}

let lastFrameTime = performance.now()

requestAnimationFrame(gameLoop)


