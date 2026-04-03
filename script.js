const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;
let level = 1;

// spawn fruit
function spawnFruit() {
  fruits.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    radius: 25,
    speed: 2 + level
  });
}

// draw fruits
function drawFruits() {
  ctx.fillStyle = "red";
  fruits.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// update fruits
function updateFruits() {
  fruits.forEach(f => {
    f.y -= f.speed;
  });
}

//  COMMON SLICE FUNCTION (used for both mouse + touch)
function sliceFruit(x, y) {
  fruits = fruits.filter(f => {
    let dx = f.x - x;
    let dy = f.y - y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < f.radius) {
      score++;
      updateScore();
      return false;
    }
    return true;
  });
}

//  MOUSE SUPPORT
canvas.addEventListener("mousemove", (e) => {
  sliceFruit(e.clientX, e.clientY);
});

//  TOUCH SUPPORT (IMPORTANT FIX)
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // stops screen scrolling

  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];

  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  sliceFruit(x, y);
}, { passive: false });

// update score
function updateScore() {
  document.getElementById("score").innerText = "Score: " + score;
}

// level system
function checkLevel() {
  if (score >= level * 10) {
    level++;
    alert("Level " + level);
  }
}

// game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFruits();
  updateFruits();
  checkLevel();

  requestAnimationFrame(gameLoop);
}

setInterval(spawnFruit, 1000);
gameLoop();
