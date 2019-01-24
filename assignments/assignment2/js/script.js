"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let avatar;
let food;
let manyFood = [];

function preload() {
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,100,0.35);

  for (var i = 0; i < 25; i++) {
    manyFood.push(new Food(random(0,width),random(0,height),10,100,random(5,20),random(5,20),10));
    }
  }

function draw() {
 background('#0800F5');

 for (var i = 0; i < 25; i++) {
    manyFood[i].update();
    manyFood[i].display();

    if (avatar.checkTomatoEating(manyFood[i])) {
      avatar.eat(manyFood[i]);
      }
    }

 avatar.update();
 avatar.display();
}
