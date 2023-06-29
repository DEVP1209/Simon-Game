var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}
//Random Pattern Generator


function animatePress(colour){
  $("."+colour).addClass("pressed");
  setTimeout(function(){
    $("."+colour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }

}

//Function that is used to record user pattern
$(".btn").on("click",function(){
  var userChosenColour = this.id;
  animatePress(this.id);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer((userClickedPattern.length - 1));
});

// Starting the game.
$(document).keypress(function(){
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomnumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomnumber];
  gamePattern.push(randomChosenColour);
  $("h1").text("Level "+level);

  //Flash Animation
  $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //adding dudio
  playSound(randomChosenColour);
}

function startOver(){
  level=0;
  gamePattern = [];
  userClickedPattern=[];
  $("h1").text("Game Over.Press Any Key To Restart.");
  $("body").addClass("gameOver");
  setTimeout(function () {
  $("body").removeClass("gameOver");
}, 100);
  started = false;
}
