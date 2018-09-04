$(document).ready(function () {

    window.onload = function () {
        $(".start").on("click", start);
        $(".stop").on("click", stopAll);
        $(".next").on("click", next);
        $(".reset").on("click", resetGame);
    };


    function countDown() {

        time--;
        let converted = timeConverter(time);
        $(".displayTime").text(converted);

        if (time < 0) {
            isNextChosen = false;
            stopAll();
            $(".displayTime").text("00:00");
            $(".message").text("Time's up. Click Next to Continue.");
            gameLogic();
        }
    }

    function start() {
        if (!isGameStarted) {
            isGameStarted = true;
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 300);
        }
    }

    function next() {
        if (isGameStarted) {
            clear();
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 300);
            isNextChosen = true;
        }
        else {
            let finalscore = score;
            stopAll();
            resetGame();
            // alert("Game Over. Please click Start to restart the game.");
            $(".message").text("Game Over. Your score is " + finalscore + " out of " + questions.length + ". Please click Start to restart the game.");

        }
    }


    function stopAll() {

        console.log("stopping all");
        clearInterval(intervalId);
        clearInterval(intervalId2);

    }


    function clear() {

        time = TIMECOUNTDWN;

        let converted = timeConverter(time);
        $(".displayTime").text(converted);
        $(".message").text("");
        $(".question").text("");
        $(".choice1").text("");
        $(".choice2").text("");
        $(".choice3").text("");
        $(".result").text("");
        $(".answer").text("");
        $(".score").text("");

    }

    function resetGame() {

        guesses = [];
        score = 0;
        count = 0;

        isGameStarted = false;
        isNextChosen = false;

        clear();
        $(".message").text("Please click Start to start the game. You have " + questions.length + " questions and " + TIMECOUNTDWN + " seconds for each question.");

    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

    // Game Logic
    function display() {

        questions[count].displayQuestion();
        questions[count].displayChoices();
        questions[count].displayScore();
        $(".message").text("");

    }

    function playGame(question, guess) {
        question.displayQuestion();
        question.displayChoices();
        if (guess === question.answer) {
            score++;
            console.log("Correct!");
            $(".message").text("Correct! Click Next to Continue.");
            question.displayScore();
        }
        else {
            console.log("Incorrect!");
            $(".message").text("Incorrect! Click Next to Continue.");
            question.displayScore();
        }
    }

    function gameLogic() {
        console.log("gamelogic count=" + count);
        if (count === questions.length - 1) {
            console.log("last one " + count);
            isGameStarted = false;
        }

        if (count < questions.length - 1) {
            console.log("outside2 " + count);
            count++;
            if (isNextChosen) {
                console.log("inside " + count);
                display();
            }
        }
    }


    // Object for Questions
    function Question(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;

        this.displayQuestion = function () {
            // console.log(this.question);
            let counter = count + 1;
            $(".question").text(counter + ".  " + this.question);
        };

        this.displayChoices = function () {
            $(".choice1").text(this.choices[0]);
            $(".choice2").text(this.choices[1]);
            $(".choice3").text(this.choices[2]);
        }

        this.displayAnswer = function () {
            console.log(this.answer);
        };

        this.displayScore = function () {
            $(".score").text("Score = " + score);
        };
    }


    // -- main program

    let q1 = new Question("What is A?", ["A", "B", "C"], "A");
    let q2 = new Question("What is B?", ["A", "B", "C"], "B");
    let q3 = new Question("What is C?", ["A", "B", "C"], "C");
    let q4 = new Question("What is A?", ["A", "B", "C"], "A");
    let q5 = new Question("What is B?", ["A", "B", "C"], "B");
    let q6 = new Question("What is C?", ["A", "B", "C"], "C");

    // let questions = [q1, q2, q3, q4];
    // let inputs = ["A", "A", "B", "A"];

    let questions = [q1, q2, q3];

    let guesses = [];
    let score = 0;
    let count = 0;

    isGameStarted = false;
    isNextChosen = false;

    const TIMECOUNTDWN = 8;
    let time = TIMECOUNTDWN;

    resetGame();


    // for (let i = 0; i < questions.length; i++) {
    //     playGame(questions[i], inputs[i]);
    //     console.log(score);
    // }

    $(".choice").on("click", function () {

        stopAll();
        isNextChosen = false;
        console.log($(this).val());

        let guess = $(this).val();
        guesses.push(guess);
        console.log(guesses);

        playGame(questions[count], guess);
        gameLogic();

    });

    console.log("final score = " + score);


});