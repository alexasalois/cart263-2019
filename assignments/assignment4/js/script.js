/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
"use strict"

let $mouth;
let $brownie;
let $mouthClosed;

//

$(document).ready(setup);

//

function setup() {

  $mouth = $("#mouthOpen");
  $brownie = $("#brownie");

  $brownie.draggable();
  $mouth.droppable({ drop: eat });
  }

//

function eat(event, ui) {
  ui.draggable.remove();
  console.log("yummy!");

  let chewInterval = setInterval(chewThatShit, 10);

  setTimeout(function() {
    clearInterval(chewInterval);
  },2000);
}

function chewThatShit() {
      if ($mouth.attr("src") == "assets/images/mouth_open.png") {
        $mouth.attr("src", "assets/images/mouth_close.png");
      }
      else {$mouth.attr("src", "assets/images/mouth_open.png");
      }
}
