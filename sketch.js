var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var topObstacleGroup, bottomObstacleGroup,bargroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restartimg,restart
var gameOver,gameOverimg
var score=0
var jump, die

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
restartimg = loadImage("assets/restart.png")
gameOverimg= loadImage("assets/gameOver.png")
jump=loadSound("assets/jump.mp3");
die=loadSound("assets/die.mp3")
}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

topObstacleGroup= new Group();
bottomObstacleGroup =new Group();
bargroup= new Group();

restart= createSprite(220,240);
restart.addImage(restartimg);
restart.scale=0.5;
restart.visible = false;

gameOver= createSprite(220,200);
gameOver.addImage(gameOverimg);
gameOver.scale=0.5;
gameOver.visible = false;
}

function draw() {
  
  background("black");
        
  if(gameState === PLAY){
   //making the hot air balloon jump
   if(keyDown("space")) {
    balloon.velocityY = -6 ;
    jump.play()
  }          
  //adding gravity
  balloon.velocityY = balloon.velocityY + 1;

  Bar();
  spawnObstaclesTop();
  spawnObstaclesBottom();
  
  //condition for end state
  if(topObstacleGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround) || bottomObstacleGroup.isTouching(balloon)){
    gameState = END;
    die.play()
  }

  }

  if(gameState === END){
 gameOver.visible = true;
 gameOver.depth= gameOver.depth + 1;
 restart.visible = true;
 restart.depth= restart.depth + 1;

 balloon.velocityY=0;
 balloon.velocityX=0;
 



 topObstacleGroup.setVelocityXEach(0);
 bottomObstacleGroup.setVelocityXEach(0);
 bargroup.setVelocityXEach(0);

 topObstacleGroup.setLifetimeEach(-1);
 bottomObstacleGroup.setLifetimeEach(-1);
 
 balloon.y=200;
 
 if(mousePressedOver(restart)){
  reset();
 }
  }
  drawSprites();
  scoreadd();
  //spawning top obstacles
     
      
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   topObstacleGroup.add(obstacleTop);
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          bargroup.add(bar);
         }
}

function spawnObstaclesBottom() {
  if(World.frameCount % 60 === 0) {
    obstacleBottom = createSprite(400,350,40,50);

//obstacleTop.addImage(obsTop1);

obstacleBottom.scale = 0.1;
obstacleBottom.velocityX = -4;

//random y positions for top obstacles


//generate random top obstacles
var rand = Math.round(random(1,3));
switch(rand) {
  case 1: obstacleBottom.addImage(obsBottom1);
          break;
  case 2: obstacleBottom.addImage(obsBottom2);
          break;
  case 3: obstacleBottom.addImage(obsBottom3);
          break;
  default: break;
}

 //assign lifetime to the variable
obstacleBottom.lifetime = 100;

balloon.depth = balloon.depth + 1;
bottomObstacleGroup.add(obstacleBottom);

  }
}
function reset(){
  gameState=PLAY  
  gameOver.visible=false;
  restart.visible=false;
  topObstacleGroup.destroyEach();
  bottomObstacleGroup.destroyEach();
  score = 0
}
  
function scoreadd(){
  if(balloon.isTouching(bargroup)){
    score = score + 1;
  }
  textSize(30);
  fill("blue");
  text("score:" + score, 20,30)
}