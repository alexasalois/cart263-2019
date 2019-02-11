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
let $broccoli;
let idActive;

//

$(document).ready(setup);

//

function setup() {

  $mouth = $("#mouthOpen");
  $brownie = $("#brownie");
  $broccoli = $("#broccoli");

  $brownie.draggable();
  $mouth.droppable({ drop: eat });
  $broccoli.draggable();
  }

//

function eat(event, ui) {
  // program detects which element is dropped
  idActive = ui.draggable[0].id;

  // The mouth happily eats the brownie
  if (idActive == "brownie" ) {
    $brownie.draggable( "disable" );
    $brownie.remove();

    // victory sound!
    $("#yay").trigger('play');

      // Mouth chews...
      let chewInterval = setInterval(chewThatShit, 100);
      setTimeout(function() {
        clearInterval(chewInterval);
      },2000);
    }

    // if the broccoli is "eaten", reject!
    if (idActive == "broccoli") {
      $broccoli.draggable({revert: true});

      // unhappy noise
      $("#scream").trigger('play');
    }
  }

// mouth animation
function chewThatShit() {
      if ($mouth.attr("src") == "assets/images/mouth_open.png") {
        $mouth.attr("src", "assets/images/mouth_close.png");
      }
      else {$mouth.attr("src", "assets/images/mouth_open.png");
      }
}
