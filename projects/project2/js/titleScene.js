class titleScene extends Phaser.scene {
  constructor() {
    super({
      key: 'titleScene'
    });
  }

preload () {
  this.load.image("peacefulBg", "assets/images/peaceful.png");
  }

create () {
  let background= this.add.sprite(750,350,"peacefulBg");
  let mainTitle= this.add.text(100,100,"Click anywhere to start.");
  }
}

export default titleScene;
