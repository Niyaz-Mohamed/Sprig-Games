/*
@title: 2P Snake
@author: Niyaz
@tags: []
@addedOn: 2024-08-11

Press any key to start playing.

2 Player Snake. Get as many fruit of your color 
as you can in a minute. The one with more fruits after 60s
wins. If you collide with something before 60s, you lose 
regardless of your score.
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
3330000333000033
3330200333020033
3330000333000033
3330000333000033
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
    player2,
    bitmap`
7777777777777777
7777777777777777
7770077777000777
7770000770000777
7770020770200777
7770000770000777
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
................
.........D......
........DD......
.......DD.......
.....3DDD33.....
....33333333....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
................`,
  ],
  [
    player2Apple,
    bitmap`
................
.........D......
........DD......
.......DD.......
.....5DDD55.....
....55555555....
...5555555555...
...5555555555...
..555555555555..
..555555555555..
..555555555555..
..555555555555..
...5555555555...
....55555555....
.....555555.....
................`,
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
..................
.a..............f.
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
.e..............b.
..................`;
setMap(level);
setBackground(background);

// Start playing
let gameLost = true;
const allKeys = ["w", "a", "s", "d", "i", "j", "k", "l"];
allKeys.forEach((key) => {
  onInput(key, () => {
    if (gameLost) {
      gameLost = false;
      clearText();
      // Reset game here
      aDir = "S";
      bDir = "N";
      snakeA = [];
      snakeB = [];
      addSnake1 = false;
      addSnake2 = false;
    }
  });
});

// Track directions (NSEW as 0123) for both snakes
let aDir = "S";
let bDir = "N";
let lastPosA, lastPosB;
let snakeA = [];
let snakeB = [];
let addSnake1 = false;
let addSnake2 = false;

// Player 1
onInput("w", () => {
  if (!(aDir == "S") || snakeA.length == 0) aDir = "N";
});

onInput("a", () => {
  if (!(aDir == "E") || snakeA.length == 0) aDir = "W";
});

onInput("s", () => {
  if (!(aDir == "N") || snakeA.length == 0) aDir = "S";
});

onInput("d", () => {
  if (!(aDir == "W") || snakeA.length == 0) aDir = "E";
});

// Player 2
onInput("i", () => {
  if (!(bDir == "S") || snakeB.length == 0) bDir = "N";
});

onInput("j", () => {
  if (!(bDir == "E") || snakeB.length == 0) bDir = "W";
});

onInput("k", () => {
  if (!(bDir == "N") || snakeB.length == 0) bDir = "S";
});

onInput("l", () => {
  if (!(bDir == "W") || snakeB.length == 0) bDir = "E";
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
function updateSnake(nextPos) {
  // Check if there's a collision with the apples
  appleA = getFirst(player1Apple);
  appleB = getFirst(player2Apple);

  // Decide whether to add a new snake body
  if (appleA.x === nextPos[0].x && appleA.y === nextPos[0].y) {
    addSnake1 = true;
    appleA.remove();
  }
  if (appleB.x === nextPos[1].x && appleB.y === nextPos[1].y) {
    addSnake2 = true;
    appleB.remove();
  }

  // Update apples and snake body/head
  updateBodyPositions(nextPos);
  updateHeadPositions(nextPos);
  summonApples();
  displayScore();
  checkLoss();
}

// Update body positions
function updateBodyPositions() {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);

  // Functions to add a new snake body at current head position
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

  // Update snake body (Pop off the last body if needed)
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

// Update the position of each head (based on movement direction)
function updateHeadPositions(nextPos) {
  const p1 = getFirst(player1);
  const p2 = getFirst(player2);
  p1.x = nextPos[0].x;
  p1.y = nextPos[0].y;
  p2.x = nextPos[1].x;
  p2.y = nextPos[1].y;
}

// Summon apples
function summonApples() {
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

// Get all unoccupied spaces except background
function getUnoccupiedSpaces() {
  const allSprites = getAll();
  let unoccupiedSpaces = [];
  // Iterate and select tiles with no sprite
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (!allSprites.some((sprite) => sprite.x == x && sprite.y == y)) {
        unoccupiedSpaces.push({ x: x, y: y });
      }
    }
  }
  return unoccupiedSpaces;
}

// Display game score
function displayScore() {
  const p1Score = snakeA.length;
  const p2Score = snakeB.length;

  // Display the scores
  addText(String(p1Score), { x: 2, y: 1, color: color`3` });
  addText(String(p2Score), { x: width() - 1, y: 1, color: color`5` });
}

// Check game loss
function checkLoss() {
  const bodies = getAll(player1Bod).concat(getAll(player2Bod));

  // Carries out what is required on losing
  function handleLoss() {
    gameLost = true;
    const p1Score = snakeA.length;
    const p2Score = snakeB.length;

    // Display score
    if (p1Score > p2Score) {
      addText(
        "Red wins!",
        (options = {
          x: Math.floor(width() / 2),
          y: Math.floor(height() / 2),
          color: color`0`,
        })
      );
    } else if (p1Score < p2Score) {
      addText(
        "Blue wins!",
        (options = {
          x: Math.floor(width() / 2),
          y: Math.floor(height() / 2),
          color: color`0`,
        })
      );
    } else {
      addText(
        "Tie!",
        (options = {
          x: Math.floor(width() / 2),
          y: Math.floor(height() / 2),
          color: color`0`,
        })
      );
    }
    addText(
      "Press any key to restart",
      (options = {
        x: Math.floor(width() / 2) - 10,
        y: Math.floor(height() / 2),
        color: color`0`,
      })
    );
  }

  // Check for player 1's loss
  const p1 = getFirst(player1);
  const p1LossSprites = bodies.concat(getAll(player2));
  for (sprite of p1LossSprites) {
    if (sprite.x === p1.x && sprite.y === p1.y) handleLoss();
  }

  // Check for player 2's loss
  const p2 = getFirst(player2);
  const p2LossSprites = bodies.concat(getAll(player1));
  for (sprite of p2LossSprites) {
    if (sprite.x === p2.x && sprite.y === p2.y) handleLoss();
  }
}

// Setup game loop
setInterval(() => {
  const nextPos = getNextPos();
  if (!gameLost) {
    updateSnake(nextPos);
  }
}, 100);
