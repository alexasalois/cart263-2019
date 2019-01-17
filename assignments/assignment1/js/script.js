"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let avatarScore = 0;

let avatar = {
  x: 0,
  y: 0,
  currentSize:75,
  maxSize:75,
  active:true,
  color:'#D2A69F'
};

let chaiTea = {
  x:0,
  y:0,
  vx:0,
  vy:0,
  maxSpeed: 20,
  minSpeed: 2,
  currentSize:100,
  color:'#E5B260'
};

// preload()
//
// Description of preload

function preload() {
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(1000,500);
  background(0);
  chaiTea.x = random(0,width);
  chaiTea.y = random(0,height);

  chaiTea.vx = random(chaiTea.minSpeed,chaiTea.maxSpeed);
  chaiTea.vy = random(chaiTea.minSpeed,chaiTea.maxSpeed);

  noCursor();
}


// draw()
//
// Description of draw()

function draw() {
  ellipseMode(CENTER);

  background(0);
  avatar.x = mouseX;
  avatar.y = mouseY;

  if (avatar.active === true){

    updateChaiTea();
    updateAvatar();
    displayChaiTea();
    checkTeaConsumption();

    push();
    noStroke();
    fill(avatar.color);
    ellipse(avatar.x,avatar.y,avatar.currentSize,avatar.currentSize);
    pop();
  }
}

function displayChaiTea() {
  push();
  noStroke();
  fill(chaiTea.color);
  ellipse(chaiTea.x,chaiTea.y,chaiTea.currentSize,chaiTea.currentSize);
  pop();
}

function checkTeaConsumption() {
  let d = dist(avatar.x,avatar.y,chaiTea.x,chaiTea.y);

  if (d < avatar.currentSize/2 + chaiTea.currentSize/2) {
    avatarScore += 1;
    console.log("You drank "+avatarScore+" chai teas.");

    chaiTea.vx = random(chaiTea.minSpeed,chaiTea.maxSpeed);
    chaiTea.vy = random(chaiTea.minSpeed,chaiTea.maxSpeed);


    avatar.currentSize = constrain(avatar.currentSize + 35,0,avatar.maxSize);
    chaiTea.x = random(0,width);
    chaiTea.y = random(0,height);
  }
}

function updateAvatar() {
  avatar.currentSize = constrain(avatar.currentSize,0,avatar.maxSize);

  if (avatar.currentSize > 0) {
  avatar.currentSize -= 0.25;
  }
  else {
    avatar.active = false;
    console.log('no chai tea for u ;-;')
    }
}

function updateChaiTea() {
  chaiTea.x += chaiTea.vx;
  chaiTea.y += chaiTea.vy;


  if (chaiTea.x < 0 || chaiTea.x > width) {
    chaiTea.vx = -chaiTea.vx;
  }

  if (chaiTea.y < 0 || chaiTea.y > height) {
    chaiTea.vy = -chaiTea.vy;
  }
}
