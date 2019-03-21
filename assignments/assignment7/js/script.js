"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

var frequencies = [
  220.00,
  246.94,
  138.59,
  146.83,
  164.81,
  185.00,
  "",
  "",
  207.65
];

var pattern = [
  'x o',
  '*',
  'x',
  'x x',
  'o',
  'oo',
  'x',
  '* * *'
];

let newFrequency;
var patternIndex = 0;
var timer;

var synthFX;
var kickFX;
var snareFX;
var hihatFX;

function preload() {
//
}


// setup()
//
// Description of setup

function setup() {
    synthFX= new Pizzicato.Sound({
    source: 'wave',
  });

  var distortion = new Pizzicato.Effects.Distortion({
    gain: 1
  });

  var flanger = new Pizzicato.Effects.Flanger({
    time: 0.45,
    speed: 0.2,
    depth: 1,
    feedback: 1,
    mix: 0.5
});

  var tremolo = new Pizzicato.Effects.Tremolo({
    speed: 1.81,
    depth: 1,
    mix: 1
  });

  var stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: -1
  });

  var dubDelay = new Pizzicato.Effects.DubDelay({
    feedback: 0.9,
    time: 0.5,
    mix: 0.5,
    cutoff: 800
});

   hihatFX = new Pizzicato.Sound('assets/sounds/hihat.wav');

   kickFX = new Pizzicato.Sound('assets/sounds/kick.wav');

   snareFX = new Pizzicato.Sound('assets/sounds/snare.wav');

   kickFX.addEffect(stereoPanner);
   kickFX.addEffect(dubDelay);
   //kickFX.addEffect(distortion);
   snareFX.addEffect(tremolo);
   synthFX.addEffect(flanger);
}


// draw()
//
// Description of draw()

function draw() {

}

function mousePressed() {
if (!newFrequency) {
    playNote();
    setInterval(playDrum,250);
  }
}

function playNote() {
   newFrequency = random(frequencies);
   if (newFrequency == "") {
     synthFX.stop();
   }

   else {
     synthFX.frequency = newFrequency;
     synthFX.play();
     }

  setTimeout(function(){
    playNote();
  },random(50,1000));
}

function playDrum() {
  var symbols = pattern[patternIndex];

  if (symbols.indexOf('x') !== -1) {
    kickFX.play();
  }

  if (symbols.indexOf('o') !== -1) {
    snareFX.play();
  }

  if (symbols.indexOf('*') !== -1) {
    hihatFX.play();
  }

  patternIndex++;

  if (patternIndex == pattern.length) {
    patternIndex = 0;
  }
}
