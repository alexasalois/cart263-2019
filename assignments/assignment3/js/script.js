"use strict";

$(document).ready(setup);
// will run when code is ready...

function preload() {
}

//

function setup() {
  setInterval(update,500);
  $('span').on('click',spanClicked);
}

//

function update() {
  $('span').each(updateSpan);
}

function updateSpan() {
  let rNumber = Math.random();
  if (rNumber < 0.05) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}


//

function draw() {
}
