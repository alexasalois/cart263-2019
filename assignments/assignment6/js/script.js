"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

$(document).ready(function() {

  $.getJSON('data/data.json', dataLoaded);

});

function dataLoaded(data) {
  console.log(data);

  let condiment = getRandomElement(data.condiments);
  console.log(condiment);

  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }
  console.log(verb);
}

function getRandomElement(array) {
   let element = array[Math.floor(Math.random()*array.length)];
   return element;
}
