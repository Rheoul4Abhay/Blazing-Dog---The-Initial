export default class Enemy {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.groundMargin = 83;
    this.image = document.getElementById("enemy1");
    this.width = 160;
    this.height = 119;
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height - this.groundMargin;
    this.frameX = 0;
    this.speedX = 10;
    this.maxFrame = 5;
    this.fps = 10;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps;
    this.markedForDeletion = false;
  }
  draw(context,deltaTime) {
    if(this.frameTimer > this.frameInterval){
      if(this.frameX >= this.maxFrame){
        this.frameX = 0;
      }
      else{
        this.frameX ++;
      }
      this.frameTimer = 0;
    }
    else{
      this.frameTimer += deltaTime;
    }
    context.drawImage(this.image,this.frameX * this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
  }
  update() {
    this.x -= this.speedX;
  }
}
