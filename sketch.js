const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var particles;
var plinkos = [];
var divisions =[];
var particle;
var edges;

var divisionHeight=290;
var score =0;
var count = 0;
var gameState ="start";
var bg;

function preload(){
bg=loadImage("tower.jpg")
}

function setup() {
  createCanvas(600, 650);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 100) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
   
    //
    for (var j = 80; j <=520 ; j = j + 70){
      plinkos.push(new Plinko(j, 75));
    }
    
    for (var j = 40; j <= 580; j = j + 70){
      plinkos.push(new Plinko(j, 150));
    }
  
    for (var j = 75; j <=520 ; j = j + 70){
      plinkos.push(new Plinko(j, 230));
    }
  
    for (var j = 40; j <= 580; j = j + 70){
      plinkos.push(new Plinko(j, 310));
    }
  
}
 
function draw() {
  background(bg);
  
console.log(mouseX);

  textFont("waltography")
  textSize(40);
  stroke(5)
  fill("blue")
  text("Score : "+score,20,40);
  fill("aquamarine");

  textSize(20);
  text("You have 5 chances to increase your score",200,20);
  fill("white");
  
  textSize(35)
  stroke(8)
  text(" 200 ", 15, 400);
  text(" 200 ", 515, 400);
  text(" 800 ", 115, 400);
  text(" 800 ", 415, 400);
  text(" 1000 ", 210, 400);
  text(" 1000 ", 310, 400);

  Engine.update(engine);

  ground.display();
  
  if ( gameState =="end") {
    textSize(90);
    text("GameOver", 100, 220);
    //return
  }

  

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null){
       particle.display();
        
        if (particle.body.position.y>620){
              if (particle.body.position.x < 100 ){
                  score=score+200;      
                  particle=null;

                  if ( count>= 5) gameState ="end";                          
              }
             else if (particle.body.position.x > 100 && particle.body.position.x < 200 ){
                score=score+800;      
                particle=null;

                if ( count>= 5) gameState ="end";                          
            }
            else if (particle.body.position.x > 200 && particle.body.position.x < 400 ){
              score=score+1000;      
              particle=null;

              if ( count>= 5) gameState ="end";                          
          }
          else if (particle.body.position.x > 400 && particle.body.position.x < 500 ){
            score=score+800;      
            particle=null;

            if ( count>= 5) gameState ="end";                          
        }
        else if (particle.body.position.x > 500 && particle.body.position.x < 600 ){
          score=score+200;      
          particle=null;

          if ( count>= 5) gameState ="end";                          
      }
        }
  
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}