var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');                                                                      //canvas context


var canvasW = canvas.width = window.innerWidth;                                                                      //Let's declare the variables we'll be using
var canvasH = canvas.height = (window.innerHeight) / 2;                                                                      //Canvas width  and height as canvasW and canvasH


var canvasRect = canvas.getBoundingClientRect();                                                        //Get canvas rectangle details
var canvasX = canvasRect.left;
var canvasY = canvasRect.top;

var diceX = (canvasW - 250) / 2;                                                                                //position of first die, set relative to the canvas top left x and y coordinates
var diceY = (canvasH - 100) / 2;

var diceW = 100;
var diceH = 100;

var dotR = 6;                                                                                         //radius of a dot in the die

var dx;
var dy;

var firstThrow = true;                                                                                  //Set variable firstThrow to true, for everytime player enters a first Throw
var point;

var stageEl = document.getElementById('stageEl');
var pointsEl = document.getElementById('pointsEl');
var outcomeEl = document.getElementById('outcomeEl');

function getDice() {                                                                                    //The get dice function, reponds when the button throw dice is clicked

    loadFace();
    setTimeout(clearCanvas, 1900);                                                                      //After 1.9 secs, call the clearCanvas function
    setTimeout(loadDice, 2000);                                                                        //2 secs after the getDice func is called, call the loadDice func
}

function loadFace() {                                                                                   //This func will show that the dice faces are loading by indical=ting Rolling.. Rolling..
    ctx.clearRect(canvasX, canvasY, canvasW, canvasH);                                                  //First we clear a rectangle in preparation
    ctx.font = "20px Arial";                                                                            //Set the font size and style of the text Rolling text
    ctx.fillStyle = "black";                                                                            //Set the color of the text rolling
    ctx.textAlign = "center"                                                                            //Align the text relative to the position provided
    ctx.fillText("Rolling.. Rolling..", canvasW / 2, canvasH / 2);                                          //Enter the text to be shown and the length it covers on the canvas
}

function clearCanvas() {
    ctx.clearRect(0,0,canvasW,canvasH);                                                                 //Clear the canvas
}



function loadDice() {                                                                                   //LOad dice will get the dice to appear on the canvas


    sum = 0;                                                                                            //DEclare the sum, which will be adding the dice face numbers to get points

    var firstNumber = 1 + Math.floor(Math.random()*6);                                                  //Get a random number for the display of dice

    sum += firstNumber;                                                                                  //Add to the sum the first number on the first die face

    var firstDieX = diceX;                                                                              //Set the X coordinate of the first die's top-left corner
    var firstDieY = diceY;                                                                              //Set the Y coordinate to pair with x above
    drawFace(firstNumber, firstDieX, firstDieY);                                                        //Call the drawFace func to draw the face with the number of dots and x, y values



    secondDieX = firstDieX + 150;                                                                       //Set up the x and Y coordinates of the second die to be called using the drawFac function
    secondDieY = firstDieY;
    var secondNumber = 1 + Math.floor(Math.random()*6);
    sum += secondNumber;                                                                                //Add to sum the value of the second die face
    drawFace(secondNumber, secondDieX, secondDieY);


    if (firstThrow) {                                                                                    //Check if the tfirstThrow is true, meaning a first throw is needed to proceed
        switch(sum) {                                                                                   //If throw is needed, check the sum of the two dice faces
            case 7:
            case 11:
                outcomeEL.value="You win!";
                break;                                                                                  //If sum is 7 or 11, then player has won game and the loop will break out
            case 2:
            case 3:
            case 12:
                outcomeEl.value="You lose!";
                break;                                                                                  //If the sum is 2, 3, or 12 then the player has lost and the lgame breaks out of loop
            default:
                point = sum;                                                                            //If neither of previous five options, then the value of sum becomes points
                pointsEl.value=("You got " + point + " points!");                                                              //Get the point in the document and set it to the point value from sum
                firstThrow = false;                                                                      //Set firstThrow to false, as the game is continuing and player no longer on their firstThroe
                stageEl.value="Follow-up throw needed!";
                outcomeEl.value="";
        }
    }
    else {
        switch(sum) {
            case point:
                outcomeEl.value="You win!";
                stageEl.value="Back to first throw!";
                pointsEl.value=("You got " + point + " points!");
                firstThrow = true;
                break;
            case 7:
                outcomeEl.value="You lose!";
                stageEl.value="Back to first throw!";
                pointsEl.value=("You got " + point + " points!");
                firstThrow = true;
        }
    }


}



function drawFace(number, dieX, dieY) {
    ctx.lineWidth = 5;                                                                                     //the width of the line
    ctx.clearRect(dieX,dieY,diceW,diceH);                                                                //clear space of die in subsequent draws
    ctx.strokeRect(dieX,dieY,diceW,diceH);                                                                 //Outline of rectangle for dice

    ctx.fillStyle = "#009966";
    switch(number) {
        case 1:
            drawOne(dieX, dieY);
            break;
        case 2:
            drawTwo(dieX, dieY);
            break;
        case 3:
            drawTwo(dieX, dieY);
            drawOne(dieX, dieY);
            break;
        case 4:
            drawFour(dieX, dieY);
            break;
        case 5:
            drawFour(dieX, dieY);
            drawOne(dieX, dieY);
            break;
        case 6:
            draw2mid(dieX, dieY);
            drawFour(dieX, dieY);
            break;

    }
}

function drawOne(dx, dy) {
    let dotX;
    let dotY;                                                                                               //The x, y cordinates for the dot

    ctx.beginPath();                                                                                        //Start path in the context
    dotX = dx + (.5*diceW);                                                                                 //Set x, y of dot to be at mid(.5) of each side
    dotY = dy + (.5*diceH);
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);                                                             //Draw circle, with the x, y from previous calc, radius set at top of doc, make full and anticlockwise arching
    ctx.closePath();
    ctx.fill();                                                                                             //fill the circle after closing it
}


function drawTwo(dx, dy) {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dx + (3*dotR);                                                                                 //Setting the x,y of the second dot relative to the x, y of die and its radius length
    dotY = dy + (3*dotR);
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);                                                             //To understand this section, first read the comments of the drawOne() they are mostly similar

    dotX = dx + diceW - (3*dotR);
    dotY = dy + diceH - (3*dotR);
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();                                                                                             //We closed and filled both dots at once here

}

function drawFour(dx, dy) {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dx + (3*dotR);                                                                                 //Top left corner dot x,y cordinates relative to dice top left corner cordinates
    dotY = dy + (3*dotR);
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);

    dotX = dx + diceW - (3*dotR);
    dotY = dy + diceW - (3*dotR);                                                                         //Bottom right dot x,y coordinates
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();                                                                                             //close and draw the two dots

    ctx.beginPath();                                                                                        //Start new path for second set of dots at bottom-left and upper-right
    dotX = dx + (3*dotR);
    dotY = dy + diceH - (3*dotR);                                                                         //set the x, y of the dot in bottom-left
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);

    dotX = dx + diceW - (3*dotR);
    dotY = dy + (3*dotR);                                                                                 //set x, y of the upper right die
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}


function draw2mid(dx, dy) {
    let dotX;
    let dotY;

    ctx.beginPath();
    dotX = dx + (3*dotR);
    dotY = dy + (.5*diceH);                                                                                  //Set x, y of dot to middle of the dice
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);

    dotX = dx + diceW - (3*dotR);
    dotY = dy + (.5*diceH);                                                                                  //THe .5 is for multiplying by half
    ctx.arc(dotX,dotY,dotR,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}