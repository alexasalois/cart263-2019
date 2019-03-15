/*****************

Deceiving Words
Alexandra Salois

An interactive experience about the darkness of the Internet.

******************/

// so the game runs through all the functions...
let ctx = null;

// array for the cute appearance
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
  "hug",
  "embrace",
  "beautiful",
  "desserts",
  "giggle"
];

// array for the dark turn
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
  "uncanny",
  "cunt",
  "bitch",
  "slut"
];

// random word and displaying it
var chosenWord;
var onScreenWord;

// var for the assets
var peacefulBackground;
var evilBackground;
var normalBg;
var evilBg;

// group for the letters of the random words
var lettersDisplay = [];

// for the loop while spawning the letters
var i = 0;
var width = 5;

// for the changing font of the game
var font;

// for the aesthetic changes and game state initialized
var background;
var avatarIsGood = true;
var happyGame = true;

// check the score / correct letters / on screen score
var score = 0;
var onScreenScore;
var correctLetters = 0;

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

// the basic variables for the main player, platforms and controls
 var player;
 var platforms;
 var platform;
 var cursors;
 var game = new Phaser.Game(config);

function preload () {
   // load the assets
   this.load.image('normalBg', 'assets/images/blue.png');
   this.load.image('platform', 'assets/images/platform.png');
   this.load.spritesheet('player', 'assets/images/avatarprise2.png', {frameWidth: 130, frameHeight: 174});
   this.load.image('evilBg', 'assets/images/red.png');
 }


function create () {
  ctx = this;
   // background is blue initially, red is hiding under
   evilBackground = this.add.image(650,300, 'evilBg');
   peacefulBackground = this.add.image(650, 300, 'normalBg');

   // game aesthetics change depending on the game state (evil or normal)
   changeBackground();

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

   // display score on screen
   onScreenScore = ctx.add.text(10,16,"score: "+score, { fontSize: '32px', fontFamily: 'Crafty Girls', fill: '#000'});

   // game starts: info is displayed,letters are organized, game state is checked, voice speaks
   startGame();

   // animation of the avatar walking
    // walking to the left
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'evilLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 12 }),
        frameRate: 10,
        repeat: -1
    });

    // resting
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'evilTurn',
        frames: [ { key: 'player', frame: 13 }],
        frameRate: 20,
    });


    // walking to the right
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'evilRight',
        frames: this.anims.generateFrameNumbers('player', { start: 14, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

     // Create controls for the avatar, make sure the avatar jumps on platforms
     cursors = this.input.keyboard.createCursorKeys();
     this.physics.add.collider(player, platforms);
 }

 function update () {
   // setting up the keys
   // state when player is going left (evil and normal)
   if (cursors.left.isDown) {
      if (avatarIsGood) {
       player.setVelocityX(-160);
       player.anims.play('left', true);
     }

     else {
       player.anims.play('evilLeft', true);
       player.setVelocityX(-160);
       happyGame=false;

     }
   }

     // state when player is going to the right (evil and normal)
     else if (cursors.right.isDown) {
       if (avatarIsGood) {
         player.setVelocityX(160);
         player.anims.play('right', true);

     }

     else {
       player.anims.play('evilRight', true);
       player.setVelocityX(160);
       happyGame=false;

     }
   }

    // state when player is still (evil and normal)
     else {
       if (avatarIsGood) {
       player.setVelocityX(0);
       player.anims.play('turn');
       }
       else {
         player.anims.play('evilTurn', true);
         player.setVelocityX(0);
         happyGame=false;

       }
   }

     if (cursors.up.isDown && player.body.touching.down) {
       player.setVelocityY(-300);
     }
   }

   function checkCorrectLetters(player,group,ctx) {
   // What happens when you get all the letters: letter is removed, +1 for the word to complete
     group.destroy();
     correctLetters += 1;

     // if you catch the entire word
     if (correctLetters === lettersDisplay.length) {
       // reset everythaaang
       width = 0;
       score = score + 1;
       correctLetters = 0;
       onScreenScore.setText('score: ' + score);
       onScreenWord.destroy();
       startGame();
     }
   }


   function startGame() {
        // Word to spell out is chosen randomly in the list
        chooseGameState();

        // Displays the word to collect
        onScreenWord = ctx.add.text(370,16,"collect the letters to spell "+chosenWord+"!", { fontSize: '32px', fontFamily: 'Crafty Girls', fill: '#000' });
        responsiveVoice.speak(chosenWord,'UK English Male');

        // Letter objects to collect, word is split into an array, then array used as the key for the group
        // split word
        lettersDisplay = chosenWord.split('');

        // create group where physics will be applied (the letters)
        let group = ctx.physics.add.group();

         // check how many letters in the chosen word
         for (var i = 0; i < lettersDisplay.length; i++) {
           // height they will fall from
           var height = 20;

           // store the letters in the physics group
           var letter = ctx.add.text(width,height,lettersDisplay[i], {fontSize: '55px', fontFamily: 'Crafty Girls', fill: '#000'});
           group.add(letter);

           // space them out
           width += 150;

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

// when the game goes dark: avatar, background and array are affected
function changeBackground() {
  setInterval(function(){
    if (peacefulBackground.alpha > 0) {
      peacefulBackground.alpha = 0;
      avatarIsGood = false;
      happyGame = false;
      chooseGameState();
    }
    else {
      peacefulBackground.alpha = 1;
      avatarIsGood = true;
      happyGame = true;
      chooseGameState();
    }
  },15000);
}

// new array is selected depending on the game state
function chooseGameState() {
  if (happyGame) {
  chosenWord = cute[Math.floor(Math.random()*cute.length)];
}

else {
  chosenWord = dark[Math.floor(Math.random()*dark.length)];
  }
}
