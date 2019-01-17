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
      }
    }

    eat(food) {
      if (this.active) {
        this.size = constrain(this.size + food.size, 0, this.maxSize);
        food.reset();
      }
    }
  }
