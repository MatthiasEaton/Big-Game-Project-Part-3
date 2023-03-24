const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 600;
const numberOfEnenmies = 50;
let enemiesArray = [];

const dropDown = document.getElementById('enemies');
dropDown.addEventListener('change', function(e){

    let img, w, h = 0;

    if (e.target.value == 'enemy1') {
        img = 'enemy1.png';
        w = 293;
        h = 155;
    } else if (e.target.value == 'enemy2') {
        img = 'enemy2.png';
        w = 266;
        h = 188;
    } else if (e.target.value == 'enemy3') {
        img = 'enemy3.png';
        w = 218;
        h = 177;
    } else {
        img = 'enemy4.png';
        w = 213;
        h = 213;
    }


    enemiesArray = [];
    for (let i = 0; i < numberOfEnenmies; i++) {
        enemiesArray.push(new Enemy(img, w, h));
    }
    
});


let gameFrame = 0;



class Enemy {
    constructor(img, spriteWidth, spriteHeight) {
        //if (!img) throw new Error('Expected image');
        this.image = new Image();
        this.image.src = img;
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
        this.curve = Math.random() * 200;
        
        //enemy 2 below

        // error handling
    
        
        if (this.image.src.endsWith('enemy3.png')) {
            this.angleSpeed = Math.random() * 1.5 + 0.5;
            this.angle = 0;
        } else {
            this.angle = Math.random() * 2;
            this.angleSpeed = Math.random() * 0.2; 
        }
        
    }
    update = () => {
        console.log(this.image.src);
        if (this.image.src.endsWith('enemy1.png')){
            this.x += Math.random() * 5 -2.5;
            this.y += Math.random() * 5 - 2.5
        
            if (gameFrame % this.flapspeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++;
            }
        } else if (this.image.src.endsWith('enemy2.png')) {
            this.x -= this.speed;
            this.y += 3 * Math.sin(this.angle);
            this.angle += this.angleSpeed;
        } else if (this.image.src.endsWith('enemy3.png')) {
            this.x = canvas.width/2 * Math.cos(this.angle * Math.PI/90) + (canvas.width/2 - this.width/2);
            this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/270) + (canvas.height/2 - this.height/2);
            this.angle += this.angleSpeed;
        } else {
            if (gameFrame % this.interval === 0) {
                this.newX = Math.random() * (canvas.width - this.width);
                this.newY = Math.random() * (canvas.height - this.height);
        }}

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20; 
        
        //this.x = 0;
        //this.y = 0;
        
        if (this.x + this.width < 0) this.x = canvas.width;
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
        
    }
    draw = () => {
        if (!this.image.src) return;
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}
for (let i = 0; i < numberOfEnenmies; i++) {
    enemiesArray.push(new Enemy('enemy1.png', 293, 155));
}


function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
