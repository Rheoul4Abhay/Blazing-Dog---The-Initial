export default class Layer {
  constructor(player,image, speedModifier, gameWidth, gameHeight) {
    this.player = player;
    this.gameSpeed = this.player.gameSpeed;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.width = this.gameWidth;
    this.height = this.gameHeight;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.gameSpeed * this.speedModifier;
    this.x2 = this.width;
  }
  draw(context) {
    context.drawImage(this.image,this.x,this.y,this.width,this.height);
    context.drawImage(this.image,this.x2,this.y,this.width,this.height);
  }
  update(gameSpeed){
    this.speed = gameSpeed * this.speedModifier;
    this.x -= this.speed;
    this.x2 -= this.speed;
    if(this.x <= -this.width) this.x = this.width - this.speed +  this.x2;
    else if(this.x2 <= -this.width) this.x2 = this.width - this.speed + this.x;
  }
}
