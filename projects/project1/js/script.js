/*****************

Project 1: Modern Day Sisyphus
Alexandra Salois

An interactive experience to reproduce the pain Sisyphus
went through during his punishment, an infinite loop of
trying without succeeding.

******************/
"use strict"

let $dragInspiration;
let $recieveInspiration;
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
  $recieveInspiration = $("#computerPerson");

  $dragInspiration.draggable({ revert: true });
  $recieveInspiration.droppable({ drop: retain });



}

function retain( event, ui) {
  idActive = ui.draggable[0].id;

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

// what the software will run continuously
function draw() {

}
