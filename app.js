const btnStart = document.querySelector('#btn-btnStart')
const btnSpeed = document.querySelector('#btn-btnSpeed')
const pointCount = document.querySelector('#playerScore')
const btnReset = document.querySelector('#btn-reset')
const divs = document.querySelectorAll('.div') // taking all the class divs and saving them in the variable divs
const arraDivs = Array.from(divs) // placing the divs inside an array

let stopInterval // This variable is a the scope
const data = { // data have the information of the game
  INTERVAL: 1000,
  timeout: 900,
  count: 0,
  playerScore: 0
}

btnStart.addEventListener('click', (e) => start()) // we could put this variables inside o keep outside
btnSpeed.addEventListener('click', (e) => rest())
btnReset.addEventListener('click', (e) => reset())

function start() {
  if (stopInterval) return // It does not allow you to start the game if it has already started

  stopInterval = setInterval(() => { // put inside a variable to stop after with reset
    const random = Math.floor(Math.random() * divs.length) // get a ramdom number between of longitud the divs
    arraDivs[random].classList.add('flash') // creating a class in css and assigned the array

    setTimeout(() => { // after a while is going to remove the style
      arraDivs[random].classList.remove('flash')
    }, data.timeout)
  }, data.INTERVAL)
}

divs.forEach((elem) => { // getting each element from the
  elem.addEventListener('click', (e) => { // creating addEventListener to count all clicks
    const elem = e.target
    if (elem.classList.contains('flash')) { // creating conditional only those that have the flow style will count
      data.count += 1
      data.playerScore += 1
      updateTable()
    }
  })
})

function rest() { // rest the timeout, so is gonna be more fast the game
  data.timeout -= 100
}

function updateTable() { // updaitin the info in the HTML
  pointCount.innerHTML = data.playerScore
}

function reset() { // reset the the info of data 2. updatetable the html 3. stop the setinterval
  data.count = 0
  data.playerScore = 0
  updateTable()
  clearInterval(stopInterval)
  stopInterval = null
}
