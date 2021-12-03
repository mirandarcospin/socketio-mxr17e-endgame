var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var word; // Selected word
var guess; // Geuss
var storedGuess = [ ]; // Stored storedGuess
var lives; // Lives
var counter; // Count correct storedGuess
var space; // Number of spaces in word '-'
var games; //Amount of games played
var points; //Amount of points to be earned
var p1; //Player 1
var p2; //Player 2


// Get elements
var showLives = document.getElementById("stickmanLives");
var answerGameOver = document.getElementById("correctAns");
var p2Points = document.getElementById("pl2"); //Display player 2 points
var p1Points = document.getElementById("pl1"); //Display player 1 points

// create alphabet ul
var buttons = function () {
  myButtons = document.getElementById('buttons');
  letters = document.createElement('ul');

  for (var i = 0; i < alphabet.length; i++) {
    letters.id = 'alphabet';
    list = document.createElement('li');
    list.id = 'letter';
    list.innerHTML = alphabet[i];
    check();
    myButtons.appendChild(letters);
    letters.appendChild(list);
  }
}

// Create storedGuess ul
 result = function () {
  wordHolder = document.getElementById('hold');
  correct = document.createElement('ul');

  for (var i = 0; i < word.length; i++) {
    correct.setAttribute('id', 'my-word');
    guess = document.createElement('li');
    guess.setAttribute('class', 'guess');
    if (word[i] === "-") {
      guess.innerHTML = "-";
      space = 1;
    } else {
      guess.innerHTML = "_";
    }

    storedGuess.push(guess);
    wordHolder.appendChild(correct);
    correct.appendChild(guess);
  }
}

// Show lives
 comments = function () {
  showLives.innerHTML = "You have " + lives + " lives";
  if (lives < 1) {
    showLives.innerHTML = "Game Over";
    answerGameOver.innerHTML = "Answer: " + word;
  }
  for (var i = 0; i < storedGuess.length; i++) {
    if (counter + space === storedGuess.length) {
      showLives.innerHTML = "You Win!";
    }
  }
  if(showLives.innerHTML == "You Win!"){
    points = 1;
    if(games % 2 == 0) {
      p2 = p2 + points;
    }
    else {
      p1 = p1 + points;
    }
  }
  else if(showLives.innerHTML == "Game Over"){
    points = 0;
    if(games % 2 == 0) {
      p2 = p2 + points;
    }
    else {
      p1 = p1 + points;
    }
  }
}
    // Animate man
var animate = function () {
  var drawMe = lives ;
  drawArray[drawMe]();
}


 // Hangman
canvas =  function(){
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext('2d');
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
  for(var i = 1; i < 5; i++){
    drawArray[(lives+4)-i]();
  }
};

  head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }

draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {

  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

 frame1 = function() {
   draw (0, 150, 150, 150);
 };

 frame2 = function() {
   draw (10, 0, 10, 600);
 };

 frame3 = function() {
   draw (0, 5, 70, 5);
 };

 frame4 = function() {
   draw (60, 5, 60, 15);
 };

 torso = function() {
   draw (60, 36, 60, 70);
 };

 rightArm = function() {
   draw (60, 46, 100, 50);
 };

 leftArm = function() {
   draw (60, 46, 20, 50);
 };

 rightLeg = function() {
   draw (60, 70, 100, 100);
 };

 leftLeg = function() {
   draw (60, 70, 20, 100);
 };
drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1];


// OnClick Function
 check = function () {
  list.onclick = function () {
    var geuss = (this.innerHTML);
    this.setAttribute("class", "active");
    this.onclick = null;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === geuss) {
        storedGuess[i].innerHTML = geuss;
        counter += 1;
      }
    }
    var j = (word.indexOf(geuss));
    if (j === -1) {
      lives -= 1;
      comments();
      animate();
    } else {
      comments();
    }
  }
}


// Play the game
play = function () {
  categories = [
      ["cat", "cow", "dog", "horses", "rat", "fish", "rabbit"],
      ["hamburger", "tacos", "nachos", "hot-dog", "chicken"],
      ["honduras", "italy", "guatemala", "brazil", "canada"]
  ];

  chosenWord = categories[Math.floor(Math.random() * categories.length)];
  word = chosenWord[Math.floor(Math.random() * chosenWord.length)];
  word = word.replace(/\s/g, "-");
  console.log(word);
  buttons();

  storedGuess = [ ];
  lives = 6;
  counter = 0;
  space = 0;
  points = 0;
  result();
  comments();
  canvas();
}
p1 = 0;
p2 = 0;
games = 1;
play();

 // For next player - next game
document.getElementById('reset').onclick = function() {
  correct.parentNode.removeChild(correct);
  letters.parentNode.removeChild(letters);
  context.clearRect(0, 0, 400, 400);
  answerGameOver.innerHTML = null;
  p1Points.innerHTML = p1;
  p2Points.innerHTML = p2;
  games = games + 1;
  play();
}
