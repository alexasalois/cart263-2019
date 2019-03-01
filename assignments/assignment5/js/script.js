"use strict";

/*****************

Slamina : exercise 5
Alexandra Salois

******************/
// define variables and the constant
let animals=
    [
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ]
let answers=[];
let correctAnimal;
const NUM_OPTIONS = 5;

// get document ready and show message, starting to listen
$(document).ready(function(){
   $('#start').on('click', function() {
     $(this).remove();

     if (annyang) {
       let commands = {
         // if you give up, voice is mean :c
         'I give up': function() {
           responsiveVoice.speak('You suck.','UK English Male');

           // shake the right answer
           $('.guess').each(function () {
             if ($(this).text() === correctAnimal) {
               $(this).effect('shake');
             }
           });

            // wait till you remove the guesses...
            setTimeout(function() {
            $('.guess').remove();} , 3000);

            // start new round
            setTimeout(newRound,3000);
            },

         // name is repeated
         'Say it again': function() {
           responsiveVoice.speak('Are you deaf?','UK English Male');
           setTimeout(function () {speakAnimal(correctAnimal)},2000);
         },

         "I think it's *tag": function(tag) {
           if (tag == correctAnimal) {
             responsiveVoice.speak('Wow you are amazing I love you!','UK English Male');
             $('.guess').remove();
             setTimeout(newRound,2000);
           }

           else {
             responsiveVoice.speak('That was bad.','UK English Male');
           }
         }
       };

       // first round
       newRound();
       annyang.addCommands(commands);

     // listening...
     annyang.start();
   }});
 });


// add a button for the guesses
function addButton(label) {
  // make a class to group all the options
  let $guess = $('<div class="guess"></div>');
  // create button
  $guess.text(label);
  $guess.button();
  $guess.on('click', function() {
    // make if statement that detects the right or wrong answer

    // right
    if ($(this).text() === correctAnimal) {
      $('.guess').remove();
      setTimeout(newRound,1000);
    }

    // wrong
    else {
      speakAnimal(correctAnimal);
    }
  });

  // display the buttons on the page
  $('body').append($guess);
}

// when the round starts, pick a correct animal based on 5 randomly picked ones from the list
function newRound() {
  answers = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let answer = animals[Math.floor(Math.random()*animals.length)]

    // create a button with the guesses
    addButton(answer);
    answers.push(answer);
    }

    // pick one of the guesses to be the correct one and say it outloud
    correctAnimal = answers[Math.floor(Math.random()*answers.length)]
    speakAnimal(correctAnimal);
}

// say the name but reversed
function speakAnimal(animal) {
  let reverseAnimal = animal.split('').reverse().join('');

  // distort the voice a bit
  let options = {
    pitch: Math.random(),
    rate: Math.random()
  }

  // voice talks
  responsiveVoice.speak(reverseAnimal, 'UK English Male', options);
}
