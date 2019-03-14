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
var i = 0;
var width = 5;


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
// this.load.spritesheet('evilPlayer', 'assets/images/evilavatarV2.png')
   this.load.image('evilBg', 'assets/images/red.png');
 }


function create () {
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
   // split word
   lettersDisplay = chosenWord.split('');
   console.log(lettersDisplay);

   // create group
   letterObjects = this.add.group();
    for (var i = 0; i < lettersDisplay.length; i++) {
      var height = 20;
      var letter = this.add.text(width,height,lettersDisplay[i], {fontSize: '32px', fill: '#000'});
   //   letterObjects.create(360+Math.random()*200,120+Math.random()*200,letter);
   //   // .setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      width+=20;
    }

   //console.log(letterObjects.children);

     // make it interact with the platforms
     this.physics.add.collider(letterObjects, platforms);
     console.log("hello?")
        letterObjects.children.iterate(function (child) {
          console.log(child);
       console.log(lettersDisplay[i])
       i += 1;
       console.log(letterObjects);
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
