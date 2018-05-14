// Allows the canvas to be drawn on the page
var canvas = document.getElementById("myCanvas");
// makes the canvas only draw in 2D 
var ctx = canvas.getContext("2d");
// variables for center point from width and hieght of the canvas
var w = canvas.width/2;
var h = canvas.height/2;

// array of variables for the size's of Oribit Radius
var oribitRad = [60,120,180,240,300,360];
// array of variables for the sizes and amount of students
var sphereDias = [18,18,18,18,18,18,18,18,18,18,18];
// array of variables for the X & Y positions for the Sphere
var spherePositionX = [400,200,300,500,550,600,200,300,500,550,600];
var spherePositionY = [400,600,350,300,425,355,600,350,300,425,355];
// array of variables for the colour of the spheres
var sphereColours = ["red","green","yellow","blue","cyan","purple", "burlywood", "teal", "darkgoldenrod", "deeppink","lightblue"];
// array of variables for the names of the students
var studentNames = ["John Readie","Geof Green","Mike Yelovski","Rebecca Blue","Janet Teale","Fred Pope", "Chris Wood", "Janet Teale", "Paul Gold", "Dave Axelrod","Lynne Sky"];
// variable for random move distance
var rdmove= 0;
// variable to enable random number to ranomly apply positve or negative when implimented in coordinte change
var change = -1;

// variables for setting the position of the students and the number of students ranomly created when findstudents is clicked
var randomX=0;
var randomY=0;
var noOfStudents=0;

// variable used as flag (0 or 1) to allow animate function to use correct option when bring together button has been clicked
var together =0;

// function used to set each student at a random position in the canvas when first added
function randomStartPostion() {
   // 
     randomX = Math.random()*canvas.width ;
      randomY = Math.random()*canvas.height ;
}
// function creates randomly a poistive or negative value randomly used to affect the direction of a sphere move
function positiveOrNegative() {
     change = -1 + Math.round(Math.random()) * 2;  
    }
    // function sets the random move variable to be applied in the annimation for each sphere, also applies the positive/negative value to allow for 360 movement
function randomMove() {
    positiveOrNegative();
     rdmove = Math.floor((Math.random()*.5 ) - 1)*change;
   
}

// function draws an sphere to represent each randomly selected student in the position calculated and uses the same colour as associated with its student button
function sphere(radius,color,x,y)
{
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fill()
    ctx.closePath();
}
// function removes all student from canvas before populating a new collection
function removeStudents()
{
        for(i=1;i<=noOfStudents;i++)
    {
       removeElement("student"+i);
    }
}
// function changes button text when pressed and sets the together value to enable the correct movement when animating, 1 will make each student gather to the center and 0 will change to disperse students once pressed
function bringTogetherBtn(btn)
{
    //
    if(together==0)
    {
        // 
         btn.value="Disperse Students";
        together=1;
    }
    //
    else
    {
        // 
         btn.value="Come to Center";
         together=0;
    }
}
// function locates the named button and removes from document
function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}
// function removes then all then randomly adds a new student array on the canvas students
function ClearAndRefreshDocument()
{
    removeStudents();
     findStudentsFunction();
}
// function makes it when an alert pops up it will display an messege saying hello to the student you have selected
function keyup(studentNane)
{
   alert("Say Hi To: "+studentNane );
}
// function makes a button that when you press will show you the students on campus 
function findStudentsFunction() {

    //
    noOfStudents=Math.floor((Math.random()* 10) +0);
    for(i=1;i<=noOfStudents;i++)
    {
        //sets the x & y poistions randomly
        randomStartPostion();
        spherePositionX[i-1]=randomX;
       
        spherePositionY[i-1]=randomY;

        // creates an button
         var btn = document.createElement("BUTTON" );
         // names the button so as to allow for findobject to be implimented on click
         btn.id="student"+i;
       
        // sets the student name to the button 
         var t = document.createTextNode(studentNames[i-1]);
         btn.appendChild(t);
         // creates a click event on the button to return a messege when clicked
         btn.onclick= function(){              
             alert("Say Hi To: "+this.textContent ); 
        };     

        // adds an div for the buttons to be stacked
        var d=document.createElement("div");
        d.appendChild(btn);
        // adds button to document
        document.body.appendChild(d);
    }
}

