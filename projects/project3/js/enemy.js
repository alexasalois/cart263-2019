

function Enemy(x,y,vy,active,speed) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.active = active;
  this.speed = speed;
}

// update its position
Enemy.prototype.updateEnemy = function() {
  this.y += this.vy;
}

// check if it's offscreen, if so "delete" it
Enemy.prototype.isOffScreen = function() {
  if ( this.y > 700 ) {

    this.vy = 0;
    this.size = 0;
    this.x = -this.size;
    this.y = -this.size;
    this.active = false;
  }
}

// Check if the enemy is touching the avatar, if so lose a life
Enemy.prototype.handleCollision = function(avatar) {
  var d = dist(this.x,this.y,avatar.x,avatar.y)

  // calculate the space between the enemy and the avatar to see when they touch, therefore loses a life
  if (d < this.size/2 + avatar.w/2) {
    this.x = 0-this.size;
    this.y = 0-this.size;
  }
}

Enemy.prototype.display = function() {
  let $enemy = "<div id='enemy'></div>";
  $("#miniGame").append($enemy);
  $("#enemy").css("left",this.x+"px");
  $("#enemy").css("top", this.y+"px");
}
