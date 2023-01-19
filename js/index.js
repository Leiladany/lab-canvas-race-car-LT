const myCanvas = document.querySelector('canvas')
const ctx = myCanvas.getContext('2d')
myCanvas.style.border = '2px solid black'

const backImg = new Image()
backImg.src = '../images/road.png'

const backImg2 = new Image()
backImg2.src = '../images/road.png'

const carImg = new Image()
carImg.src = '../images/car.png'

const obstaclesImg = new Image()
obstaclesImg.src = '../images/obstacle.png'

const obstaclesImg2 = new Image()
obstaclesImg2.src = '../images/obstacle.png'

const startBtn = document.getElementById('start-button') 


//game variables
let gameOver = false

let animateId

let backGround1y = 0

let backGround2y = -myCanvas.height

let carx = 0

let carspeed = 5

let isMovingleft = false
let isMovingright = false
let isNotMoving = true

let obstacleY = 0
let obstacleX = 0

let score= 0


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  }

  startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'
  })
  


  function animate(){
    
    ctx.drawImage(backImg, 0, backGround1y, myCanvas.width, myCanvas.height)
    ctx.drawImage(backImg2, 0, backGround2y, myCanvas.width, myCanvas.height)
    ctx.drawImage(carImg, carx, 400, 50, 100)
    ctx.drawImage(obstaclesImg, 80, obstacleY, 90, 60)
    ctx.drawImage(obstaclesImg2, 230, obstacleX, 90, 60)
    
    
    backGround1y += 2
    backGround2y += 2

    obstacleY += 3
    obstacleX += 5


    if (backGround1y > myCanvas.height) {
      backGround1y = -myCanvas.height
    }

    if (backGround2y > myCanvas.height) {
      backGround2y = -myCanvas.height
    }

    if (isMovingleft && carx > 35) {
      carx -= carspeed
    } else if (isMovingright && carx < 311) {
      carx += carspeed
    } else if (isNotMoving) {
      carx = 175
    }

    if (obstacleY > 600) {
      obstacleY = -50
    }

    if (obstacleX > 600) {
      obstacleX = -300
    }

    if(!gameOver){
      animateId = requestAnimationFrame(animate)
    } else {
    cancelAnimationFrame(animateId)
    }


    document.addEventListener('keypress', event => {
    if (event.key === 'a') {
      isMovingleft = true
      isNotMoving = false
    } if (event.key === 'd') {
      isMovingright = true
      isNotMoving = false 
    }
    })

    document.addEventListener('keyup', () => {
      isMovingleft = false
      isMovingright = false
    })

  }

  function startGame() {
    animate()
  }
};