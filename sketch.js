var girl, girl_run1, bg_img, bg;
var egg, flour, sugar, eggImg, flourImg, sugarImg, eggG, flourG, sugarG;
var obstacle, obstacle1Img, obstacle2Img, obstacleG;
var START = 0
var PLAY = 1;
var END = 2;
var WIN = 3;

var cakeWin, cakeImg;

var music;

var resetImg, restart;

var invisibleGround;

var gameState = START;

var eggPoints = 0;
var flourPoints = 0;
var sugarPoints = 0;

function preload(){

girl_run1 = loadImage("1.png");

bg_img = loadImage("bg2.jpg");

eggImg = loadImage("egg.png");
flourImg = loadImage("flour.png");
sugarImg = loadImage("sugar.png");

cakeImg = loadImage("cake.png")

obstacle1Img = loadImage("stone1.png");
obstacle2Img = loadImage("obs2.png");

resetImg = loadImage("reset.png");

music = loadSound("music.mp3");

}

function setup() {
  
  createCanvas(600, 600);

  bg = createSprite(450, 300, 50, 50);
  bg.addImage("bg", bg_img);
  bg.scale = 0.4

  restart = createSprite(300, 340);
  restart.addImage(resetImg);
  restart.scale = 0.04;
    
  girl = createSprite(50, 540);
  girl.addAnimation("run", girl_run1);
  girl.scale = 0.1

  invisibleGround = createSprite(300, 555, 600, 20);
  invisibleGround.visible = false;

  eggG = new Group();
  flourG = new Group();
  sugarG = new Group();
  obstacleG = new Group();

  music.loop();

  ///girl.debug = true;

  girl.setCollider("circle", 0, 0, 400)



}


function draw() {
    
  background("white");

  //console.log(getFrameRate());

  if(gameState == START && keyWentDown("s")){
    gameState = PLAY;
  }

  if(gameState == PLAY){

    bg.velocityX = -5;

  if(bg.x < 60){
      bg.x = width/2;

    }

  if(keyDown("space") && girl.y > 480){
      girl.velocityY = -18
    }

    girl.velocityY += 0.8

  if(frameCount % 50 === 0){
      
      var rand = Math.round(random(1,3));

      spawnObstacles();

      switch(rand){
      
        case 1: spawnEgg();
                break;
        
        case 2 : spawnFlour();
                break;
        
        case 3: spawnSugar();
                break;
      
        default : break;

      }

    }

  if(eggG.isTouching(girl)){
    eggG.destroyEach();
    eggPoints += 1;
  }

  if(flourG.isTouching(girl)){
    flourG.destroyEach();
    flourPoints += 1;
  }

  if(sugarG.isTouching(girl)){
    sugarG.destroyEach();
    sugarPoints += 1;
  }

  if(frameCount % 110 === 0){
    spawnObstacles();

  }

  if(obstacleG.isTouching(girl)){
    gameState = END;
    console.log("endd")
  }

  if(sugarPoints === 3 && flourPoints === 3 && eggPoints === 2){
    gameState = WIN;
  }
  }

  girl.collide(invisibleGround);

  drawSprites();

if(gameState == START){
  textSize(18);
  fill("black")

  
  text("Crazy Cooking!", 223, 220)
  text("Press s to play!", 220, 270);
  text("How to play: collect materials to make the cake!", 90, 320);
  text("But, avoid the bugs and rocks!", 170, 370);

  restart.visible = false;

}

if(gameState === END){
  
  restart.visible = true;
  girl.collide(invisibleGround);
  
  bg.velocityX = 0;
  
  sugarG.destroyEach();
  flourG.destroyEach();
  eggG.destroyEach();
  obstacleG.destroyEach();

  obstacleG.velocityX = 0;

  girl.velocityY = 0;

  textSize(18);
  fill("black")
  text("Oops, you lost! Press the button to restart", 150, 300);
  
  
  if(mousePressedOver(restart)){
    reset();
  }
  
}

if(gameState === WIN){
  
  textSize(18);
  fill("black");
  text("You win! Here is your cake!", 200, 300);

  cakeWin = createSprite(300, 370);
  cakeWin.addImage("cake", cakeImg);
  cakeWin.scale = 0.1

  bg.velocityX = 0;

  obstacleG.destroyEach();
  eggG.destroyEach();
  flourG.destroyEach();
  sugarG.destroyEach();

}

textSize(18);
fill("black")

if(eggPoints === 2){
 
  eggG.visible = false;
  eggG.destroyEach();

}

text("Eggs: " +eggPoints +"/2", 10, 30);

if(flourPoints === 3){
  
  flourG.visible = false;
  flourG.destroyEach();

}

text("Flour: " +flourPoints +"/3", 230, 30);

if(sugarPoints === 3){
  
  sugarG.visible = false;
  sugarG.destroyEach();
  
 
}

text("Sugar: " +sugarPoints +"/3", 500, 30);

}

function spawnEgg(){
 
  if(frameCount % 50 === 0){
    
    egg = createSprite(Math.round(random(300, 500)), 500);
    egg.addImage(eggImg);
    egg.scale = 0.02;
    egg.velocityX = -5
    egg.lifetime = 300;

    eggG.add(egg);
 
  }
}

function spawnFlour(){

  if(frameCount % 50 === 0){

    flour = createSprite(Math.round(random(300, 500)), 500);
    flour.addImage(flourImg);
    flour.scale = 0.1
    flour.velocityX = -5
    flour.lifetime = 300;

    flourG.add(flour); 

  }
}

function spawnSugar(){

  if(frameCount % 50 === 0){

    sugar = createSprite(Math.round(random(300, 400)), 500);
    sugar.addImage(sugarImg);
    sugar.scale = 0.1;
    sugar.velocityX = -5;
    sugar.lifetime = 300;

    sugarG.add(sugar);

  }
}

function spawnObstacles(){

  if(frameCount % 60 === 0){
    
    obstacle = createSprite(Math.round(random(400, 500)), 540);
    
    var rand2 = Math.round(random(1,2));

    switch(rand2){

      case 1: obstacle.addImage(obstacle1Img);
      obstacle.scale = 0.13;
      obstacle.velocityX = -5;
              break;

      case 2: obstacle.addImage(obstacle2Img);
      obstacle.scale = 0.13;
      obstacle.velocityX = -5   
              break;
            
      default : break;
    }

    obstacleG.add(obstacle);
    
  }

  }

function reset(){
  
  gameState = START;

  eggPoints = 0;
  flourPoints = 0;
  sugarPoints = 0;

}