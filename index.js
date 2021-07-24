var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;
var checkmobile=0;

function nextSequence() {
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamepattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  $(".level-title").html("Level " + level);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".ubtn").on("click", function()
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

$(".mb").on("click", function() {
  checkmobile=1;
  if (started == 0)
  {
    started = 1;
    $(".mb").css("display","none");
    $(".mb-title").addClass("mb-title-margin");
    setTimeout(function() {
      $(".level-title").html("Beginning in 3....");
      setTimeout(function() {
        $(".level-title").html("Beginning in 2....");
        setTimeout(function() {
          $(".level-title").html("Beginning in 1....");
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 100);
  }
})

function checkAnswer()
{
  var l=userClickedPattern.length;
  if(userClickedPattern[l-1]==gamepattern[l-1])
  {
    if(userClickedPattern.length==gamepattern.length)
    {
      userClickedPattern=[];
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $(".pc-title").html("Game Over, press any key to restart");
    $(".mb-title").html("Game Over, press button to restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

$(document).on("keypress", function() {
  if (started == 0) {
    started = 1;
    setTimeout(function() {
      $(".level-title").html("Beginning in 3....");
      setTimeout(function() {
        $(".level-title").html("Beginning in 2....");
        setTimeout(function() {
          $(".level-title").html("Beginning in 1....");
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 100);
  }
})

function animatePress(name) {
  $("#" + name).addClass("pressed");
  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function startOver()
{
  level=0;
  started=0;
  gamepattern = [];
  userClickedPattern = [];
  if(checkmobile==1)
  {
    $(".mb").css("display","inline-block");
    $(".mb-title").removeClass("mb-title-margin");
  }
}
