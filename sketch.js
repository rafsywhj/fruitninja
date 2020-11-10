var PLAY = 1; 
var END = 0; 
var gameState = PLAY; 

var swordImg, sword, gameOver; 

var fruit1, fruit2, fruit3, fruit4, fruit, rando, enemy, enemyImg; 
var randx, randSide; 
var randVel = -6; 
var velPlus = 0; 

var cutSound, overSound; 

var score = 0; 

var fruitGroup, enemyGroup; 

function preload(){
  swordImg = loadImage("sword.png"); 
  
  fruit1 = loadImage("fruit1.png"); 
  fruit2 = loadImage("fruit2.png"); 
  fruit3 = loadImage("fruit3.png"); 
  fruit4 = loadImage("fruit4.png"); 
  
  gameOver = loadImage("gameover.png"); 
  
  enemyImg = loadAnimation("alien1.png", "alien2.png"); 
  
  cutSound = loadSound("knifeSwooshSound.mp3"); 
  overSound = loadSound("gameover.mp3"); 
  fruitGroup = new Group(); 
  enemyGroup = new Group(); 
 
}

function fruits() {
  

  if (frameCount%80 === 0) {
    if (score % 5 === 0 && score != 0) {
    velPlus = velPlus + 2; 
  }
    
    rando = Math.round(random(1, 4)); 
    randx = Math.round(random(50, 500)); 
    randSide = Math.round(random(1, 2)); 
    if(randSide === 1) {
     randSide = 650; 
     randVel = -6 - velPlus; 
    }
  
    
    else if (randSide === 2) {
     randSide = -50;
     randVel = 6 + velPlus; 
    }
    
    switch(rando) {
      
      case 1:
        fruit = createSprite(randSide, randx, 20, 20); 
        fruit.addImage("fruit", fruit1); 
        fruit.scale = 0.2; 
        fruit.velocityX = randVel; 
        fruitGroup.add(fruit); 
        break; 
      
      case 2:
        fruit = createSprite(randSide, randx, 20, 20); 
        fruit.addImage("fruit", fruit2); 
        fruit.scale = 0.2; 
        fruit.velocityX = randVel; 
        fruitGroup.add(fruit); 
        break; 
        
      case 3:
        fruit = createSprite(randSide, randx, 20, 20); 
        fruit.addImage("fruit", fruit3); 
        fruit.scale = 0.2; 
        fruit.velocityX = randVel; 
        fruitGroup.add(fruit); 
        break; 
      
      case 4:
        fruit = createSprite(randSide, randx, 20, 20); 
        fruit.addImage("fruit", fruit4); 
        fruit.scale = 0.2; 
        fruit.velocityX = randVel; 
        fruitGroup.add(fruit); 
        break; 
        
      default:
        case 1:
        fruit = createSprite(randSide, randx, 20, 20); 
        fruit.addImage("fruit", fruit2); 
        fruit.scale = 0.2; 
        fruit.velocityX = randVel; 
        fruitGroup.add(fruit); 
        break; 
        
      }
    }
    
  if (sword.isTouching(fruitGroup)) {
      score = score + Math.round(random(1, 5)); 
      fruitGroup.destroyEach(); 
      cutSound.play(); 

    }
  if(sword.isTouching(enemyGroup)) {
     gameState = END; 
     sword.changeImage("game over", gameOver); 
    overSound.play(); 
     sword.scale = 1; 
     enemyGroup.setVelocityXEach(0);
     fruitGroup.setVelocityXEach(0); 
  }
  

}

function enemies() {
  if (frameCount % 100 === 0) {
      enemy = createSprite(650, randx, 20, 20); 
      enemy.addAnimation("alien", enemyImg); 
      enemy.scale = 0.2;
      enemy.velocityX = randVel - velPlus - 2; 
      enemyGroup.add(enemy); 
    if (score % 10 === 0 && score != 0) {
   velPlus = velPlus + 1;  
  }
      
  }
  
} 

function setup() {
  createCanvas(600, 600);
  sword = createSprite(100, 200, 20, 50); 
  sword.addImage("sword", swordImg);  
  sword.addImage("game over", gameOver); 
  sword.scale = 0.4; 
  
}

function draw(){
  background("lightblue");
  text("Score: " + score, 500,20); 
  
  
  if (gameState === PLAY) {
    sword.y = mouseY; 
    sword.x = mouseX; 
    fruits(); 
    enemies(); 
    
  }
  else if (gameState === END) {
    sword.x = 300; 
    sword.y = 300; 
  }
  
  drawSprites(); 
}
