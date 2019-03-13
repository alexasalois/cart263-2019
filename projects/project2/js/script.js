/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
// var cursors;
// var platforms;
// var avatar;
//
// var config = {
//   type: Phaser.AUTO,
//   width: 1500,
//   height: 800,
//   physics: {
//     default: 'arcade',
//     aracde: {
//       gravity: {y: 300},
//       debug: false
//     }
//   },
//   scene: {
//     preload: preload,
//     create: create,
//     update: update
//   }
// };
//
// var game = new Phaser.Game(config);
//
// function preload() {
//   this.load.image('peacefulBg','assets/images/peaceful.png');
//   this.load.image('darkBg','assets/images/red.png');
//   this.load.spritesheet('avatar','assets/images/avatarSprite.png',{ frameWidth: 32, frameHeight: 48 });
// }
//
// function create() {
//   this.add.image(750, 400, 'peacefulBg');
//
//     platforms = this.physics.add.staticGroup();
//
//     platforms.create(400, 568, 'walk1').setScale(2).refreshBody();
//
//     platforms.create(600, 400, 'walk1');
//     platforms.create(50, 250, 'walk1');
//     platforms.create(750, 220, 'walk1');
//
// ///////////////////////////////////////////////////////////////////////////
//
//     avatar = this.physics.add.sprite(100, 450, 'avatar');
//
//     avatar.setBounce(0.2);
//     avatar.setCollideWorldBounds(true);
//
//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('avatar', { start: 0, end: 3 }),
//         frameRate: 10,
//         repeat: -1
//     });
//
//     this.anims.create({
//         key: 'right',
//         frames: this.anims.generateFrameNumbers('avatar', { start: 4, end: 7 }),
//         frameRate: 10,
//         repeat: -1
//     });
//
//
//
//
//
//
// }
//
// function update() {
//   cursors = this.input.keyboard.createCursorKeys();
//
//   if (cursors.left.isDown)
//   {
//       player.setVelocityX(-160);
//
//       player.anims.play('left', true);
//   }
//   else if (cursors.right.isDown)
//   {
//       player.setVelocityX(160);
//
//       player.anims.play('right', true);
//   }
//   // else
//   // {
//   //     player.setVelocityX(0);
//   //
//   //     player.anims.play('turn');
//   // }
//
//   if (cursors.up.isDown && player.body.touching.down)
//   {
//       player.setVelocityY(-330);
//   }
//
//
//
// }

//import titleScene from 'js/titleScene.js'

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
        update: update
    }
};

 var player;
 var platforms;
 var platform;
 var cursors;
//
var game = new Phaser.Game(config);

function preload () {
   this.load.image('peacefulBg', 'assets/images/peaceful.png');
   this.load.image('platform', 'assets/images/platform.png');
   this.load.spritesheet('player', 'assets/images/avatarSprite.png', { frameWidth: 60, frameHeight: 173 });
 }


function create () {
   this.add.image(750, 300, 'peacefulBg');

   platforms = this.physics.add.staticGroup();

   platforms.create(200, 700, 'platform');//.setScale(2).refreshBody();
//
   platforms.create(1300, 700, 'platform');
   platforms.create(400, 250, 'platform');
   platforms.create(950, 350, 'platform');
//
   player = this.physics.add.sprite(100, 250, 'player');
//
   player.setBounce(0.2);
   player.setCollideWorldBounds(true);
//
   // animation
   this.anims.create({
       key: 'left',
       frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
       frameRate: 10,
       repeat: -1
   });
//
   this.anims.create({
       key: 'turn',
       frames: [ { key: 'player', frame: 4 } ],
       frameRate: 20
   });
//
   this.anims.create({
       key: 'right',
       frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
       frameRate: 10,
       repeat: -1
   });
//
     cursors = this.input.keyboard.createCursorKeys();
//
     this.physics.add.collider(player, platforms);
 }
//
 function update () {
   if (cursors.left.isDown) {
//
       player.setVelocityX(-160);
       player.anims.play('left', true);
     }
//
     else if (cursors.right.isDown) {
//
         player.setVelocityX(160);
         player.anims.play('right', true);
     }
//
     else {
       player.setVelocityX(0);
       player.anims.play('turn');
     }
//
     if (cursors.up.isDown && player.body.touching.down) {
       player.setVelocityY(-600);
     }
   }
