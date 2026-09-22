/* =========================
   SCREEN FUNCTIONS
========================= */

function hideScreen(screen) {

    screen.classList.remove("active");

}


function showScreen(screen) {

    screen.style.display = "flex";

    setTimeout(() => {

        screen.classList.add("active");

    }, 50);

}


/* =========================
   WELCOME → STORY
========================= */

function showStory() {

    const music = document.getElementById("bgMusic");
    music.play();

    // existing code below...

    const welcome =
        document.getElementById("welcomeScreen");

    const story =
        document.getElementById("storyScreen");


    hideScreen(welcome);


    setTimeout(() => {

        welcome.style.display = "none";

        showScreen(story);

    }, 500);

}


/* =========================
   STORY → MEMORIES
========================= */

function showMemories() {

    const story =
        document.getElementById("storyScreen");

    const memories =
        document.getElementById("memoriesScreen");


    hideScreen(story);


    setTimeout(() => {

        story.style.display = "none";

        showScreen(memories);

    }, 500);

}


/* =========================
   MEMORIES → GAME
========================= */

function showGame() {

    const memories =
        document.getElementById("memoriesScreen");

    const game =
        document.getElementById("gameScreen");


    hideScreen(memories);


    setTimeout(() => {

        memories.style.display = "none";

        showScreen(game);

        loadQuestion();

    }, 500);

}


/* =========================
   QUIZ DATA
========================= */

const questions = [

    {
        question: "What is my favorite food?",

        answers: [
            "Litti Chokha",
            "Chicken",
            "Roti Bhindi",
            "Speical Raseeli Aditi Rabadi Rasmalai"
        ],

        correct: 3
    },


    {
        question: "What are my intentions with you?",

        answers: [
            "Just fun and time pass",
            "Want to marry and make happy life for forever with you",
            "Want to complete my Selfish wish and intentions",
            "Nothing"
        ],

        correct: 1
    },


    {
        question: "Which one describes me best?",

        answers: [
            "Funny 😂",
            "Quiet 😌",
            "Crazy 🤪",
            "All of these ❤️"
        ],

        correct: 3
    },


    {
        question: "What matters most to me?",

        answers: [
            "Money 💰",
            "Success 🏆",
            "Happiness ❤️",
            "Family👪"
        ],

        correct: 3
    },


    {
        question: "Who is reading this right now?",

        answers: [
            "My friend",
            "My girlfriend ❤️",
            "A stranger",
            "A hacker 😂"
        ],

        correct: 1
    }

];


let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document.getElementById(
        "questionText"
    ).textContent =
        question.question;


    const answersContainer =
        document.getElementById("answers");


    answersContainer.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");


            button.className =
                "answer-button";


            button.textContent =
                answer;


            button.onclick = () =>
                selectAnswer(index);


            answersContainer.appendChild(button);

        }
    );


    selectedAnswer = null;


    const next =
        document.getElementById("nextQuestion");


    next.disabled = true;

    next.textContent =
        "Select an Answer";

}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(index) {

    selectedAnswer = index;


    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        button => {

            button.classList.remove(
                "selected"
            );

        }
    );


    buttons[index].classList.add(
        "selected"
    );


    const next =
        document.getElementById(
            "nextQuestion"
        );


    next.disabled = false;

    next.textContent =
        currentQuestion === questions.length - 1
        ? "See My Result 🏆"
        : "Next Question →";

}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    if (selectedAnswer === null) {

        return;

    }


    const question =
        questions[currentQuestion];


    if (
        selectedAnswer ===
        question.correct
    ) {

        score++;

    }


    document.getElementById(
        "score"
    ).textContent = score;


    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

    }

    else {

        showResult();

    }

}


/* =========================
   SHOW RESULT
========================= */

function showResult() {

    const game =
        document.getElementById(
            "gameScreen"
        );

    const result =
        document.getElementById(
            "resultScreen"
        );


    hideScreen(game);


    setTimeout(() => {

        game.style.display = "none";

        result.style.display = "flex";


        document.getElementById(
            "finalScore"
        ).textContent = score;


        let message;


        if (score === 5) {

            message =
                "Okay... you know me REALLY well. ❤️";

        }

        else if (score >= 3) {

            message =
                "Not bad! You know me pretty well. 😌❤️";

        }

        else {

            message =
                "Looks like we need to spend more time together. 😂❤️";

        }


        document.getElementById(
            "resultMessage"
        ).textContent = message;


        setTimeout(() => {

            result.classList.add("active");

        }, 50);

    }, 500);

}


/* =========================
   FINAL PLACEHOLDER
========================= */

function showFinalMessage() {

    const currentScreen =
        document.querySelector(".screen.active");


    /* =========================
       QUIZ RESULT → HEART GAME
    ========================== */

    if (currentScreen.id === "resultScreen") {

        showHeartGame();

        return;
    }


    /* =========================
       HEART RESULT → FINAL
    ========================== */

    if (currentScreen.id === "heartResultScreen") {

        const heartResult =
            document.getElementById(
                "heartResultScreen"
            );

        const finalScreen =
            document.getElementById(
                "finalScreen"
            );

        hideScreen(heartResult);

        setTimeout(() => {

            heartResult.style.display = "none";

            showScreen(finalScreen);

        }, 500);

        return;
    }


    /* =========================
       FALLBACK
    ========================== */

    alert(
        "The next surprise is waiting... ❤️"
    );
}
/* =========================
   GAME 2 - CATCH THE HEARTS
========================= */

