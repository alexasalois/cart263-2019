"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let description;
let vowels = ['a','e','i','o','u','y','A','E','I','O','U','Y'];

$(document).ready(function() {
  // when the page opens run the function, and when it clicks, run reset
  $.getJSON('data/data.json', dataLoaded);
  $("html").on("click", function(){
    reset();
  });
});

function reset() {
  // On click, add a new sentence!
  $.getJSON('data/data.json', dataLoaded);
}

function dataLoaded(data) {
  // Get the condiment randomly
  let condiment = getRandomElement(data.condiments);

  // Adjust the verb according to the condiment
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }

  // Get a random cat
  let cat = getRandomElement(data.cats);
  let articleCat = 'a';

  // Check the first letter of the cat and adjust the article accordingly
  for (let i = 0; i < vowels.length; i++){
    if (cat.charAt(0) === vowels[i]){
      articleCat = 'an';
      }
    }

  // Get a random cocktail name
  let cocktail = getRandomElement(data.cocktails);

  // Get a random location
  let room = getRandomElement(data.rooms);

  // Check the first letter of the room and adjust the article accordingly
  let articleRoom = 'a';
  for (let i = 0; i < vowels.length; i++){
    if (room.charAt(0) === vowels[i]){
      articleRoom = 'an';
      }
    }

  // Get a random tea
  let tea = getRandomElement(data.teas);

  // Form a fun sentence with the randomly generated words
  description = `${condiment} ${verb} like ${articleCat} ${cat} in ${articleRoom} ${room} drinking a ${cocktail} (but pretending it's ${tea} tea). `;
    $('body').append(description);
  }

function getRandomElement(array) {
   // create the function for the randomization of the array (so we dont have to repeat it 130934 times)
   let element = array[Math.floor(Math.random()*array.length)];
   return element;
}
