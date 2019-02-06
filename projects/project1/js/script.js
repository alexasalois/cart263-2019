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
  console.log("MORE!!!");
}
// what the software will run continuously
function draw() {

}
