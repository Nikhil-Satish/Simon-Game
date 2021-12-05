var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
gamePattern = [];
var level = 0;
var started = false;
$(document).keydown(function(){
  if(!started){
    $("h1").html("Level "+level);
    nextSequence();
    started=true;
  }
});
function nextSequence(){
  userClickedPattern = [];
  $("h1").html("Level "+level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
}
function playsound(name){
  const audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over! Press any key to restart");
    startover();
  }
}
function startover(){
  level = 0;
  gamePattern = [];
  started = false;
  // nextSequence();
}
$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playsound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
