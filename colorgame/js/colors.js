/*
RGB matching game.  Created by Justin Schlump with the help
and inspiration from Colt Steele.
*/

//Selectors
var squares = document.querySelectorAll(".square");
var rgbDisplay = document.querySelector("#colorOutput");
var result = document.querySelector("#result");
var newColors = document.querySelector("#new-color");
var easyDif = document.querySelector("#easy");
var hardDif = document.querySelector("#hard");

//Game variables
var isInitialized = false;
var isHard = false;
var colorAttribute;
var squareAttribute;
var winningColor;
var colors = [];

/*
* Initialize game when first opened
*/
function init() {
  colors = [vectorRGB(), vectorRGB(), vectorRGB()];
  squares[3].visibility = "hidden";
  squares[4].visibility = "hidden";
  squares[5].visibility = "hidden";
  easyDif.style.background = "white";
  easyDif.style.border = "8px solid black";

  isInitialized = true;
}

function main() {
  if (!isInitialized) {
    init();
  }

  generateColors();
  findMatch();

  // Reset game with new colors when button clicked
  newColors.addEventListener("click", function(){
    reset();
  });

  // Reset game with all colors when button clicked
  hardDif.addEventListener("click", function(){
    isHard = true;
    hardDif.style.background = "white";
    hardDif.style.border = "8px solid black";
    easyDif.style.background = "#f44336";
    easyDif.style.border = "2px solid black";
  });

  // Reset game and reduce number of squares
  easyDif.addEventListener("click", function(){
    isHard = false;
    easyDif.style.background = "white";
    easyDif.style.border = "8px solid black";
    hardDif.style.background = "#f44336";
    hardDif.style.border = "2px solid black";
  });
}

/*
* Loop and assign color to each square
*/
function generateColors() {
  if (isHard) {
    colors = [vectorRGB(), vectorRGB(),
    vectorRGB(), vectorRGB(),
    vectorRGB(), vectorRGB()];
    squares.forEach(function(square){
      square.style.visibility = "visible";
    });
  }else {
    colors = [vectorRGB(), vectorRGB(), vectorRGB()];
    //Ensures squares are displayed or hidden correctly(brute force'ish :( ))
    squares[0].style.visibility = "visible";
    squares[1].style.visibility = "visible";
    squares[2].style.visibility = "visible";
    squares[3].style.visibility = "hidden";
    squares[4].style.visibility = "hidden";
    squares[5].style.visibility = "hidden";
  }

  for (var i = 0; i < colors.length; i++) {
    squares[i].style.background = colors[i];

    //Uncomment to display rgb on each square
    //squares[i].textContent = colors[i] + " " + i;
  }

  winningColor = Math.floor((Math.random() * colors.length));
  rgbDisplay.textContent = colors[winningColor];
  colorAttribute = rgbDisplay.textContent.replace(/[^\d,.]/g, '').split(',');
}

/*
* Loop through squares to test if winning color was clicked
*/
function findMatch() {
  //On click event to check match for each square
  squares.forEach(function(square){
    square.addEventListener("click", function(){
      squareAttribute = square.getAttribute("style");
      squareAttribute = squareAttribute.replace(/[^\d,.]/g, '').split(',');

      //Test if matching
      if (String(squareAttribute) === String(colorAttribute)) {
        console.log("match");
        squares.forEach(function(square){
          square.style.visibility = "visible";
          square.style.background = colors[winningColor];
          result.textContent = "MATCH";
        });
      }else{
        square.style.visibility = "hidden";
        result.textContent = "FAIL";
      }
    });
  });
}

/*
* Generate random color
*/
function reset() {
  generateColors();
  result.textContent = "";
}

/*
* Generate random color
*/
function vectorRGB() {
  var r = Math.floor((Math.random() * 255) + 1);
  var g = Math.floor((Math.random() * 255) + 1);
  var b = Math.floor((Math.random() * 255) + 1);
  return "RGB("+r+", "+g+", "+b+")";
}

main();
