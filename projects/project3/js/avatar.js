Avatar(x,y,w,h,vx,leftArrow,rightArrow,speed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = 0;
  this.leftArrow = leftArrow;
  this.rightArrow = rightArrow;
  this.speed = speed;
}

// display the avatar as a cute little guy
this.prototype.display = function() {
  fill(0);
  imageMode(CENTER);
  rect(50,50,20,20);
}

// you can now control the avatar with the arrow keys, on an x-axis only
this.prototype.handleInput = function() {
  if (keyIsDown(this.leftArrow)) {
    this.vx = -this.speed;
  }
  else if (keyIsDown(this.rightArrow)) {
    this.vx = this.speed;
  }
  else {
    this.vx = 0;
  }
}

// update the position of the avatar and make sure it doesn't go off screen
this.prototype.moveAvatar = function() {
  this.x += this.vx;
  this.x = constrain(this.x,0,width);
}
