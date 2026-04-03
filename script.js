const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fruits = [];
let score = 0;
let level = 1;

// spawn fruit
function spawnFruit() 
{
  fruits.push
  (
    {
    x: Math.random() * canvas.width,
    y: canvas.height,
    radius: 20,
    speed: 2 + level
    }
  );
}

// draw fruits
function drawFruits() 
{
  ctx.fillStyle = "red";
  fruits.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

// update fruits
function updateFruits() 
{
  fruits.forEach(f => {
    f.y -= f.speed;
  });
}

// slicing logic (mouse)
canvas.addEventListener("mousemove", (e) => 
{
  fruits = fruits.filter(f => {
    let dx = f.x - e.clientX;
    let dy = f.y - e.clientY;
    let distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < f.radius) 
    {
      score++;
      updateScore();
      return false;
    }
    return true;
  });
});

// update score UI
function updateScore() 
{
  document.getElementById("score").innerText = "Score: " + score;
}

// level system
function checkLevel() 
{
  if (score >= level * 10) {
    level++;
    alert("Level " + level);
  }
}

// game loop
function gameLoop() 
{
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawFruits();
  updateFruits();
  checkLevel();

  requestAnimationFrame(gameLoop);
}

setInterval(spawnFruit, 1000);
gameLoop();

