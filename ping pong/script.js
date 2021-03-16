
var animate = window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
//var nTest = document.getElementById("Score").getAttribute("Value");
var nGoal1 = 0;
var nGoal2 = 0;

window.onload = function() {
document.body.appendChild(canvas);
animate(step);
};

var Score1 = function() {
this.modify_Score(1);
}

var step = function() {
update();
render();
animate(step);
};

var update = function() {
};

var render = function() {
context.fillStyle = "#FF00FF";
context.fillRect(0, 0, width, height);
};

function Paddle(x, y, width, height) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.x_speed = 0;
this.y_speed = 0;
}

Paddle.prototype.render = function() {
context.fillStyle = "#00009F";
context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
 this.paddle = new Paddle(175, 580, 50, 10);
}

function Computer() {
this.paddle = new Paddle(175, 10, 50, 10);
}


Player.prototype.render = function() {
this.paddle.render();
};

Computer.prototype.render = function() {
this.paddle.render();
};

function Ball(x, y) {
this.x = x;
this.y = y;
this.x_speed = 0;
this.y_speed = 3;
this.radius = 4;
}

Ball.prototype.render = function() {
context.beginPath();
context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
context.fillStyle = "#FF0000";
context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function() {
context.fillStyle = "#FF99FF";
context.fillRect(0, 0, width, height);
player.render();
computer.render();
ball.render();
};

var update = function() {
ball.update();
};

Ball.prototype.update = function() {
this.x += this.x_speed;
this.y += this.y_speed;
};

var update = function() {
ball.update(player.paddle, computer.paddle);
};

Ball.prototype.update = function(paddle1, paddle2) {
this.x += this.x_speed;
this.y += this.y_speed;
var top_x = this.x - 5;
var top_y = this.y - 5;
var bottom_x = this.x + 5;
var bottom_y = this.y + 5;


if(this.x - 5 < 0) {
  this.x = 5;
  this.x_speed = -this.x_speed;
} else if(this.x + 5 > 400) { 
  this.x = 395;
  this.x_speed = -this.x_speed;
}




for(var reset in keysDown) {
  var reset = Number(reset);
  
 if (reset == 82) {
    this.x_speed = 0;
    this.y_speed = 5;                                          
    this.x = 200;                                        
    this.y = 300;                   
    nGoal1 = 0;
    nGoal2 = 0;
    document.getElementById("Score").setAttribute("Value", nGoal1);
    document.getElementById("Score1").setAttribute("Value", nGoal2);
 }
}
  //tring z;

if(this.y > 600) { // a point was scored player 1
  this.x_speed = 0;
  this.y_speed = 5;
  this.x = 200;
  this.y = 300;
  nGoal1 += 1;       
  document.getElementById("Score").setAttribute("Value", nGoal1);

}

if(this.y < 0) {  //a point was scored player 2
  this.x_speed = 0;
  this.y_speed = -5;
  this.x = 200;
  this.y = 300;
  nGoal2 += 1;
  document.getElementById("Score1").setAttribute("Value", nGoal2);
}


if(top_y > 300) {
  if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
    
    this.y_speed = -4;
    this.x_speed += (paddle1.x_speed / 2);
    this.y += this.y_speed;
  }
} else {
  if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
    // hit the computer's(player2) paddle
    this.y_speed = 4;
    this.x_speed += (paddle2.x_speed / 2);
    this.y += this.y_speed;
  }
}
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
delete keysDown[event.keyCode];
});

var update = function() {
player.update();
ball.update(player.paddle, computer.paddle);
};

Player.prototype.update = function() {
for(var key in keysDown) {
  var value = Number(key);
  if(value == 37) { // links arrow
    this.paddle.move(-8, 0);
  } else if (value == 39) { // rechts arrow
    this.paddle.move(8, 0);
  } else {
    this.paddle.move(0, 0);
  }
  
      
  if (value == 66) { 
    this.paddle.move(0, -1, 0, 0); 
  } else if (value == 67) {
    this.paddle.move(0, 1, 0);
  } else {
    this.paddle.move(0, 0);   
  }   
}
};


Paddle.prototype.move = function(x, y) {
this.x += x;
this.y += y;
this.x_speed = x;
this.y_speed = y;
if(this.x < 0) { 
  this.x = 0;
  this.x_speed = 0;
} else if (this.x + this.width > 400) { 
  this.x = 400 - this.width;
  this.x_speed = 0;
}
}

var update = function() {
player.update();
computer.update(ball);
ball.update(player.paddle, computer.paddle);
};

Computer.prototype.update = function() {
for(var key in keysDown) {
  var value = Number(key);
  if(value == 65) { 
    this.paddle.move(-8, 0);
  } else if (value == 68) { 
    this.paddle.move(8, 0); 
  } else {
    this.paddle.move(0, 0);
  }
}
};

