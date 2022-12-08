import { StandingRight,StandingLeft,RunningRight,RunningLeft,SittingRight,SittingLeft,RollingRight,RollingLeft,JumpingRight,JumpingLeft,FallingRight,FallingLeft} from "./state.js";
         
export default class Player{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.groundMargin = 60;
        this.image = document.getElementById('playerImage');
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth/8;
        this.y = this.gameHeight - this.height - this.groundMargin;
        this.state = [new StandingRight(this),new StandingLeft(this),new RunningRight(this),new RunningLeft(this),new SittingRight(this),new SittingLeft(this),new RollingRight(this),new RollingLeft(this),new JumpingRight(this),new JumpingLeft(this),new FallingRight(this),new FallingLeft(this)];
        this.currentState = this.state[0];
        this.frameX = 0;
        this.frameY = 0;
        this.speed = 0;
        this.gameSpeed = 0;
        this.maxSpeed = 10;
        this.maxFrame = 0;
        this.fps = 5;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.vy = 0;
        this.weight = 0;
    }   
    draw(context,deltaTime){
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height);
        if(this.frameTimer > this.frameInterval){
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }
            else{
                this.frameX = 0;
            }
        this.frameTimer = 0;
        }
        else{
            this.frameTimer += deltaTime;
        }
    }    
    setState(state,gameSpeed){
        this.currentState = this.state[state];
        this.gameSpeed = this.maxSpeed * gameSpeed;
        this.currentState.enter();
    }
    update(deltaTime){
     if(this.frameTimer > this.frameInterval/10){
        this.x += this.speed;
        this.y += this.vy;
        if(!this.isGrounded()){
            this.vy += this.weight;
        }
        else {
            this.y = this.gameHeight - this.height - this.groundMargin;
        }
        if(this.x < 0) this.x = 0;
        else if(this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
     }
    else{
        this.frameTimer += deltaTime;
    }
}
    isGrounded(){
        return this.y >= this.gameHeight - this.height - this.groundMargin
    }
}      