let heartScore = 0;
let heartTime = 30;
let heartTimerInterval = null;
let heartsCaught = 0;
let heartGameRunning = false;


/* =========================
   SHOW HEART GAME
========================= */

function showHeartGame() {

    const result =
        document.getElementById("resultScreen");

    const heartGame =
        document.getElementById("heartGameScreen");

    hideScreen(result);

    setTimeout(() => {

        result.style.display = "none";

        showScreen(heartGame);

        resetHeartGame();

    }, 500);
}


/* =========================
   RESET HEART GAME
========================= */

function resetHeartGame() {

    heartScore = 0;
    heartTime = 30;
    heartsCaught = 0;
    heartGameRunning = false;

    clearInterval(heartTimerInterval);

    document.getElementById(
        "heartScore"
    ).textContent = "0";

    document.getElementById(
        "heartTimer"
    ).textContent = "30";

    const area =
        document.getElementById(
            "heartGameArea"
        );

    area.innerHTML = `
        <div class="game-start-message">

            <div class="big-heart">❤️</div>

            <h3>Ready?</h3>

            <p>
                Tap the hearts as quickly as you can!
            </p>

            <button onclick="startHeartGame()">
                Start Game 🎮
            </button>

        </div>
    `;
}


/* =========================
   START HEART GAME
========================= */

function startHeartGame() {

    if (heartGameRunning) {
        return;
    }

    heartGameRunning = true;

    heartScore = 0;
    heartTime = 30;
    heartsCaught = 0;

    document.getElementById(
        "heartScore"
    ).textContent = "0";

    document.getElementById(
        "heartTimer"
    ).textContent = "30";

    const area =
        document.getElementById(
            "heartGameArea"
        );

    area.innerHTML = "";

    createHeart();

    heartTimerInterval = setInterval(() => {

        heartTime--;

        document.getElementById(
            "heartTimer"
        ).textContent = heartTime;

        if (heartTime <= 0) {

            clearInterval(
                heartTimerInterval
            );

            endHeartGame();

        }

    }, 1000);
}


/* =========================
   CREATE HEART
========================= */

function createHeart() {

    if (!heartGameRunning) {
        return;
    }

    if (heartsCaught >= 10) {
        endHeartGame();
        return;
    }

    const area =
        document.getElementById(
            "heartGameArea"
        );

    const heart =
        document.createElement("div");

    heart.className = "game-heart";

    heart.textContent = "❤️";

    /*
       Keep hearts away from
       the very edges.
    */

    const x =
        Math.random() * 80 + 10;

    const y =
        Math.random() * 80 + 10;

    heart.style.left = x + "%";
    heart.style.top = y + "%";

    heart.onclick = function () {

        catchHeart(heart);

    };

    area.appendChild(heart);
}


/* =========================
   CATCH HEART
========================= */

function catchHeart(heart) {

    if (!heartGameRunning) {
        return;
    }

    heartGameRunning = false;

    heartsCaught++;

    heartScore++;

    document.getElementById(
        "heartScore"
    ).textContent = heartScore;

    heart.classList.add(
        "heart-caught"
    );

    setTimeout(() => {

        heart.remove();

        if (heartsCaught >= 10) {

            endHeartGame();

        }
        else {

            heartGameRunning = true;

            createHeart();

        }

    }, 250);
}


/* =========================
   END HEART GAME
========================= */

function endHeartGame() {

    heartGameRunning = false;

    clearInterval(
        heartTimerInterval
    );

    const game =
        document.getElementById(
            "heartGameScreen"
        );

    const result =
        document.getElementById(
            "heartResultScreen"
        );

    hideScreen(game);

    setTimeout(() => {

        game.style.display = "none";

        result.style.display = "flex";

        document.getElementById(
            "heartFinalScore"
        ).textContent = heartScore;

        let message;

        if (heartScore === 10) {

            message =
                "You caught every heart! ❤️ You're officially a Heart Collector! 💕";

        }
        else if (heartScore >= 7) {

            message =
                "Wow! You caught almost every heart. ❤️";

        }
        else if (heartScore >= 4) {

            message =
                "Not bad! But there are still some hearts waiting for you. 😌❤️";

        }
        else {

            message =
                "Looks like the hearts were too fast! 😂❤️";

        }

        document.getElementById(
            "heartResultMessage"
        ).textContent = message;

        setTimeout(() => {

            result.classList.add(
                "active"
            );

        }, 50);

    }, 500);
}
function moveNoButton() {

    const button = document.getElementById("noButton");

    const maxX = window.innerWidth - button.offsetWidth - 30;
    const maxY = window.innerHeight - button.offsetHeight - 30;

    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);

    button.style.position = "fixed";
    button.style.left = x + "px";
    button.style.top = y + "px";
}

function loveYes() {

    const question = document.querySelector(".love-question");

    question.innerHTML = `
        <div class="yes-success">
            <div class="big-love">❤️</div>
            <h2>I knew it! 🥰</h2>
            <p>You just made this whole surprise worth it. 💕</p>
        </div>
    `;
}