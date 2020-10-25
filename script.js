// variable that displays the seconds left
var secondsLeft = 76;

// element that displays time
var timer = document.getElementById("timer");

// div for scores
var scores_div = document.getElementById("scores-div");

// start button
var startBtn_div = document.getElementById("start-button");

// variable for question title
var questionTitle_div = document.getElementById("question-title");

// variable to get questions
var questions_div = document.getElementById("questions-div");

// variable that gets choices
var choices_div = document.getElementById("choices");

// variable that gets feedback div
var feedback_div = document.getElementById("feedback")

var pTag_p = document.querySelector("p");
// variables to store values
var score = 0;
var questionCount = 0;
var scoreArry = [];

// timer starts when user hits start button
function setTime() {

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "";
    timer.textContent = "Timer: " + secondsLeft;
    if (secondsLeft === 0 || questionCount === questions.length) {
      clearInterval(timerInterval);

    }

  }, 1000);
}

// Quiz is started on button click

function startQuiz() {

  setTime()
  startBtn_div.remove()
  pTag_p.remove()


  for (var i =0; i < questions.length; i++) {
    console.log(questions[0].choices[i])
  }
  getQuestion();

}

function getQuestion() {

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

function answerClick() {
  if (this.value !== questions[questionCount].answer) {
    feedback_div.textContent = "Incorrect"
  }
  else {
    feedback_div.textContent = "Correct"
  }
  questionCount++;
  getQuestion();
}
startBtn_div.onclick = startQuiz;

