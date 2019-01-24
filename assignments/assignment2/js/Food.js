class Food extends Agent {
  constructor(x,y,minSize,maxSize,vx,vy,maxSpeed) {
  super(x,y,random(minSize,maxSize),'red');
  this.minSize = minSize;
  this.maxSize = maxSize;
  this.vx = vx;
  this.vy = vy;
  this.maxSpeed = maxSpeed;
  }

  reset(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.vx = random(-this.maxSpeed,this.maxSpeed);
    this.vy = random(-this.maxSpeed,this.maxSpeed);
    this.size = random(this.minSize,this.maxSize);
    }

  update(){
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
      }

    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy;
      }

    let r = random();

    if (r < 0.10) {
      this.vx = (random(-this.maxSpeed,this.maxSpeed));
      this.vy = (random(-this.maxSpeed,this.maxSpeed));
      }
    }
  }
