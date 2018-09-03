$(document).ready(function () {


    window.onload = function () {
        $(".start").on("click", start);
        $(".stop").on("click", stopAll);
        $(".next").on("click", next);
        $(".reset").on("click", resetGame);
    };


    function countUp() {

        time++;
        let converted = timeConverter(time);
        $(".display").text(converted);

    }

    function countDown() {

        time--;
        let converted = timeConverter(time);
        $(".display").text(converted);

        if (time < 0) {
            $(".display").text("00:00");
            stopAll();
            alert("Time is Up");

            gameLogic();
        }
    }

    function start() {
        isGameStarted = true;
        intervalId = setInterval(countDown, 1000);
        intervalId2 = setInterval(display, 1000);
    }

    function next() {
        if (isGameStarted) {
            clear();
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 1000);
            isNextChosen = true;
        }
        else {
            stopAll();
            resetGame();
            alert("Game Over. Please click Start to restart the game.");

        }
    }


    function stopAll() {

        console.log("stopping all");
        clearInterval(intervalId);
        clearInterval(intervalId2);

    }


    function clear() {

        time = TIMECOUNTDWN;

        $(".display").text("00:08");
        $(".question").text("");
        $(".choice1").text("");
        $(".choice2").text("");
        $(".choice3").text("");
        $(".result").text("");
        $(".answer").text("");
        $(".score").text("");

    }

    function resetGame() {

        clear();

        guesses = [];
        score = 0;
        count = 0;

        isGameStarted = false;
        isNextChosen = false;

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

    }

    function playGame(question, guess) {
        question.displayQuestion();
        question.displayChoices();
        if (guess === question.answer) {
            score++;
            console.log("Correct!");
            $(".result").text("Correct!");
            question.displayScore();
        }
        else {
            console.log("Incorrect!");
            $(".result").text("Incorrect!");
            question.displayScore();
        }
    }

    function gameLogic() {
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



    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
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
    let inputs = ["A"];

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
        // stopCountDown();
        stopAll();
        isNextChosen = false;
        console.log($(this).val());

        let guess = $(this).val();
        guesses.push(guess);
        console.log(guesses);

        playGame(questions[count], guess);
        console.log("outside " + count)

        gameLogic();
       


    });
    console.log("final score = " + score);


});