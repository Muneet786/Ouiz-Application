var questions = [
    {
        question: 'Which is the largest aminal of the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Loin', correct: false },
            { text: 'Giraffa', correct: true },
            { text: 'Elephant', correct: false },
        ]

    },
    {
        question: 'Which is the smallest country of the world?',
        answers: [
            { text: 'Bhutan', correct: false },
            { text: 'Nepal', correct: false },
            { text: 'Sri Lanka', correct: false },
            { text: 'Vatican City', correct: true },
        ]
    },
    {
        question: 'Which is the largest desert of the world?',
        answers: [
            { text: 'Gobi', correct: false },
            { text: 'Sahara', correct: false },
            { text: 'Kalahari', correct: false },
            { text: 'Antarctica', correct: true },
        ]
    },
    {
        question: 'Which is the smallest continent of the world?',
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Arctic', correct: false },
            { text: 'Africa', correct: false },
        ]
    }

];

var questionElement = document.getElementById('question');
var answerButtons = document.getElementById('answer-buttons');
var nextbutton = document.getElementById('next-btn');
var timer;



var currentQuestionIndex = 0;
var score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = 'Next';
    showQuestion();
}



function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
    startTimer();
}


function startTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        handleNextButton();
    }, 12000);
}





function resetState() {
    nextbutton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextbutton.style.display = 'block';
}

function showscore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`+ "<br>" + `your percentage is ${((score / questions.length) *100).toFixed(2)}`+"%";
    nextbutton.innerHTML = 'Play Again';
    // questionElement.innerHTML = ('your percentage is' + ((score / questions.length) *100).toFixed(2));
    nextbutton.style.display = 'block';
}






function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showscore();
    }
};



nextbutton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});


startQuiz();