// draws the orbit on the canvas
function orbitModel(rad)
{
ctx.beginPath();
ctx.arc(w,h,rad,0,2*Math.PI); 
ctx.stroke();

}
// draws the cross hairs in center of canvas
function crossHairs()
{
ctx.beginPath();
ctx.moveTo(w, h- oribitRad[5]);
ctx.lineTo(w,h+oribitRad[5]);
ctx.moveTo(w- oribitRad[5],h);
ctx.lineTo(w+oribitRad[5],h);
ctx.stroke();
}

// this function draws all of the objects on the canvas and clears the canvas
function draw()
{
  // clears the canvas
  ctx.clearRect(0, 0, w*2, h*2);
  // draws the cross hairs
crossHairs();
// draws the center sphere
sphere(20, "orange",w,h);
// itterates the number of orbits and draws the new orbit
 for(i=0;i<=oribitRad.length;i++)
{
    // draws the orbit
    orbitModel(oribitRad[i]);

}

// itterates through the number of students and draws an appropatly refenced sphere based on the student identity
for(i=1;i<=noOfStudents;i++)
{
  // calls the draw sphere function and sets the diamitar colour and position
    sphere(sphereDias[i-1],sphereColours[i-1],spherePositionX[i-1],spherePositionY[i-1]);

}

// draws static text on the canvas
  
ctx.beginPath();
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Kirkham Building",50,100);
ctx.closePath();

ctx.beginPath();
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Media Factory",50,900);
ctx.closePath();

ctx.beginPath();
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("C&T Building",800,100);
ctx.closePath();

ctx.beginPath();
ctx.font = "30px Arial";
ctx.fillStyle = "black";
ctx.fillText("Car Park",800,900);
ctx.closePath();


};

// implemts a timer and continues loop for re drawing brackets animating the canvas
function keepDrawing() {

    // re draws the canvas
    draw(newX, newY);

    // timer setting
    setTimeout(keepDrawing, 250)
}

// enables the animation to run
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();


// this sets the frames per second of the animation
var fps = 60;
// variables for holding the randomly created new x and y positions for the spheres
var newX = w;
var newY = h;

// this animates the canvas
function animate() {
    setTimeout(function () {
        requestAnimationFrame(animate);

        // loops through the number of students
        for(i=1;i<=noOfStudents;i++)
        {       
                // detects wether or not the students have been called together if 0 creates an random repostioning of the sphere
                if(together==0)
                {
                    randomMove();
                    spherePositionX[i-1]=spherePositionX[i-1]+(rdmove/2);
                    // 
                    randomMove();
                    spherePositionY[i-1]=spherePositionY[i-1]+(rdmove/2);
                }
                // if 1 creates coridinates dirrecting each sphere back to the center in a stright line
                else
                {
                    // this detects weather or not an indvisual sphere has reeched the center point
                    if(spherePositionX[i-1]==500 & spherePositionY[i-1]==500 )
                    {
                          spherePositionX[i-1]=500 ;
                          spherePositionY[i-1]=500 ;
                    }
                    // if it hasnt calculate its next move towards the center
                    else
                    {
                        spherePositionX[i-1]= spherePositionX[i-1]+(500 - spherePositionX[i-1])/100;
                          spherePositionY[i-1]=spherePositionY[i-1]+(500 - spherePositionY[i-1])/100;
                    }
                }
        }
        draw();

        // draws the centerpoint 
        ctx.beginPath();
        ctx.arc(w,h, radius, 0, Math.PI * 2, false);
        ctx.closePath();

    // this divides the canvas by the fps
    }, 1000 / fps);
}
animate();
// Refrences Used
//W3 Schools
//Stack Overflow
//Code Pen
// Here are a few examples of pecfic things I have used
// Javascript Array Items Count: https://www.w3schools.com/jsref/jsref_length_array.asp
//Adding user input to a list of text items on a html page: https://stackoverflow.com/questions/19908215/adding-user-input-to-a-list-of-text-items-on-a-html-page
//CSS pointer-events Property: https://www.w3schools.com/cssref/css3_pr_pointer-events.asp
//Animation Reserch: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations