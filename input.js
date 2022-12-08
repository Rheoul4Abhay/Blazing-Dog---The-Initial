export default class InputHandler{
    constructor(){
        this.currentKey = '';
        window.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'a':
                this.currentKey = 'PRESS left';
                break;
                case 'd':
                this.currentKey = "PRESS right";
                break;
                case 'w':
                this.currentKey = "PRESS up";
                break;
                case 's':
                this.currentKey = "PRESS down";
                break;
                case ' ':
                this.currentKey = "PRESS spaceBar";
                break;
            }
        })
            window.addEventListener('keyup', (e) => {
                switch(e.key){
                    case 'a':
                    this.currentKey = 'RELEASE left';
                    break;
                    case 'd':
                    this.currentKey = "RELEASE right";
                    break;
                    case 'w':
                    this.currentKey = "RELEASE up";
                    break;
                    case 's':
                    this.currentKey = "RELEASE down";
                    break;
                    case ' ':
                    this.currentKey = "RELEASE spaceBar";
                    break;
                }
        })
    }
}