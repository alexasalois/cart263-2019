"use strict";
let secretsFound = 0;


$(document).ready(setup);
// will run when code is ready...

function preload() {
}

//

function setup() {
  setInterval(update,500);
  $('span').on('click',spanClicked);
  $('secret').on('mouseover',revealSecrets);

  

}

function revealSecrets() {
  $(this).removeClass('secrets');
  $(this).addClass('found');
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
