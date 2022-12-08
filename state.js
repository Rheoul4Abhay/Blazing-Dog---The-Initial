export const states = {
  STANDING_RIGHT: 0,
  STANDING_LEFT: 1,
  RUNNING_RIGHT: 2,
  RUNNING_LEFT: 3,
  SITTING_RIGHT: 4,
  SITTING_LEFT: 5,
  ROLLING_RIGHT: 6,
  ROLLING_LEFT: 7,
  JUMPING_RIGHT: 8,
  JUMPING_LEFT: 9,
  FALLING_RIGHT: 10,
  FALLING_LEFT: 11,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class StandingRight extends State {
  constructor(player) {
    super("STANDING RIGHT");
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 6;
    this.player.speed = 0;
    this.player.frameY = 0;
  }
  handleInput(input) {
    if(input === 'PRESS left') this.player.setState(states.RUNNING_LEFT,1);
    if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT,1);
    if(input === "PRESS down") this.player.setState(states.SITTING_RIGHT,0);
    if(input === "PRESS spaceBar") this.player.setState(states.JUMPING_RIGHT,0.5);
  }
}

export class StandingLeft extends State {
  constructor(player) {
    super("STANDING LEFT");
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 6;
    this.player.speed = 0;
    this.player.frameY = 1;
  }
  handleInput(input) {
    if(input === 'PRESS right') this.player.setState(states.RUNNING_RIGHT,1);
    if(input === "PRESS left") this.player.setState(states.RUNNING_LEFT,1);
    if(input === "PRESS down") this.player.setState(states.SITTING_LEFT,0);
    if(input === "PRESS spaceBar") this.player.setState(states.JUMPING_LEFT,0.5)
  }
}

export class RunningRight extends State{
  constructor(player){
    super('RUNNING RIGHT');
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 8;
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
  }
  handleInput(input){
    if(input === "PRESS down") this.player.setState(states.SITTING_RIGHT,0)
    if(input === 'PRESS left') this.player.setState(states.STANDING_LEFT,0);
    if(input === "RELEASE right") this.player.setState(states.STANDING_RIGHT,0);
    if(input === 'PRESS spaceBar') this.player.setState(states.JUMPING_RIGHT,0.5);
  }
}

export class RunningLeft extends State{
  constructor(player){
    super('RUNNING LEFT');
    this.player = player;
  }
  enter() {
    this.player.maxFrame = 8;
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
  }
  handleInput(input){
    if(input === "PRESS down") this.player.setState(states.SITTING_LEFT,0)
    if(input === 'PRESS right') this.player.setState(states.STANDING_RIGHT,0);
    if(input === 'RELEASE left') this.player.setState(states.STANDING_LEFT,0);
    if(input === "PRESS spaceBar") this.player.setState(states.JUMPING_LEFT,0.5)
  }
}

export class SittingRight extends State{
  constructor(player){
    super('SITTING RIGHT');
    this.player = player;
  }
  enter(){
    this.player.speed = 0;
    this.player.frameY = 8;
    this.player.maxFrame = 4;
  }
  handleInput(input){
    if(input === 'RELEASE down') this.player.setState(states.STANDING_RIGHT,0);
    if(input === 'PRESS right') this.player.setState(states.STANDING_LEFT,0);
  }
}

export class SittingLeft extends State{
  constructor(player){
    super('SITTING LEFT');
    this.player = player;
  }
  enter(){
    this.player.speed = 0;
    this.player.frameY = 9;
    this.player.maxFrame = 4;
  }
  handleInput(input){
    if(input === 'RELEASE down') this.player.setState(states.STANDING_LEFT,0);
    if(input === 'PRESS right') this.player.setState(states.STANDING_RIGHT,0);
  }
}

export class RollingRight extends State{
  constructor(player){
    super('ROLLING RIGHT')
    this.player = player;
  }
  enter(){
    this.player.frameY = 10;
    this.player.maxFrame = 6;
    this.player.weight = 4;
    this.player.speed = this.player.maxSpeed/3;
  }
  handleInput(input){
    if(this.player.isGrounded()) this.player.setState(states.STANDING_RIGHT,0);
  }
}

export class RollingLeft extends State{
  constructor(player){
    super('ROLLING LEFT')
    this.player = player;
  }
  enter(){
    this.player.frameY = 11;
    this.player.maxFrame = 6;
    this.player.weight = 4;
    this.player.speed = -this.player.maxSpeed/3;
  }
  handleInput(input){
   if(this.player.isGrounded()) this.player.setState(states.STANDING_LEFT,0)
  }
}

export class JumpingRight extends State{
  constructor(player){
    super('JUMPING RIGHT');
    this.player = player;
  }
  enter(){
    this.player.weight = 1;
    this.player.frameY = 2;
    this.player.vy = -20;
    this.player.speed = this.player.maxSpeed/2;
  }
  handleInput(input){
    if(input === "PRESS left") this.player.setState(states.FALLING_LEFT,0.5);
    if(this.player.isGrounded()) this.player.setState(states.STANDING_RIGHT,0);
    if(!this.player.isGrounded() && this.player.vy === 0) this.player.setState(states.FALLING_RIGHT,0.5);
    if(!this.player.isGrounded() && input === "PRESS down") this.player.setState(states.ROLLING_RIGHT,1);
  }
}

export class JumpingLeft extends State{
  constructor(player){
    super('JUMPING LEFT');
    this.player = player;
  }
  enter(){
    this.player.weight = 1;
    this.player.frameY = 3;
    this.player.vy = -20;
    this.player.speed = -this.player.maxSpeed/2;
  }
  handleInput(input){
    if(input === "PRESS right") this.player.setState(states.FALLING_RIGHT,1);
    if(this.player.isGrounded()) this.player.setState(states.STANDING_LEFT,0);
    if(!this.player.isGrounded() && this.player.vy == 0) this.player.setState(states.FALLING_LEFT,0.5);
    if(!this.player.isGrounded() && input === "PRESS down") this.player.setState(states.ROLLING_LEFT,1);
  }
}

export class FallingRight extends State{
  constructor(player){
    super('FALLING RIGHT');
    this.player = player;
  }
  enter(){
    this.player.speed = this.player.maxSpeed/2;
    this.player.frameY = 4;
    this.player.maxFrame = 6;
  }
  handleInput(input){
    if(input === "PRESS left") this.player.setState(states.FALLING_LEFT,0.5);
    if(this.player.isGrounded()) this.player.setState(states.STANDING_RIGHT,0);
    if(!this.player.isGrounded() && input === "PRESS down") this.player.setState(states.ROLLING_RIGHT,1);
  }
}

export class FallingLeft extends State{
  constructor(player){
    super('FALLING LEFT');
    this.player = player;
  }
  enter(){
    this.player.speed = -this.player.maxSpeed/2;
    this.player.frameY = 5;
    this.player.maxFrame = 6;
  }
  handleInput(input){
    if(input === "PRESS right") this.player.setState(states.FALLING_RIGHT,0.5);
    if(this.player.isGrounded()) this.player.setState(states.STANDING_LEFT,0);
    if(!this.player.isGrounded() && input === "PRESS down") this.player.setState(states.ROLLING_LEFT,1);
  }
}
