import Player from './player.js';
import InputHandler from './input.js';
import Layer from './background.js';
//import Enemy from './enemy.js';
window.addEventListener('load',function(){
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const BGlayer1 = new Image();
    BGlayer1.src = '1.png';
    const BGlayer2 = new Image();
    BGlayer2.src = '2.png';
    const BGlayer3 = new Image();
    BGlayer3.src = '3.png';
    const BGlayer4 = new Image();
    BGlayer4.src = '4.png';
    const BGlayer5 = new Image();
    BGlayer5.src = '5.png';
    const BGlayer6 = new Image();
    BGlayer6.src = '6.png';
    
    
    let lastTime = 0;
    const player = new Player(canvas.width,canvas.height);
    const input = new InputHandler();
    const layer1 = new Layer(player,BGlayer1,0,canvas.width,canvas.height);
    const layer2 = new Layer(player,BGlayer2,0.1,canvas.width,canvas.height);
    const layer3 = new Layer(player,BGlayer3,0.4,canvas.width,canvas.height);
    const layer4 = new Layer(player,BGlayer4,0.6,canvas.width,canvas.height);
    const layer5 = new Layer(player,BGlayer5,0.8,canvas.width,canvas.height);
    const layer6 = new Layer(player,BGlayer6,1,canvas.width,canvas.height);
    const enemy1 = new Enemy(canvas.width,canvas.height);
    let enemies = [];
    
    let enemyInterval = 2000;
    let enemyTimer = 0;
    function handleEnemies(deltaTime){
        if(enemyTimer > enemyInterval){
            enemies.push(new Enemy(canvas.width,canvas.height));
            enemyTimer = 0;
        }
        else{
            enemyTimer += deltaTime;
        }
        enemies.forEach((enemy) => {
            enemy.draw(ctx,deltaTime);
            enemy.update();
            if(enemy.x < 0 - enemy.width){
                enemy.markedForDeletion = true;
              }
        })
        enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
    }

    const layers = [layer1,layer2,layer3,layer4,layer5,layer6];
    function animate(timeStamp){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        player.update();
         layers.forEach((object) => {
             object.draw(ctx);
             object.update(player.gameSpeed);
        });
        handleEnemies(deltaTime);
        player.draw(ctx,deltaTime);
        player.currentState.handleInput(input.currentKey);
        requestAnimationFrame(animate);
};
    animate(0);
})
