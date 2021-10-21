var PLAY=1, END=0;
var gameState=PLAY;
var bground, backgroundImg;
var spaceCraft, spaceCraftImg;
var bullets, bulletsImg, bulletsGroup, specialBullets, specialBulletsImg;
var alien, alienImg, enemyGroup;
var gameOverImg, gameOverSound; 
var shoot;
function preload(){
  backgroundImg=loadImage("Images/spacebg.png");
  spaceCraftImg=loadImage("Images/spacecraft.png");
  bulletsImg=loadImage("Images/Pinkbullet.png");
  specialBulletsImg=loadImage("Images/Specialbullet.png");
  alienImg=loadImage("Images/alien.png");
  gameOverImg=loadImage("Images/GameOver.png");
  gameOverSound=loadSound("Images/gameOverSound.wav");

}
function setup() {
  createCanvas(1400,600);
  bground=createSprite(1400,300,0,0);
  bground.addImage(backgroundImg);
  bground.scale=2;
  bground.velocityX= -4;
  bground.x=bground.width/100;
  

  spaceCraft=createSprite(100, 300, 50, 50);
  spaceCraft.addImage(spaceCraftImg);
  spaceCraft.scale= 0.5;

  enemyGroup=createGroup();
  bulletsGroup=createGroup();

  
}

function draw() {
  background("white");

  if(bground.x<510){
    bground.x=bground.width/2;
  }

  //console.log(bground.x);

  if(gameState===PLAY){

    spawnObstracles();
    shoot=createImg("Images/shootButton.png");
  shoot.size(50,50);
  shoot.position(1300,100);
  shoot.mousePressed(BulletShoot);
     

  if(keyDown(UP_ARROW)){
    spaceCraft.y=spaceCraft.y-10;
  }
  if(keyDown(DOWN_ARROW)){
    spaceCraft.y=spaceCraft.y+10;
  }

  if(enemyGroup.isTouching(bulletsGroup)){
    enemyGroup.destroyEach();
    bulletsGroup.destroyEach();
  }
  
    if(spaceCraft.isTouching(enemyGroup)){
      gameState=END;
      
    }

  }
  else if(gameState===END){
    enemyGroup.destroyEach();
    spaceCraft.x=width/2;
    spaceCraft.y=height/2;
    spaceCraft.addImage(gameOverImg);
    spaceCraft.scale=1.5;
    //gameOverSound.play();
  }
  drawSprites();
   
  
}

function spawnObstracles(){
  if(frameCount%60===0){
  var x= random(500,1200);
  var y= random(50, 550);
  alien=createSprite(x, y, 50, 50);
  alien.addImage(alienImg);
  alien.scale=0.4;
  alien.velocityX= -10;
  enemyGroup.add(alien);
  }
}

function BulletShoot(){
  var bullets;
  bullets=createSprite(spaceCraft.x, spaceCraft.y,10,10);
  bullets.addImage(bulletsImg);
  bullets.velocityX=7;
  bulletsGroup.add(bullets);
}