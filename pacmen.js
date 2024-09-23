var pos = 0;
const pacArray = [
  ["PacMan1.png", "PacMan2.png"],
  ["PacMan3.png", "PacMan4.png"],
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "PacMan1.png";
  newimg.width = 100;
  //
  // set position here
  //

  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

const chompDictionary = {
  "PacMan1.png": "PacMan2.png",
  "PacMan2.png": "PacMan1.png",
  "PacMan3.png": "PacMan4.png",
  "PacMan4.png": "PacMan3.png",
};
let updateTimer = 0;
function update() {
  updateTimer++;
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if (updateTimer % 10 === 0) {
      const img = item.newimg.src.split("/").pop();
      item.newimg.src = chompDictionary[img];
    }
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
    item.position.x + item.velocity.x < 0
  ) {
    item.velocity.x = -item.velocity.x;
    if (item.velocity.x < 0) {
      item.newimg.src = "PacMan3.png";
    } else item.newimg.src = "PacMan1.png";
  }
  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 0
  )
    item.velocity.y = -item.velocity.y;
  //
  // detect collision with all walls and make pacman bounce
  //
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
