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

var orbits=6;
var orbitDias = [20,40,100,225,300,350];
var  = [5,10,12,15,18,12];
//var sphereXoffset =[sphereDias[0]+sphereDias[0],w-orbitDias[i] ,w-orbitDias[i] ,w-orbitDias[i] ,w-orbitDias[i] ,w-orbitDias[i] ];
//var sphereYoffset =[5,10,12,15,18,12];

var sphereColours = ["red","green","yellow","blue","cyan","purple"];

function sphere(radius,color,x,y){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fill();
  // fps= Math.floor((Math.random() * 40 + 1);
    ctx.closePath();
}


function orbitModel(rad, colour)
{
ctx.beginPath();
ctx.arc(w,h,rad,0,2*Math.PI); // draw the Orbit
ctx.fillStyle = colour; // what colour?
ctx.stroke();

}
function draw()
{
  ctx.clearRect(0, 0, w*2, h*2);

var i ;

for(i=0;i<=orbits;i++)
{
   orbitModel(orbitDias[i],"#ff0033");
    newX = w-orbitDias[i]  * Math.cos(angle);
     newY = h + orbitDias[i] * Math.sin(angle);
    sphere(sphereDias[i],sphereColours[i],newX,newY);
    //angle=i * Math.PI / 180;
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

function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);

        // increase the angle of rotation
        angle += 2 * Math.PI / 180;

        // calculate the new ball.x / ball.y
        var newX = cx + radius * Math.cos(angle);
        var newY = cy + radius * Math.sin(angle);
        // draw
        draw(newX, newY);

        // draw the centerpoint 
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        ctx.closePath();

    }, 1000 / fps);
}
animate();

//init();