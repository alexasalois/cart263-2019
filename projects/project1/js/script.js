/*****************

Project 1: Modern Day Sisyphus
Alexandra Salois

An interactive experience to reproduce the pain Sisyphus
went through during his punishment, an infinite loop of
trying without succeeding.

******************/
"use strict"

let $dragInspiration;
let $receiveInspiration;
let scoreIdeas = 0;
let scoreTypos = 0;
let scoreScript = 0;
let scoreVisuals = 0;
let scoreInteraction = 0;
let idActive;

// when the page is ready, run this -->
$(document).ready(setup);


// preload the assets
function preload() {

}

// prepare the code to run
function setup() {
  $dragInspiration = $(".draggables");
  $receiveInspiration = $("#computerPerson");

  $dragInspiration.draggable({ revert: true });
  $receiveInspiration.droppable({ drop: retain });



}

function retain( event, ui) {
  // Create variable to store the different drag IDs
  idActive = ui.draggable[0].id;

  // Animate the person typing with an interval
  let typeInterval = setInterval(typingComputer, 100);
  setTimeout(function() {
  clearInterval(typeInterval);
  },2000);

  // Calculate the score for each object
  if (idActive == "drag5") {
    scoreInteraction += 1;
  }

  if (idActive == "drag4") {
    scoreVisuals += 1;
  }

  if (idActive == "drag3") {
    scoreScript += 1;
  }

  if (idActive == "drag2") {
    scoreTypos += 1;
  }

  if (idActive == "drag1") {
    scoreIdeas += 1;
  }
}

function typingComputer() {
  if ($receiveInspiration.attr("src") == "assets/images/personWaiting.png") {
        $receiveInspiration.attr("src", "assets/images/personTyping.png");
      }
      else {$receiveInspiration.attr("src", "assets/images/personWaiting.png");
      }
}


// what the software will run continuously
function draw() {

}
