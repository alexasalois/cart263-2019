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
//
var game = new Phaser.Game(config);

function preload () {
   this.load.image('greenBg', 'assets/images/Green.jpg');
   this.load.image('platform', 'assets/images/platform2.png');
   this.load.image('player', 'assets/images/black.png');
 }


function create () {
   this.add.image(750, 300, 'greenBg');

   platforms = this.physics.add.staticGroup();

   platforms.create(200, 700, 'platform');//.setScale(2).refreshBody();
//
   platforms.create(1300, 700, 'platform');
   platforms.create(400, 250, 'platform');
   platforms.create(950, 350, 'platform');
//
   player = this.physics.add.image(100, 250, 'player');
//
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);

   chosenWord = cute[Math.floor(Math.random()*cute.length)];
   console.log(chosenWord);

   displayGame();
//
   // animation
//    this.anims.create({
//        key: 'left',
//        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
//        frameRate: 10,
//        repeat: -1
//    });
 //
//    this.anims.create({
//        key: 'turn',
//        frames: [ { key: 'player', frame: 4 } ],
//        frameRate: 20
//    });
 //
//    this.anims.create({
//        key: 'right',
//        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
//        frameRate: 10,
//        repeat: -1
//    });
 //
     cursors = this.input.keyboard.createCursorKeys();

     this.physics.add.collider(player, platforms);
 }

 function update () {
   if (cursors.left.isDown) {

       player.setVelocityX(-160);
    //   player.anims.play('left', true);
     }

     else if (cursors.right.isDown) {

         player.setVelocityX(160);
      //   player.anims.play('right', true);
     }

     else {
       player.setVelocityX(0);
      // player.anims.play('turn');
     }

     if (cursors.up.isDown && player.body.touching.down) {
       player.setVelocityY(-400);
     }
   }

function displayGame() {
  lettersDisplay = chosenWord.split('');
  console.log(lettersDisplay);
}
