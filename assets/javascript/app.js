$(document).ready(function () {


    window.onload = function () {
        $(".start").on("click", start);
        $(".stop").on("click", stop);
        $(".reset").on("click", reset);
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

    }
    function start() {
        intervalId = setInterval(countDown, 1000);
        intervalId2 = setInterval(games, 1000);
    }

    function stop() {

        console.log("stopping");
        clearInterval(intervalId);
        clearInterval(intervalId2);

    }

    function reset() {

        time = 16;

        $(".display").text("00:15");
        $(".question").text("");
        $(".choice1").text("");
        $(".choice2").text("");
        $(".choice3").text("");

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

    function games() {

        for (let i = 0; i < questions.length; i++) {
            playGame(questions[i], inputs[i]);
            console.log(score);
        }

    }


    // Object for Questions
    function Question(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;

        this.displayQuestion = function () {
            console.log(this.question);
            $(".question").text(this.question);
        };

        this.displayChoices = function () {
            $(".choice1").text(this.choices[0]);
            $(".choice2").text(this.choices[1]);
            $(".choice3").text(this.choices[2]);
            console.log(this.choices[0]);
            console.log(this.choices[1]);
            console.log(this.choices[2]);
        }

        this.displayAnswer = function () {
            console.log(this.answer);
        };
    }

    function playGame(question, guess) {
        question.displayQuestion();
        question.displayChoices();
        if (guess === question.answer) {
            score++;
            console.log("Correct!");
            $(".result").text("Correct!");
            displayScore();
        }
        else {
            console.log("Incorrect!");
            $(".result").text("Incorrect!");
            displayScore();
        }
    }


    function displayScore() {
        $(".score").text("Score = " + score);
    }
    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }
    // -- main program


    let firstNumber = 0;


    $(".number").on("click", function () {
        console.log($(this).val());
        firstNumber += $(this).val();
        $("#first-number").text(firstNumber);
        console.log(firstNumber);
        let result = firstNumber + 2;  // '2 '+ '2' = 22  string addition
        console.log("result=" + result);
    });



    let q1 = new Question("What is A?", ["A", "B", "C"], "A");
    let q2 = new Question("What is B?", ["A", "B", "C"], "B");
    let q3 = new Question("What is C?", ["A", "B", "C"], "C");
    let q4 = new Question("What is A?", ["A", "B", "C"], "A");
    let q5 = new Question("What is B?", ["A", "B", "C"], "B");
    let q6 = new Question("What is C?", ["A", "B", "C"], "C");

    // let questions = [q1, q2, q3, q4];
    // let inputs = ["A", "A", "B", "A"];
    let questions = [q1];
    let inputs = ["A"];

    let guesses=[];
    let score = 0;

    let time = 16;
    reset();
    

    // for (let i = 0; i < questions.length; i++) {
    //     playGame(questions[i], inputs[i]);
    //     console.log(score);
    // }

    $(".choice").on("click", function () {
        console.log($(this).val());
        
        let guess = $(this).val();
        guesses.push(guess);
        console.log(guesses);
    });
    console.log("final score = " + score);
    

});