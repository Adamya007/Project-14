var sword,fruit ,alien,fruitGroup,enemyGroup, score,a,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, alienImage, gameOverImage
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  
  swordImage = loadImage("sword.png");
  alienImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}

function setup() {
  createCanvas(600, 600);
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  sword.setCollider("rectangle",0,0,40,40);
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw() {
  background("lightgreen");
  
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+5;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
      
        sword.addImage(gameOverImage);
        sword.x=300;
        sword.y=220; 
  }
  }
  }
  text("Score : "+ score,350,30);
  drawSprites();
}


function Enemy(){
  if(World.frameCount%200===0){
    alien=createSprite(400,200,20,20);
    alien.addAnimation("moving", alienImage);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-8;
    alien.setLifetime=50;
    
    enemyGroup.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
     a=Math.round(random(1,4));
    if (a == 1) {
      fruit.addImage(fruit1);
    } else if (a == 2) {
      fruit.addImage(fruit2);
    } else if (a == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}