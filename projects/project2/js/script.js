/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let ctx = null;
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

var cute = [
  "puppy",
  "sunshine",
  "daisy",
  "flower",
  "kitten",
  "sweet",
  "candy",
  "family",
  "friends",
  "love",
  "happiness",
  "dance",
  "funny",
  "cupcake",
  "giggle"
];

var dark = [
  "suicide",
  "murder",
  "death",
  "slaughter",
  "suffering",
  "torture",
  "depression",
  "assault",
  "disarray",
  "horror",
  "pain",
  "broken",
  "anxiety",
  "uncanny"
];

// random word
var chosenWord;

// groups for the letters of the words
var lettersDisplay = [];
var letterObjects;

// for the loop while spawning the letters
var i = 0;
var width = 5;

// for the changing font of the game
var font;

// check the score / correct letters
var score = 0;
var correctLetters = 0;

var random;

// configure the game
var config = {
    type: Phaser.AUTO,
    width: 1300,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

 var player;
 var platforms;
 var platform;
 var cursors;
 var game = new Phaser.Game(config);

function preload () {
   // load the assets
   this.load.image('normalBg', 'assets/images/blue.png');
   this.load.image('platform', 'assets/images/platform.png');
   this.load.spritesheet('player', 'assets/images/avatarV2.png', {frameWidth: 113.5, frameHeight: 177});
   this.load.spritesheet('evilPlayer', 'assets/images/evilavatarV2.png', {frameWidth: 113.5, frameHeight: 177});
   this.load.image('evilBg', 'assets/images/red.png');
 }


function create () {
  ctx = this;
   // background is now green
   this.add.image(650, 300, 'normalBg');

   // platforms are static (aka you can land and jump on them and they don't move)
   platforms = this.physics.add.staticGroup();

   // create platforms for the player to move around
   platforms.create(0, 650, 'platform').setScale(10).refreshBody();
   platforms.create(1120, 330, 'platform');
   platforms.create(0, 350, 'platform');
   platforms.create(500, 270, 'platform');
   platforms.create(620, 480, 'platform');


   // set up player, make sure he stays on screen and bounces when he lands
   player = this.physics.add.sprite(575,380, 'player');
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);

   startGame();

   // animation of the avatar walking
    // walking to the left
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    // resting
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });

    // walking to the right
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

     // Create controls for the avatar, make sure the avatar jumps on platforms
     cursors = this.input.keyboard.createCursorKeys();
     this.physics.add.collider(player, platforms);
 }

 function update () {
   // set up the controls with the arrow keys
   if (cursors.left.isDown) {

       player.setVelocityX(-160);
       player.anims.play('left', true);
     }

     else if (cursors.right.isDown) {

         player.setVelocityX(160);
         player.anims.play('right', true);
     }

     else {
       player.setVelocityX(0);
       player.anims.play('turn');
     }

     if (cursors.up.isDown && player.body.touching.down) {
       player.setVelocityY(-300);
     }
   }

   function checkCorrectLetters(player,group,ctx) {
   // What happens when you get all the letters: letter is removed, +1 for the word to complete
     group.destroy();
     correctLetters += 1;

     if (correctLetters === lettersDisplay.length) {
       score += 1;
       console.log(score)
       startGame();
     }
   }

   function startGame() {

        // Word to spell out is chosen randomly in the list
        chosenWord = cute[Math.floor(Math.random()*cute.length)];

        // Displays the word to collect
        ctx.add.text(550, 16,chosenWord, { fontSize: '32px', fontFamily: 'Crafty Girls', fill: '#000' });
        responsiveVoice.speak(chosenWord,'UK English Male');

        // Letter objects to collect, word is split into an array, then array used as the key for the group
        // split word
        lettersDisplay = chosenWord.split('');
        //lettersDisplay = chosenWord.shuffle('');
        console.log(lettersDisplay);

        // create group where physics will be applied (the letters)
        let group = ctx.physics.add.group();

         // check how many letters in the chosen word
         for (var i = 0; i < lettersDisplay.length; i++) {
           // height they will fall from
           var height = 20;

           // store the letters in the physics group
           var letter = ctx.add.text(width,height,lettersDisplay[i], {fontSize: '32px', fontFamily: 'Crafty Girls', fill: '#000'});
           group.add(letter);

           // space them out
           width+=100;

           // make letters bounce (added difficulty)
           letter.body.bounce.y = 0.99;
           letter.body.collideWorldBounds = true;
           letter.body.setVelocityX(300);
           letter.body.bounce.x = 0.99;
           letter.body.setVelocityY(300);
           }


          // Interact with the letters
          ctx.physics.add.overlap(player,group,checkCorrectLetters,null,ctx);

          // make the letter group interact with the static platforms
          ctx.physics.add.collider(group, platforms);

   }
