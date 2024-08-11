/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2P Snake
@author: Niyaz
@tags: []
@addedOn: 2024-08-11
*/

// Define the 2 player snakes
const player1 = "a"
const player2 = "b"
const player1Bod = 'c'
const player2Bod = 'd'
const player1Apple = 'e'
const player2Apple = 'f'
const background = 'z'

setLegend(
  [player1, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333003333300333
3333003333300333
3333333333333333
3333333333333333
3330333333333003
3333033333333033
3333033333333033
3333003333330033
3333300333000333
3333333000333333
3333333333333333
3333333333333333
3333333333333333`],
  [player2, bitmap`
7700777777700777
7770077777707777
7777007770077777
7770777777707777
7770077777007777
7777777777777777
7777777777777777
7777770000777777
7777007777007777
7777077777700777
7770777777770777
7770777777770077
7777777777777077
7777777777777777
7777777777777777
7777777777777777`],
  [player1Bod, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [player2Bod, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [player1Apple, bitmap`
.........0......
........0D0.....
.......0DD0.....
......0440......
....00443300....
...0333333330...
...0333333330...
..033333333330..
..033333333330..
..033333333330..
...0333333330...
....00333300....
......0000......
................
................
................`],
  [player2Apple, bitmap`
.........0......
........0D0.....
.......0DD0.....
......0440......
....00445500....
...0555555550...
...0555555550...
..055555555550..
..055555555550..
..055555555550..
...0555555550...
....00555500....
......0000......
................
................
................`],
  [background, bitmap`
4444444444444444
4444444444444444
444D4D444444D444
444DD4444444D444
4444D44444444D44
4444444444444444
4444444444444444
4444444444444444
444444444DD44444
44444444D4444444
444444444D444444
44DD444444444444
44D4444444444444
444D444444444D44
44444444444444D4
4444444444444444`],
)

setSolids([player1])

const level = map`
..................
..................
..................
..................
..................
..................
..................
..................
......b...........
..................
..................
..................
..................
.............a....
..................
..................`
setMap(level)
setBackground(background)

// Track directions (NSEW as 0123) for both snakes
let aDir = 'N'
let bDir = 'S'

// Player 1
onInput("w", () => {
  aDir = 'N'
})

onInput("a", () => {
  aDir = 'W'
})

onInput("s", () => {
  aDir = 'S'
})

onInput("d", () => {
  aDir = 'E'
})

// Player 2
onInput("i", () => {
  bDir = 'N'
})

onInput("j", () => {
  bDir = 'W'
})

onInput("k", () => {
  bDir = 'S'
})

onInput("l", () => {
  bDir = 'E'
})

// Update the position of each head
function updateHeadPositions() {
  const p1 = getFirst(player1)
  const p2 = getFirst(player2)

  // Update positions
  switch (aDir) {
    case 'N':
      p1.y = (p1.y - 1 + height()) % height()
      break
    case 'S':
      p1.y = (p1.y + 1) % height()
      break
    case 'E':
      p1.x = (p1.x + 1) % width()
      break
    case 'W':
      p1.x = (p1.x - 1 + width()) % width()
      break
  }
  switch (bDir) {
    case 'N':
      p2.y = (p2.y - 1 + height()) % height()
      break
    case 'S':
      p2.y = (p2.y + 1) % height()
      break
    case 'E':
      p2.x = (p2.x + 1) % width()
      break
    case 'W':
      p2.x = (p2.x - 1 + width()) % width()
      break
  }
}

// Get all unoccupied spaces except background
function getUnoccupiedSpaces() {
  return 0
}

// Summon apples
function summonApples() {
  const p1Apples = getAll(player1Apple)
  const p2Apples = getAll(player2Apple)

  // Add an apple if it doesn't exist
  null
}

// Setup game loop
let gameIntervals = []
gameIntervals.push(
  setInterval(() => {
    updateHeadPositions();
    summonApples()
  }, 200)
);

// function to stop the whole game
function stopGame() {
  gameIntervals.forEach(intervalId => clearInterval(intervalId));
  isRunning = false;
}