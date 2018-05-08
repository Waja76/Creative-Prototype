var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var angle = 3 * Math.PI / 180;
var cx = canvas.width/2;
var cy = canvas.height/2;
var radius = 40;

ctx.strokeStyle = "black";

function draw(x, y) {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    var Sphere = JSON.parse( '{"radius": 40, "colour": "red"}' ); // simmple object
    ctx.beginPath();
    ctx.arc(x,y,Sphere.radius,0,2*Math.PI); // draw the Sphere
    ctx.fillStyle = Sphere['colour']; // what colour?
    ctx.fill();
    ctx.restore();
};

//keepDrawing();

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
        angle += 3 * Math.PI / 180;

        // calculate the new ball.x / ball.y
        var newX = cx + radius * Math.cos(angle);
        var newY = cy + radius * Math.sin(angle);
        // draw
        draw(newX, newY);

        // draw the centerpoint 
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.stroke();

    }, 1000 / fps);
}
animate();