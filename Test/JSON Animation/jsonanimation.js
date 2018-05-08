/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 * https://gist.github.com/838785
 */
if ( !window.requestAnimationFrame ) {
    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

            window.setTimeout( callback, 100 / 60 );

        };

    } )();
}

var canvas = document.getElementById('scene');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var velocityX = -10;
var velocityY = -10;
var gravity = 0;
var w = canvas.width;
var h = canvas.height;
var angle = 3 * Math.PI / 180;
var cx = 200;
var cy = 200;
var radius = 100;
canvas.onclick = myClick;
canvas.addEventListener( "keydown", doKeyDown, true);
function myClick(e) {
   
    // A simpler function:
    mouse = getMouse2(e);
//    alert(e.pageX + ',' + e.pageY);
    
}

function doKeyDown(e) {
window.requestAnimationFrame(redraw);
// get which key the user pressed
    var key = event.which;

    // Let keypress handle displayable characters
    if (key > 46) {
        return;
    }

    switch (key) {
        case 37:
            // left key

            // move the ball 1 left by subtracting 1 from ballX
              window.requestAnimationFrame(redrawreverse);

            

            break;

        case 39:
            // right key

            // move the ball 1 right by adding 1 to ballX
           window.requestAnimationFrame(redraw);

            

            break;

       
    }

  

}

function draw(x, y) {


   
    ctx.save();
	var Sphere = JSON.parse( '{"radius": 40, "colour": "red"}' ); // simmple object
	ctx.beginPath();
	ctx.arc(x,y,Sphere.radius,0,2*Math.PI); // draw the Sphere
	ctx.fillStyle = Sphere['colour']; // what colour?
	ctx.stroke();
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};


var i = 0;
var redraw = function() {
     // increase the angle of rotation
        angle +=  1.9*Math.PI / 180;

        // calculate the new ball.x / ball.y
        
        var newX = cx - radius * Math.cos(angle);
        var newY = cy - radius * Math.sin(angle);
        ctx.clearRect(0, 0, w, h);
        var Orbit = JSON.parse( '{"radius": 110, "colour": "none"}' ); // simmple object
		ctx.beginPath();
		ctx.arc(cx,cy,Orbit.radius,0,2*Math.PI, false); // draw the Orbit
		ctx.fillStyle = Orbit['colour']; // what colour?
        ctx.closePath();
        ctx.stroke();
        // draw
        draw(newX, newY);
// alert(" ~~x"+newX+" ~~y "+newY)
   //window.requestAnimationFrame(redraw);
};

var redrawreverse = function() {
     // increase the angle of rotation
        
 angle +=  1.9*Math.PI / 180;
        // calculate the new ball.x / ball.y
        
        var newX = cx + radius * Math.cos(-angle);
        var newY = cy + radius * Math.sin(-angle);
        ctx.clearRect(0, 0, w, h);
        var Orbit = JSON.parse( '{"radius": 40, "colour": "none"}' ); // simmple object
		ctx.beginPath();
		ctx.arc(cx,cy,Orbit.radius,0,2*Math.PI, false); // draw the Orbit
		ctx.fillStyle = Orbit['colour']; // what colour?
        ctx.closePath();
        ctx.stroke();
        // draw
        draw(newX, newY);
  // alert(""+newX+" ~~y "+newY)
  
   //window.requestAnimationFrame(redraw);
};
window.requestAnimationFrame(redraw);
window.addEventListener("keydown", doKeyDown, true);