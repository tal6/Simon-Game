var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var isStart = false;
var level = 0;
var currentLevel = 0;
var waitToRestart = false;

$(document).keypress(function() {
  if (!isStart) {
    isStart = true;
    waitToRestart = false;
    setTimeout(function() {
      nextSequence();
    }, 250);
  }
});

$(".btn").click(function () {
  if (level === 0) {
    alert("You Have To Start The Game First.")
  } else {
    var userChoserColor = $(this).attr("id");
    userClickedPattern.push(userChoserColor);
    playSound(userChoserColor);
    buttonAnimation(userChoserColor);
    checkAnswer();
  }
});

function checkAnswer() {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    currentLevel += 1;
    if (level === currentLevel) {
      currentLevel = 0;
      setTimeout (function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  if(!waitToRestart) {
    gamePattern = [];
    userClickedPattern = [];
    isStart = false;
    level = 0;
    currentLevel = 0;
    waitToRestart = true;
    $("#level-title").text("Game Over! Press Any Key to Restart.");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
  playSound(randomChosenColor);
}

function playSound(colorId) {
  var sound = new Audio('sounds/' + colorId + '.mp3');
  sound.play();
}

function buttonAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
