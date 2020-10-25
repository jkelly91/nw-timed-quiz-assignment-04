// variable that displays the seconds left
var secondsLeft = 61;

// element that displays time
var timer = document.getElementById("timer");

// div for scores
var scores_div = document.getElementById("scores-div");

// start button
var startBtn_button = document.getElementById("start-button");

// variable for question title
var questionTitle_div = document.getElementById("question-title");

// variable to get questions
var questions_div = document.getElementById("questions-div");

// variable that gets choices
var choices_div = document.getElementById("choices");

// variable that gets feedback div
var feedback_div = document.getElementById("feedback")

// variable that gets submit button
var submitBtn = document.getElementById("submit")

var returnBtn = document.getElementById("return-home")

// variable gets initials div
var initials_div = document.getElementById("initials")

// get leaderboard div
var leaderBoard_div = document.getElementById("leaderboard")

// var gets final score
var finalScore = document.getElementById("final-score")

var phrase = document.getElementById("phrase")

// Get Screens
var startScreen_div = document.getElementById("start-screen")
var endScreen_div = document.getElementById("end-screen")

// variables to store values
var questionCount = 0;

var incorrect = 10;


// timer starts when user hits start button
function setTime() {

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Timer: " + secondsLeft;

    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      endGame();

    }


  }, 1000);
}

// Quiz is started on button click
function startQuiz() {

  setTime()
  startBtn_button.setAttribute("class", "hide")
  phrase.setAttribute("class", "hide")

  getQuestion()

}
// get questions to the page
function getQuestion() {

  questions_div.removeAttribute("class")
  var currentQuestion = questions[questionCount];
  questionTitle_div.textContent = currentQuestion.title;

  choices_div.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var optionButton = document.createElement("button")
    optionButton.setAttribute("class", "choice");
    optionButton.setAttribute("value", choice);

    optionButton.textContent = choice;
    optionButton.onclick = answerClick;
    choices_div.appendChild(optionButton);

  })
}
// verifies if answer is correct or not
function answerClick() {
  if (this.value !== questions[questionCount].answer) {
    secondsLeft = secondsLeft - 10
    feedback_div.textContent = "Incorrect"
  }
  else {
    feedback_div.textContent = "Correct"
  }

  feedback_div.setAttribute("class", "feedback");
  setTimeout(function() {
    feedback_div.setAttribute("class", "feedback hide");
  }, 1000);

  questionCount++;

  if (questionCount === questions.length) {
    setTimeout(function(){endGame();}, 1000);
  }
  else {
    getQuestion();
  }


}

function endGame() {
  questionTitle_div.textContent = "Let's see how you did!"
  endScreen_div.removeAttribute("class")
  questions_div.setAttribute("class", "hide")
  finalScore.textContent = "Your Score: " + secondsLeft
}

function submitInitials () {
  var initials = initials_div.value.trim()
  var userScore = {

    score: secondsLeft,
    initials: initials
  };

  var highScores = [] || JSON.parse(window.localStorage.getItem("high-scores"))
  highScores.push(userScore);

  window.localStorage.setItem("high-scores", JSON.stringify(highScores))
  endScreen_div.setAttribute('class', "hide")
  leaderBoard_div.removeAttribute("class")


  highScores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = userScore.initials
    var listItem = document.getElementById("high-scores")
    listItem.appendChild(liTag)
  })

}

function reloadPage() {
  location.reload();
}

returnBtn.onclick = reloadPage;
submitBtn.onclick = submitInitials;
startBtn_button.onclick = startQuiz;
