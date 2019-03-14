/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

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

var chosenWord;
var lettersDisplay = [];
var letterObjects;

// configure the game
var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
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
   this.load.image('greenBg', 'assets/images/Green.jpg');
   this.load.image('platform', 'assets/images/platform.png');
   this.load.spritesheet('player', 'assets/images/avatar1.png', {frameWidth: 95, frameHeight: 177});
 }


function create () {
   // background is now green
   this.add.image(750, 300, 'greenBg');

   // platforms are static (aka you can land and jump on them and they don't move)
   platforms = this.physics.add.staticGroup();

   // create platforms for the player to move around
   platforms.create(200, 700, 'platform').setScale(2).refreshBody();
   platforms.create(1300, 700, 'platform');
   platforms.create(400, 250, 'platform');
   platforms.create(950, 350, 'platform');

   // set up player, make sure he stays on screen and bounces when he lands
   player = this.physics.add.sprite(100, 250, 'player');
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);

   // Word to spell out is chosen randomly in the list
   chosenWord = cute[Math.floor(Math.random()*cute.length)];
   console.log(chosenWord);

   // Displays the word to collect
   this.add.text(550, 16,chosenWord, { fontSize: '32px', fill: '#000' });
   responsiveVoice.speak(chosenWord,'UK English Male');

   // Letter objects to collect, word is split into an array, then array used as the key for the group
   lettersDisplay = chosenWord.split('');
   console.log(lettersDisplay);

   letterObjects = this.physics.add.group({
     key: 'lettersDisplay',
     repeat: 11,
     setXY: { x: 12, y: 0, stepX: 70 }
   });

     this.physics.add.collider(letterObjects, platforms);
     letterObjects.children.iterate(function (child) {
     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
 });

   // animation of the avatar walking
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 8 }),
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
       player.setVelocityY(-400);
     }
   }

// function displayGame() {
//   lettersDisplay = chosenWord.split('');
//   console.log(lettersDisplay);

//   letterObjects = this.physics.add.group({
//     key: 'lettersDisplay',
//     repeat: 11,
//     setXY: { x: 12, y: 0, stepX: 70 }
//   });
//
//     letterObjects.children.iterate(function (child) {
//     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
// });
//}
