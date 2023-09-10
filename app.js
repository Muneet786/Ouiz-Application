// var quesAns = [
//     {
//         ques1: 'What is the sum of 2+2',
//         answer: [{ans1: '4'},{ans2: '2'},{ans3: '3'},{ans4: '1'}]
//     },
//     {
//         ques1: 'What is the sum of 10+10',
//         ans1: '40',
//         ans2: '20',
//         ans3: '30',
//         ans4: '10'
//     },
//     {
//         ques1: 'What is the sum of 3*2',
//         ans1: '4',
//         ans2: '2',
//         ans3: '3',
//         ans4: '6'
//     }
// ]


// var getQues = document.getElementById('ques')
// var getAns1 = document.getElementById('ans1')
// var getAns2 = document.getElementById('ans2')
// var getAns3 = document.getElementById('ans3')
// var getAns4 = document.getElementById('ans4')
// var index = 0


// function nextQuestion(){
//     if(index > quesAns.length-1 ){
//         document.write('Question End')
//     }
//     else{
// getQues.innerHTML = quesAns[index].ques1
// getAns1.innerHTML = quesAns[index].ans1
// getAns2.innerHTML = quesAns[index].ans2
// getAns3.innerHTML = quesAns[index].ans3
// getAns4.innerHTML = quesAns[index].ans4
// index++
// }
// }
// nextQuestion()


const questions = [
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

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextbutton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        })
}

// startQuiz();

function resetState(){
    nextbutton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextbutton.style.display = 'block';
}

function showscore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = 'Play Again';
    nextbutton.style.display = 'block';
}






function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
};



nextbutton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();