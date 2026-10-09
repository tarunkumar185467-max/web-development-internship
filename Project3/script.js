/* =====================================
   QUIZ DATA
===================================== */

const questions = [

    {
        question: "What does HTML stand for?",

        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],

        answer: 0
    },

    {
        question: "Which language is used for styling webpages?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        answer: 1
    },

    {
        question: "Which language adds interactivity to webpages?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: 2
    },

    {
        question: "Which method is used to select an element by ID?",

        options: [
            "getElementById()",
            "getElement()",
            "selectId()",
            "queryId()"
        ],

        answer: 0
    },

    {
        question: "Which CSS property changes text color?",

        options: [
            "font-style",
            "background",
            "text-color",
            "color"
        ],

        answer: 3
    }

];


/* =====================================
   QUIZ VARIABLES
===================================== */

let currentQuestion = 0;

let score = 0;

let answered = false;


/* =====================================
   HTML ELEMENTS
===================================== */

const questionElement =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("options");

const nextButton =
    document.getElementById("nextBtn");

const questionNumber =
    document.getElementById("questionNumber");

const result =
    document.getElementById("result");

const scoreElement =
    document.getElementById("score");

const restartButton =
    document.getElementById("restartBtn");


/* =====================================
   LOAD QUESTION
===================================== */

function loadQuestion() {

    answered = false;

    const current =
        questions[currentQuestion];


    questionElement.textContent =
        current.question;


    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;


    optionsContainer.innerHTML = "";


    current.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.textContent = option;

            button.classList.add("option");

            button.addEventListener(
                "click",
                () => checkAnswer(button, index)
            );

            optionsContainer.appendChild(button);
        }
    );


    nextButton.disabled = true;
}


/* =====================================
   CHECK ANSWER
===================================== */

function checkAnswer(button, selectedIndex) {

    if (answered) {

        return;
    }

    answered = true;


    const correctAnswer =
        questions[currentQuestion].answer;


    const allOptions =
        document.querySelectorAll(".option");


    allOptions.forEach(
        (option, index) => {

            option.disabled = true;


            if (index === correctAnswer) {

                option.classList.add("correct");
            }

        }
    );


    if (selectedIndex === correctAnswer) {

        score++;

        button.classList.add("correct");

    } else {

        button.classList.add("wrong");
    }


    nextButton.disabled = false;
}


/* =====================================
   NEXT QUESTION
===================================== */

nextButton.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showResult();
        }

    }
);


/* =====================================
   SHOW RESULT
===================================== */

function showResult() {

    document.getElementById(
        "question-container"
    ).style.display = "none";


    result.style.display = "block";


    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}.`;
}


/* =====================================
   RESTART QUIZ
===================================== */

restartButton.addEventListener(
    "click",
    function () {

        currentQuestion = 0;

        score = 0;

        result.style.display = "none";


        document.getElementById(
            "question-container"
        ).style.display = "block";


        loadQuestion();
    }
);


/* =====================================
   INITIALIZE QUIZ
===================================== */

loadQuestion();



/* =====================================
   JOKE API
===================================== */

const jokeButton =
    document.getElementById("jokeBtn");

const jokeText =
    document.getElementById("jokeText");


jokeButton.addEventListener(
    "click",
    getJoke
);


async function getJoke() {

    jokeText.textContent =
        "Loading joke...";


    try {

        const response =
            await fetch(
                "https://official-joke-api.appspot.com/random_joke"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch joke"
            );
        }


        const data =
            await response.json();


        jokeText.textContent =
            `${data.setup} — ${data.punchline}`;


    } catch (error) {

        jokeText.textContent =
            "Sorry, unable to load the joke. Please try again.";

        console.error(error);
    }

}