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

  // display original stats
  updateStats();
}

function retain( event, ui) {
  // Create variable to store the different drag IDs
  idActive = ui.draggable[0].id;

  // Set an interval for the typing animation
  let typeInterval = setInterval(typingComputer, 100);
  setTimeout(function() {
  clearInterval(typeInterval);
  },2000);

  // Calculate the score for each object
  if (idActive == "drag5") {
    scoreInteraction += 1;
    updateStats();
  }

  if (idActive == "drag4") {
    scoreVisuals += 1;
    updateStats();
  }

  if (idActive == "drag3") {
    scoreScript += 1;
    updateStats();
  }

  if (idActive == "drag2") {
    scoreTypos += 1;
    updateStats();
  }

  if (idActive == "drag1") {
    scoreIdeas += 1;
    updateStats();
  }
}

// animate the person at the computer
function typingComputer() {
  if ($receiveInspiration.attr("src") == "assets/images/personWaiting.png") {
        $receiveInspiration.attr("src", "assets/images/personTyping.png");
      }
      else {$receiveInspiration.attr("src", "assets/images/personWaiting.png");
      }
}


// what the software will run continuously
function draw() {
  fill(255);
  textSize(25);
  text("Ideas imagined: "+scoreIdeas,20,20);
  text("Visuals designed: "+scoreVisuals,20,45);
  text("Typos avoided: "+scoreTypos,20,70);
  text("Interactions implemented: "+scoreInteraction,20,95);
  text("Lines of script completed: "+scoreScript,20,120);
}

function updateStats() {
  // define the variables
  let scores = $(".draggables").length-1;
  let $parent = $("#stats");

  // make a loop to create the different divs for the stats
  for (let i = 0; i <= scores; i++){
    $parent.append("<div id='stat"+(i+1)+"'></div>");
  }

  // display the states with their titles and scores
  $("#stat1").html("Ideas imagined: "+scoreIdeas);
  $("#stat2").html("Visuals designed: "+scoreVisuals);
  $("#stat3").html("Typos avoided: "+scoreTypos);
  $("#stat4").html("Interactions implemented: "+scoreInteraction);
  $("#stat5").html("Lines of script completed: "+scoreScript);
}
