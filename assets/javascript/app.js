$(document).ready(function () {

    window.onload = function () {
        $(".start").on("click", start);
        // $(".stop").on("click", stopAll);
        $(".next").on("click", next);
        // $(".reset").on("click", resetGame);
    };


    function countDown() {

        time--;
        let converted = timeConverter(time);
        $(".displayTime").text(converted);

        if (time < 0) {
            isNextChosen = false;
            stopAll();
            $(".displayTime").text("00:00");
            $(".message").text("Time's up! The correct answer is " + questions[count].answer + ". Click Next to Continue.");
            gamePlay();
        }
    }

    function start() {
        if (!isGameStarted) {
            resetGame();
            isGameStarted = true;
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 300);
        }
    }

    function next() {
        if (isGameStarted && !isNextChosen) {
            clear();
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 300);
            isNextChosen = true;
        }
        if (!isGameStarted) {
            let finalscore = score;
            stopAll();
            clearQuestion();
            // resetGame();
            // alert("Game Over. Please click Start to restart the game.");
            $(".message").text("Game Over. Your score is " + finalscore + " out of " + questions.length + ". Please click Start to restart the game.");

        }
    }


    function stopAll() {

        console.log("stopping all");
        clearInterval(intervalId);
        clearInterval(intervalId2);

    }

    function clearQuestion() {

        time = TIMECOUNTDWN;

        let converted = timeConverter(time);
        $(".displayTime").text(converted);
        $(".question").text("");
        $(".choice1").text("");
        $(".choice2").text("");
        $(".choice3").text("");
        $(".result").text("");
        $(".answer").text("");
        $(".score").text("");

    }

    function clear() {

        clearQuestion();
        $(".message").text("");

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

    // game play logic
    function display() {

        questions[count].displayQuestion();
        questions[count].displayChoices();
        questions[count].displayScore();
        $(".message").text("");

    }

    function checkAnswer(question, guess) {
        question.displayQuestion();
        question.displayChoices();
        if (guess === question.answer) {
            score++;
            console.log("Correct!");
            $(".message").text("Correct Answer! Click Next to Continue.");
            question.displayScore();
        }
        else {
            console.log("Incorrect!");
            $(".message").text("Wrong Answer! The correct answer is " + question.answer + ". Click Next to Continue.");
            question.displayScore();
        }
    }

    function gamePlay() {
        console.log("game count=" + count);
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

    let q1 = new Question(
        "Why does pasta sometimes come in such complex shapes?",
        ["The wrinkles and ridges are better at clinging to different sauces.",
            "The more complicated shapes can be cooked less thoroughly.",
            "The intricate contours are purely for ascetic purposes."],
        "A"
    );


    let q2 = new Question(
        "What is the primary ingredient of pesto?",
        ["Rosemary",
            "Basil",
            "Thyme"],
        "B"
    );

    let q3 = new Question(
        "Which oil is most common in Italian cuisine?",
        ["Peanut oil",
            "Sesame oil",
            "Olive oil"],
        "C"
    );

    let q4 = new Question(
        "What's the difference between an Osteria and a Trattoria?",
        ["Osteria is a more formal eating place than Trattoria.",
            "Osteria is a less formal eating place than Trattoria.",
            "Both are the same."],
        "B"
    );

    let q5 = new Question(
        "Which group contains an invalid pasta name?",
        ["Lasagne, Spaghetti, Macaroni, Raioli",
            "Rigatoni, Penne, Linguine, Vermicelli",
            "Fettuccine, Tortellini, Alfredo, Risotto"],
        "C"
    );

    let q6 = new Question(
        "Who invented pizza?",
        ["Persians",
            "Greeks",
            "Are you kidding me? The Italians, and don't you fuggedaboutit."],
        "B"
    );
   
    let q7 = new Question(
        "Risotto is an Italian dish made out of _____?",
        ["Rice",
            "Pasta",
            "Potato"],
        "A"
    );
   
    let q8 = new Question(
        "Mozzarella cheese is a sliceable curd cheese originating in Italy. Traditional Mozzarella cheese is made from milk of ____?",
        ["Goat",
            "Llama",
            "Water buffalo"],
        "C"
    );

    let q9 = new Question(
        "You find yourself in Lombardy, northern Italy. You are offered a glass of sparkling white wine that the locals are immensely proud of. What wine would this be?",
        ["Tuscany",
            "Piedmont",
            "Franciacorta"],
        "C"
    );

    let q10 = new Question(
        " In the US, the terms marinara sauce and the following can be used almost interchangeably.",
        ["Spaghetti sauce",
            "Green sauce",
            "Ragu sauce"],
        "A"
    );
    
    
    // let questions = [q1, q2, q3, q4];
    // let inputs = ["A", "A", "B", "A"];

    let questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

    let guesses = [];
    let score = 0;
    let count = 0;

    isGameStarted = false;
    isNextChosen = false;

    const TIMECOUNTDWN = 8;
    let time = TIMECOUNTDWN;

    resetGame();


    // for (let i = 0; i < questions.length; i++) {
    //     checkAnswer(questions[i], inputs[i]);
    //     console.log(score);
    // }

    $(".choice").on("click", function () {

        if (isGameStarted) {
            stopAll();
            isNextChosen = false;
            console.log($(this).val());

            let guess = $(this).val();
            guesses.push(guess);
            console.log(guesses);

            checkAnswer(questions[count], guess);
            gamePlay();
        }

    });

    console.log("final score = " + score);


});