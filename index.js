//Set up the game: 
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

//Function to play button sounds: 
function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

//Function to animate button presses: 
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

// i) Start the game with a keypress - call next sequence: 
$("body").keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

//Function to start the game sequence: 
function nextSequence() {
  //Reset the user clicked pattern: 
  userClickedPattern = [];
  //Generate a random number ... 
  var randomNumber = Math.floor((Math.random() * 4));
  // ... to pick a random button colour ...
  var randomChosenColour = buttonColours[randomNumber];
  // ... to add to the gamePattern 
  gamePattern.push(randomChosenColour);
  //Animate the random button:  
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  //Play sound for the random button: 
  playSound(randomChosenColour);
  //Increment the level: 
  level++;
  //Update the title: 
  $("#level-title").text("Level " + level);
}

//ii) Play the game: 
//Function to start the user sequence by listening for clicks on the buttons 
$(".btn").click(function() {
  var userChosenColour = this.id;
  //Add the button colour clicked by the user into the user pattern arry: 
  userClickedPattern.push(userChosenColour);
  //Play corresponding sound: 
  playSound(userChosenColour);
  //Animate corresponding button: 
  animatePress(userChosenColour);
  //Check the user clicked pattern against the game array pattern: 
  var level = userClickedPattern.length - 1;
  checkAnswer(level);
});

//iii) Check the game 
//Function to check the user answer 
function checkAnswer(currentLevel) {
  //Does the user clicked colour match the corresponding position in the game pattern array?
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //Are the two arrays the same length (meaning the user has completed the pattern)
    if (userClickedPattern.length === gamePattern.length) {
      //If so, extend the game sequence 
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  //End the game if the user clicks the wrong colour   
  } else {
    gameOver();
  }
}

//iv) End the game: 
function gameOver() {
  //Play the end of game sound 
  playSound("wrong");
  //Animate the background
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  //Update the title
  $("#level-title").text("Game Over, Press Any Key to Restart");
  //Restart the game 
  restart();
}

//v) Restart the game: 
function restart() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
