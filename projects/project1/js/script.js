/*****************

Project 1: Modern Day Sisyphus
Alexandra Salois

An interactive experience to reproduce the pain Sisyphus
went through during his punishment, an infinite loop of
trying without succeeding.

******************/
"use strict"

// set variables for the draggable objects
let $dragInspiration;
let $receiveInspiration;

// set variables for the score properties
let scoreIdeas = 0;
let scoreTypos = 0;
let scoreScript = 0;
let scoreVisuals = 0;
let scoreInteraction = 0;

// set variables for score to reach
let goalIdeas = 3;
let goalTypos = 5;
let goalScript = 8;
let goalVisuals = 4;
let goalInteraction = 2;

// set variable that checks which drag object is being dropped
let idActive;

// when the page is ready, run this
$(document).ready(setup);

$(document).on('click', function(){
 $('#backgroundMusic').trigger('play');
});

// prepare the code to run
function setup() {
  $dragInspiration = $(".draggables");
  $receiveInspiration = $("#computerPerson");

  $dragInspiration.draggable({ revert: true });
  $receiveInspiration.droppable({ drop: retain });

  // display original stats
  updateStats();

  // pop up dialog for instructions
  showInstructions();
}

function retain( event, ui) {
  // Create variable to store the different drag IDs
  idActive = ui.draggable[0].id;

  // play typing sound
  $('#typingSound').trigger('play');

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

  // Check the score and update based on the dragged objects
  checkScore();

}

// animate the person at the computer
function typingComputer() {
  if ($receiveInspiration.attr("src") == "assets/images/personWaiting.png") {
        $receiveInspiration.attr("src", "assets/images/personTyping.png");
      }
      else {$receiveInspiration.attr("src", "assets/images/personWaiting.png");
      }
    }


function updateStats() {
  // define the variables for the number of drag objects, and a parent to contain those objects
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

function showInstructions() {
  // Set up the dialog with the instructions
  $("#first").text("To submit, make sure you have at least "+goalIdeas+" good ideas, create "+goalVisuals+" cool visuals, avoid "
  +goalTypos+" typos, implement "+goalInteraction+" interactions, and  write "+goalScript+" lines of script. Good luck! (if you didn't realize, drag the objects on your hard-working icon.)")
  $("#first").dialog({
    width: 450
  });
}

function checkScore() {
  // Check if the player accomplishes the goal, if so, double the requirements
  if ((scoreIdeas > goalIdeas -1) && (scoreTypos > goalTypos -1) && (scoreScript > goalScript -1) && (scoreVisuals > goalVisuals -1) && (scoreInteraction > goalInteraction -1)) {
    goalIdeas *= 2;
    goalTypos *= 2;
    goalScript *= 2;
    goalVisuals *= 2;
    goalInteraction *= 2;

    // show pop up with new instructions
    showInstructions();
  }
}
