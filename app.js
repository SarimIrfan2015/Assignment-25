const questions = [
    { q: "What does HTML stand for?", a: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Trainer Markup Language"], correct: 0 },
    { q: "Which tag is used for a heading?", a: ["&lt;head&gt;", "&lt;h1&gt;", "&lt;heading&gt;"], correct: 1 },
    { q: "Which tag is used for a paragraph?", a: ["&lt;p&gt;", "&lt;para&gt;", "&lt;paragraph&gt;"], correct: 0 },
    { q: "How do you create a link in HTML?", a: ["&lt;a href='url'&gt;Link&lt;/a&gt;", "&lt;link&gt;Link&lt;/link&gt;", "&lt;url&gt;Link&lt;/url&gt;"], correct: 0 },
    { q: "Which tag is used to insert an image?", a: ["&lt;img&gt;", "&lt;image&gt;", "&lt;picture&gt;"], correct: 0 },
    { q: "Which CSS property changes text color?", a: ["font-color", "color", "text-color"], correct: 1 },
    { q: "Which CSS property changes background color?", a: ["background-color", "color", "bgcolor"], correct: 0 },
    { q: "How do you make text bold in CSS?", a: ["font-weight: bold;", "text:bold;", "text-weight: bold;"], correct: 0 },
    { q: "How do you select an element with id 'myDiv' in CSS?", a: [".myDiv", "#myDiv", "*myDiv"], correct: 1 },
    { q: "Which CSS property adds space inside an element's border?", a: ["margin", "padding", "spacing"], correct: 1 }
];

let current = 0;
let score = 0;
let timer = 10;
let timerInterval;
let answered = false;

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    timer = 10;
    document.getElementById('timer').innerText = 'Time: ' + timer;
    document.getElementById('nextBtn').disabled = true;

    let q = questions[current];
    document.getElementById('question').innerHTML = q.q;

    let answersHTML = '';
    q.a.forEach((ans, index) => {
        answersHTML += `<button class="answer-btn" onclick="selectAnswer(this,${index})">${ans}</button><br>`;
    });
    document.getElementById('answers').innerHTML = answersHTML;

    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = 'Time: ' + timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            revealAnswer();
            document.getElementById('nextBtn').disabled = false;
        }
    }, 1000);
}

function selectAnswer(btn, index) {
    if (answered) return;
    answered = true;
    clearInterval(timerInterval);

    const correctIndex = questions[current].correct;
    if (index === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        revealAnswer();
    }
    document.getElementById('nextBtn').disabled = false;
}

function revealAnswer() {
    const correctIndex = questions[current].correct;
    const buttons = document.getElementsByClassName('answer-btn');
    buttons[correctIndex].classList.add('correct');
}

function nextQuestion() {
    current++;
    if (current >= questions.length) {
        endQuiz();
    } else {
        loadQuestion();
    }
}

function endQuiz() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('result').innerText = `Your Score: ${score} / ${questions.length}`;
}