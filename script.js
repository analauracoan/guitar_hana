const mapMusical = [
  [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0], [0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0],
  [1, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0]
];

var myGamePieceKeyA, myGamePieceKeyS, myGamePieceKeyJ, myGamePieceKeyK, myGamePieceKeyL;
var myGameKeyGoalA, myGameKeyGoalS, myGameKeyGoalJ, myGameKeyGoalK, myGameKeyGoalL;
var indexNotes = 0;
var note = mapMusical[indexNotes];
var score = 0;
var music = new Audio('crawling.mp3'); 

function startGame() {
  music.play();  
  setTimeout(function() {
    myGamePieceKeyA = new componentStatic(150, 150, "red", 100, window.innerHeight - 200);
    myGamePieceKeyS = new componentStatic(150, 150, "blue", 350, window.innerHeight - 200);
    myGamePieceKeyJ = new componentStatic(150, 150, "green", 600, window.innerHeight - 200);
    myGamePieceKeyK = new componentStatic(150, 150, "pink", 850, window.innerHeight - 200);
    myGamePieceKeyL = new componentStatic(150, 150, "yellow", 1100, window.innerHeight - 200);

    myGameKeyGoalA = new componentMove(150, 75, "red", 100, 100, 12, "a");
    myGameKeyGoalS = new componentMove(150, 75, "blue", 350, 100, 12, "s");
    myGameKeyGoalJ = new componentMove(150, 75, "green", 600, 100, 12, "j");
    myGameKeyGoalK = new componentMove(150, 75, "pink", 850, 100, 12, "k");
    myGameKeyGoalL = new componentMove(150, 75, "yellow", 1100, 100, 12, "l");

    setInterval(updateNotes, 600);
    myGameArea.start();
  }, 3600);
}

function updateNotes() {
  if (indexNotes < mapMusical.length) {
    note = mapMusical[indexNotes];

    if (note[0] === 1) myGameKeyGoalA.newPos();
    if (note[1] === 1) myGameKeyGoalS.newPos();
    if (note[2] === 1) myGameKeyGoalJ.newPos();
    if (note[3] === 1) myGameKeyGoalK.newPos();
    if (note[4] === 1) myGameKeyGoalL.newPos();

    indexNotes++;
  } else {
    indexNotes = 0;
  }
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    var scoreHeader = document.createElement("h1");
    scoreHeader.textContent = "Score: 0";
    scoreHeader.style.textAlign = "center";
    scoreHeader.style.fontFamily = "Arial, sans-serif";
    scoreHeader.style.marginTop = "20px";
    document.body.appendChild(scoreHeader);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas); 
    this.interval = setInterval(updateGameArea, 18);
    window.addEventListener("keydown", function (e) {
      myGameArea.key = e.key;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.key = false;
    });
  }
};

function componentStatic(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.update = function () {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

function componentMove(width, height, color, x, y, gravity, key) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.x = x;
  this.y = y;
  this.gravity = gravity;
  this.key = key;
  this.active = false;
  this.update = function () {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function () {
    this.active = true;
  };
  this.move = function () {
    if (this.active) {
      this.y += this.gravity;
      if (this.y > window.innerHeight) {
        this.resetPosition();
      }
    }
  };  
  this.checkCollision = function () {
    if (myGameArea.key === this.key && this.y + this.height >= window.innerHeight - 200) {
      score++;
      this.resetPosition();
    }
  };
  this.resetPosition = function() {
    this.y = 100;
    this.active = false;
  };
}

var score = 0;

function updateScore() {
  document.querySelector("h1").textContent = "Score: " + score;
}

function updateGameArea() {
  const ctx = myGameArea.context;
  ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);

  if (myGameArea.key === "a") myGamePieceKeyA.color = "black"; else myGamePieceKeyA.color = "red";
  if (myGameArea.key === "s") myGamePieceKeyS.color = "black"; else myGamePieceKeyS.color = "blue";
  if (myGameArea.key === "j") myGamePieceKeyJ.color = "black"; else myGamePieceKeyJ.color = "green";
  if (myGameArea.key === "k") myGamePieceKeyK.color = "black"; else myGamePieceKeyK.color = "pink";
  if (myGameArea.key === "l") myGamePieceKeyL.color = "black"; else myGamePieceKeyL.color = "yellow";

  myGamePieceKeyA.update();
  myGamePieceKeyS.update();
  myGamePieceKeyJ.update();
  myGamePieceKeyK.update();
  myGamePieceKeyL.update();

  myGameKeyGoalA.move();
  myGameKeyGoalA.checkCollision();
  myGameKeyGoalA.update();
  myGameKeyGoalS.move();
  myGameKeyGoalS.checkCollision();
  myGameKeyGoalS.update();
  myGameKeyGoalJ.move();
  myGameKeyGoalJ.checkCollision();
  myGameKeyGoalJ.update();
  myGameKeyGoalK.move();
  myGameKeyGoalK.checkCollision();
  myGameKeyGoalK.update();
  myGameKeyGoalL.move();
  myGameKeyGoalL.checkCollision();
  myGameKeyGoalL.update();

  updateScore();
}

