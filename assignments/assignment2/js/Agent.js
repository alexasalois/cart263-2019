class Agent {
constructor(x,y,size,agentColor) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = agentColor;
  this.active = true;
  }

display() {
  if (this.active) {
    push();
    noCursor();
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.size,this.size);
    pop();
    }
  }

checkTomatoEating(food) {
  if (this.active) {
    let d = dist(this.x,this.y,food.x,food.y);

    if (d < this.size/2 + food.size/2) {
      return true;
    }

    else {
      return false;
      }
    }
  }
}
