"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let avatar;
let food;

function preload() {
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,100,0.35);
  food = new Food(random(0,width),random(0,height),10,100);
}

function draw() {
 background('#0800F5')
 avatar.update();
 avatar.display();
 food.display();


if (avatar.checkTomatoEating(food)) {
  avatar.eat(food);
}

}
