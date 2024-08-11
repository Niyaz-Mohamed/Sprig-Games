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
3333333333333333
3333333333333333
3333003333300333
3330000333000033
3330000333000033
3333003333300333
3333333333333333
3333333333333333
3000000000000003
3300000000000033
3330000000000333
3333000000003333
3333300000033333
3333333333333333
3333333333333333
3333333333333333`,
  ],
  [
    player2,
    bitmap`
7777777777777777
7777777777777777
7770077777007777
7770007770007777
7770007770007777
7770007770007777
7777777777777777
7777777777777777
7777000000077777
7770000000007777
7700000000000777
7700000000000777
7700000000000777
7777777777777777
7777777777777777
7777777777777777`,
  ],
  [
    player1Bod,
    bitmap`
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
3333333333333333`,
  ],
  [
    player2Bod,
    bitmap`
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
7777777777777777`,
  ],
  [
    player1Apple,
    bitmap`
.........0......
........0D0.....
.......0D40.....
.....004400.....
....03444330....
...0333333330...
..033333333330..
..033333333330..
.03333333333330.
.03333333333330.
.03333333333330.
.03333333333330.
..033333333330..
...0333333330...
....03333330....
.....000000.....`,
  ],
  [
    player2Apple,
    bitmap`
.........0......
........0D0.....
.......0D40.....
.....004400.....
....05444550....
...0555555550...
..055555555550..
..055555555550..
.05555555555550.
.05555555555550.
.05555555555550.
.05555555555550.
..055555555550..
...0555555550...
....05555550....
.....000000.....`,
  ],
  [
    background,
    bitmap`
4444444444444444
444444444D444444
44444444D4444444
44444444D4444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444D44444444444
444D444444444444
444D444444444444
444444444444D444
4444444444444D44
4444444444444D44
4444444444444444
4444444444444444`,
  ]
);

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
let addSnake1 = false;
let addSnake2 = false;

// Player 1
onInput("w", () => {
  if (!(aDir == "S")) aDir = "N";
});

onInput("a", () => {
  if (!(aDir == "E")) aDir = "W";
});

onInput("s", () => {
  if (!(aDir == "N")) aDir = "S";
});

onInput("d", () => {
  if (!(aDir == "W")) aDir = "E";
});

// Player 2
onInput("i", () => {
  if (!(bDir == "S")) bDir = "N";
});

onInput("j", () => {
  if (!(bDir == "E")) bDir = "W";
});

onInput("k", () => {
  if (!(bDir == "N")) bDir = "S";
});

onInput("l", () => {
  if (!(bDir == "W")) bDir = "E";
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

// Update the snakes
function updateSnakes(nextPos) {
  // Check if there's a collision with the apples
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  appleA = getFirst(player1Apple);
  appleB = getFirst(player2Apple);

  // Update snake
  if (appleA.x === nextPos[0].x && appleA.y === nextPos[0].y) {
    addSnake1 = true;
    appleA.remove();
  }
  if (appleB.x === nextPos[1].x && appleB.y === nextPos[1].y) {
    addSnake2 = true;
    appleB.remove();
  }
}

// Update body positions
function updateBodyPositions() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);

  function addSnake1AtCurrentPos() {
    addSprite(p1.x, p1.y, player1Bod);
    // Find the snake body and add it to the snake list
    const newSnake = getTile(p1.x, p1.y).find((sprite) => sprite.type === "c");
    snakeA.unshift(newSnake);
  }

  function addSnake2AtCurrentPos() {
    addSprite(p2.x, p2.y, player2Bod);
    // Find the snake body and add it to the snake list
    const newSnake = getTile(p2.x, p2.y).find((sprite) => sprite.type === "d");
    snakeB.unshift(newSnake);
  }

  // Pop off the last body if needed
  if (addSnake1) {
    addSnake1AtCurrentPos();
    addSnake1 = false;
  } else if (snakeA.length > 0 && !addSnake1) {
    addSnake1AtCurrentPos();
    snakeA.pop().remove();
  }
  if (addSnake2) {
    addSnake2AtCurrentPos();
    addSnake2 = false;
  } else if (snakeB.length > 0 && !addSnake2) {
    addSnake2AtCurrentPos();
    snakeB.pop().remove();
  }
}

// Update the position of each head
function updateHeadPositions(nextPos) {
  let p1 = getFirst(player1);
  let p2 = getFirst(player2);
  p1.x = nextPos[0].x;
  p1.y = nextPos[0].y;
  p2.x = nextPos[1].x;
  p2.y = nextPos[1].y;
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

// Setup game loop
let gameIntervals = [];
gameIntervals.push(
  setInterval(() => {
    const newPos = getNextPos();
    updateSnakes(newPos);
    updateBodyPositions(newPos);
    updateHeadPositions(newPos);
    summonApples();
  }, 90)
);

// function to stop the whole game
function stopGame() {
  gameIntervals.forEach((intervalId) => clearInterval(intervalId));
  isRunning = false;
}
