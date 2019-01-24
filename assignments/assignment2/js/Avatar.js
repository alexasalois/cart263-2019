class Avatar extends Agent {
  constructor(x,y,size,loss) {
    super(x,y,size,'green');
    this.maxSize = size;
    this.loss = loss;
  }

  update() {
    if (this.active) {
      this.x = mouseX;
      this.y = mouseY;
      this.size = constrain(this.size - this.loss,0,this.maxSize);
      }

    if (this.size === 0) {
      this.active = false;

      push();
      background(0);
      fill(255);
      textAlign(CENTER);
      textSize(50);
      text('No signal',width/2,height/2);
      pop();

      this.x = 0;
      this.y = 0;
      food.vx = 0;
      food.vy = 0;
      }
    }

    eat(food) {
      if (this.active) {
        this.size = constrain(this.size + food.size, 0, this.maxSize);
        scoreAvatar = scoreAvatar + 1;
        food.reset();
      }
    }
  }
