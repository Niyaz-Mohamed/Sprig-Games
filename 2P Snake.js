/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2P Snake
@author: Niyaz
@tags: []
@addedOn: 2024-08-11
*/

// Define the 2 player snakes
const player1 = "a";
const player2 = "b";
const player1Bod = "c";
const player2Bod = "d";
const player1Apple = "e";
const player2Apple = "f";
const background = "z";

setLegend(
  [
    player1,
    bitmap`
0000000000000000
0333333333333330
0333333333333330
0333003333300330
0333003333300330
0333333333333330
0333333333333330
0330333333333030
0333033333333030
0333033333333030
0333303333330330
0333330333003330
0333333000333330
0333333333333330
0333333333333330
0000000000000000`,
  ],
  [
    player2,
    bitmap`
0000000000000000
0777777777777770
0770077777007770
0777007770077770
0770777777707770
0770077777007770
0777777777777770
0777777777777770
0777700000077770
0777077777700770
0770777777770770
0770777777770770
0770777777770770
0777777777777770
0777777777777770
0000000000000000`,
  ],
  [
    player1Bod,
    bitmap`
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000`,
  ],
  [
    player2Bod,
    bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000`,
  ],
  [
    player1Apple,
    bitmap`
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
................`,
  ],
  [
    player2Apple,
    bitmap`
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
  ................`,
  ],
  [
    background,
    bitmap`
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
  4444444444444444`,
  ]
);

setSolids([player1]);

const level = map`
..................
.b................
...............f..
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..................
..e.............a.
..................`;
setMap(level);
setBackground(background);

// Track directions (NSEW as 0123) for both snakes
let aDir = "N";
let bDir = "S";
let lastPosA, lastPosB;
let snakeA = [];
let snakeB = [];

// Player 1
onInput("w", () => {
  aDir = "N";
});

onInput("a", () => {
  aDir = "W";
});

onInput("s", () => {
  aDir = "S";
});

onInput("d", () => {
  aDir = "E";
});

// Player 2
onInput("i", () => {
  bDir = "N";
});

onInput("j", () => {
  bDir = "W";
});

onInput("k", () => {
  bDir = "S";
});

onInput("l", () => {
  bDir = "E";
});

// Get next position of both snakes
function getNextPos() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  lastPosA = { x: p1.x, y: p1.y };
  lastPosB = { x: p2.x, y: p2.y };
  let newPos = [
    [0, 0],
    [0, 0],
  ];

  // Update positions
  switch (aDir) {
    case "N":
      newPos[0] = [p1.x, (p1.y - 1 + height()) % height()];
      break;
    case "S":
      newPos[0] = [p1.x, (p1.y + 1) % height()];
      break;
    case "E":
      newPos[0] = [(p1.x + 1) % width(), p1.y];
      break;
    case "W":
      newPos[0] = [(p1.x - 1 + width()) % width(), p1.y];
      break;
  }
  switch (bDir) {
    case "N":
      newPos[1] = [p2.x, (p2.y - 1 + height()) % height()];
      break;
    case "S":
      newPos[1] = [p2.x, (p2.y + 1) % height()];
      break;
    case "E":
      newPos[1] = [(p2.x + 1) % width(), p2.y];
      break;
    case "W":
      newPos[1] = [(p2.x - 1 + width()) % width(), p2.y];
      break;
  }

  return [
    { x: newPos[0][0], y: newPos[0][1] },
    { x: newPos[1][0], y: newPos[1][1] },
  ];
}

// Update the position of each head
function updateHeadPositions(nextPos) {
  let p1 = getFirst(player1);
  let p2 = getFirst(player2);
  p1.x = nextPos[0].x;
  p1.y = nextPos[0].y;
  p2.x = nextPos[1].x;
  p2.y = nextPos[1].y;
  console.log(p2, nextPos);
}

// Get all unoccupied spaces except background
function getUnoccupiedSpaces() {
  const allSprites = getAll();
  let unoccupiedSpaces = [];

  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (!allSprites.some((sprite) => sprite.x == x && sprite.y == y)) {
        unoccupiedSpaces.push({ x: x, y: y });
      }
    }
  }

  return unoccupiedSpaces;
}

// Summon apples
function summonApples() {
  const p1Apples = getAll(player1Apple);
  const p2Apples = getAll(player2Apple);

  // Decide on free spaces for apples
  const spaces = getUnoccupiedSpaces();
  const p1Space = spaces[Math.floor(Math.random() * spaces.length)];
  let p2Space = { ...p1Space };
  while (p2Space.x === p1Space.x && p2Space.y === p2Space.y) {
    p2Space = spaces[Math.floor(Math.random() * spaces.length)];
  }

  // Add the apples if they don't exist
  if (tilesWith(player1Apple).length === 0)
    addSprite(p1Space.x, p1Space.y, player1Apple);
  if (tilesWith(player2Apple).length === 0)
    addSprite(p2Space.x, p2Space.y, player2Apple);
}

// Update the snakes
function updateSnakes(nextPos) {
  // Check if there's a collision with the apples
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  appleA = getFirst(player1Apple);
  appleB = getFirst(player2Apple);

  // Update snake
  if (appleA.x === nextPos[0].x && appleA.y === nextPos[0].y) {
    addSprite(p1.x, p1.y, player1Bod);
  }
  if (appleB.x === nextPos[1].x && appleB.y === nextPos[1].y) {
    addSprite(p2.x, p2.y, player2Bod);
  }
}

// Setup game loop
let gameIntervals = [];
gameIntervals.push(
  setInterval(() => {
    const newPos = getNextPos();
    updateSnakes(newPos);
    updateHeadPositions(newPos);
    updateBodyPositions(newPos);
    summonApples();
  }, 200)
);

// function to stop the whole game
function stopGame() {
  gameIntervals.forEach((intervalId) => clearInterval(intervalId));
  isRunning = false;
}
