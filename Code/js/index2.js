var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width/2;
var h = canvas.height/2;


var angle = 3 * Math.PI / 180;
var cx = canvas.width/2;
var cy = canvas.height/2;
var radius = 40;
var radius2 = 60;
var radius3 = 90;
var radius4 = 120;
var radius5 = 205;
var radius6 = 290;
var radius7 = 360;
var radius8 = 420;

var orbits=1;
var orbitDias = [20,40,60,80,100,120]; 
var sphereDias = [5,10,12,15,18,12]; 
var spherePositionX = [400,200,300,500,550,600];//randomSphereX(),randomSphereX(),randomSphereX(),randomSphereX(),randomSphereX(),randomSphereX()]; 
var spherePositionY = [400,600,350,300,425,355];//randomSphereY(),randomSphereY(),randomSphereY(),randomSphereY(),randomSphereY(),randomSphereY()]; 
var sphereColours = ["red","green","yellow","blue","cyan","purple"];
var rdmove= 0;
var change = -1;
function positiveOrNegative() {
     change = -1 + Math.round(Math.random()) * 2;  
    }
function randomMove() {
    positiveOrNegative();
     rdmove = Math.floor((Math.random()*.5 ) - 1)*change;
   
}
function randomSphereX() {
     rdmove = Math.floor((Math.random()* canvas.width) +0);
   
}
function randomSphereY() {
     rdmove = Math.floor((Math.random()* canvas.height) +0);
   
}
function sphere(radius,color,x,y){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fill()
    ctx.closePath();
}



function orbitModel(rad, colour)
{
ctx.beginPath();
ctx.arc(w,h,rad,0,2*Math.PI); // draw the Orbit ctx.fillStyle = colour; // what colour?
ctx.stroke();

}

var currentRad = 20;
function draw()
{
  ctx.clearRect(0, 0, w*2, h*2);
 for(i=0;i<=orbits;i++)
{
    if(orbitDias[0]>= orbitDias[i])
    
    orbitModel(orbitDias[i]*1.01,"#ff0033");

       if(orbitDias[i]>w)
     orbitDias[i]=20;
    else
       orbitDias[i]=orbitDias[i]*1.01;
    

}


for(i=0;i<=5;i++)
{


    sphere(sphereDias[i],sphereColours[i],spherePositionX[i],spherePositionY[i]);

}
  



};

function keepDrawing() {


    draw(newX, newY);


    setTimeout(keepDrawing, 250)
}

window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var fps = 60;
var newX = cx + radius * Math.cos(angle);
        var newY = cy + radius * Math.sin(angle);

function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);

        // increase the angle of rotation
      //  angle += 1 * Math.PI / 180;

        // calculate the new ball.x / ball.y

        for(i=0;i<=5;i++)
            {         
             randomMove();
        spherePositionX[i]=spherePositionX[i]+(rdmove/2);
    // newX = newX+(rdmove);
     randomMove();

       spherePositionY[i]=spherePositionY[i]+(rdmove/2);
        }
        draw();

        // draw the centerpoint 
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        ctx.closePath();

    }, 1000 / fps);
}
animate();

//init(); 

