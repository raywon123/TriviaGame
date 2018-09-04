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
        $(".displayTime").text("Timer: " + converted);

        if (time < 0) {
            isNextChosen = false;
            isChoiceChosen = true;
            stopAll();
            $(".displayTime").text("Timer: 00:00");
            $(".message").text("Time's up! Click Next to Continue.");
            $(".answer").text("The correct answer is " + questions[count].answer + ".");
            $(".explanation").text(questions[count].explain);
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
        if (isGameStarted && !isNextChosen && isChoiceChosen) {
            clear();
            intervalId = setInterval(countDown, 1000);
            intervalId2 = setInterval(display, 300);
            isNextChosen = true;
            isChoiceChosen = false;
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
        $(".displayTime").text("Timer: " + converted);
        $(".question").text("");
        $(".choice1").text("");
        $(".choice2").text("");
        $(".choice3").text("");
        $(".explanation").text("");
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
        isChoiceChosen = false;

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

    function displayExplanation() {
        $(".message").text("Click Next to Continue.");
        $(".explanation").text(questions[count].explain);
        questions[count].displayScore();
    }

    function checkAnswer(question, guess) {
        question.displayQuestion();
        question.displayChoices();
        if (guess === question.answer) {
            score++;
            console.log("Correct!");
            $(".answer").text("Correct Answer!");
            displayExplanation();
        }
        else {
            console.log("Incorrect!");
            $(".answer").text("Wrong Answer! The correct answer is " + question.answer + ".");
            displayExplanation();
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
    function Question(question, choices, answer, explain) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;
        this.explain = explain;

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
            $(".score").text("Score : " + score + " / " + questions.length);
        };
    }


    // -- main program

    let q1 = new Question(
        "Why does pasta sometimes come in such complex shapes?",
        ["The wrinkles and ridges are better at clinging to different sauces.",
            "The more complicated shapes can be cooked less thoroughly.",
            "The intricate contours are purely for ascetic purposes."],
        "A",
        "Pasta is often highly textured and intricately shaped because that makes it better at holding onto sauces."
    );


    let q2 = new Question(
        "What is the primary ingredient of pesto?",
        ["Rosemary",
            "Basil",
            "Thyme"],
        "B",
        "Although rosemary and thyme are used frequently in Italian cooking, pesto sauce is traditionally made from fresh basil."
    );

    let q3 = new Question(
        "Which oil is most common in Italian cuisine?",
        ["Peanut oil",
            "Sesame oil",
            "Olive oil"],
        "C",
        "Olive oil is by far the most commonly used oil in Italian cuisine, especially in the form of extra virgin olive oil. The quality of extra virgin olive oil varies depending on a number of factors, including the point when the olives are harvested to the method used for processing them."
    );

    let q4 = new Question(
        "What's the difference between an Osteria and a Trattoria?",
        ["Osteria is a more formal eating place than Trattoria.",
            "Osteria is a less formal eating place than Trattoria.",
            "Both are the same."],
        "B",
        "A trattoria is an Italian-style eating establishment, less formal than a ristorante, but more formal than an osteria. There are generally no printed menus, the service is casual, wine is sold by the decanter rather than the bottle, prices are low, and the emphasis is on a steady clientele rather than on haute cuisine. The food is modest but plentiful (mostly following regional and local recipes) and in some instances is even served family-style. "
    );

    let q5 = new Question(
        "Which group contains an invalid pasta name?",
        ["Lasagne, Spaghetti, Macaroni, Raioli",
            "Rigatoni, Penne, Linguine, Vermicelli",
            "Fettuccine, Tortellini, Alfredo, Calzone"],
        "C",
        "All are pasta names except Calzone. A calzone is an Italian oven-baked folded pizza that originated in Naples. A typical calzone is made from salted bread dough, baked in an oven and is stuffed with salami, ham or vegetables, mozzarella, ricotta and Parmesan or pecorino cheese, as well as an egg."
    );

    let q6 = new Question(
        "Who invented pizza?",
        ["Persians",
            "Greeks",
            "Are you kidding me? The Italians, and don't you fuggedaboutit."],
        "B",
        "It is common belief that pizza was an invention by the Italians. However, the history of pizza goes back to the ancient times in the Middle East. The Greeks, Egyptians, Armenians, Israelis, and Babylonians were making some derivative of pizza in the ancient times. They would cook flat bread in mud ovens. It was back in the year 1522 when tomatoes were brought back to Europe all the way from Peru. The poorer people of Naples of Italy initially thought the fruit to be poisonous but later consumed it by placing it over their yeast dough and giving birth to a crude form of pizza. "
    );
   
    let q7 = new Question(
        "Risotto is an Italian dish made out of _____?",
        ["Rice",
            "Pasta",
            "Potato"],
        "A",
        "Risotto is a northern Italian rice dish cooked in a broth to a creamy consistency. The broth can be derived from meat, fish, or vegetables. Many types of risotto contain butter, wine, onion, and parmesan cheese. It is one of the most common ways of cooking rice in Italy. "
    );
   
    let q8 = new Question(
        "Mozzarella cheese is a sliceable curd cheese originating in Italy. Traditional Mozzarella cheese is made from milk of ____?",
        ["Goat",
            "Llama",
            "Water buffalo"],
        "C",
        "Mozzarella is a traditionally southern Italian cheese made from Italian water buffalo's milk herded in very few countries such as Italy and Bulgaria. However, most of the Mozzarella cheeses available now are made from cow's milk."
    );

    let q9 = new Question(
        "You find yourself in Lombardy, northern Italy. You are offered a glass of sparkling white wine that the locals are immensely proud of. What wine would this be?",
        ["Tuscany",
            "Piedmont",
            "Franciacorta"],
        "C",
        "Franciacorta and Prosecco are both Itanlian sparling wines. Franciacorta is produced using the ‘traditional method’ – the same as for Champagne – with a secondary fermentation taking place in the bottle. Contrastingly, most Prosecco is made using the ‘tank method’, where secondary fermentation takes place in stainless steel tanks before bottling."
    );

    let q10 = new Question(
        " In the US, the terms marinara sauce and the following can be used almost interchangeably.",
        ["Spaghetti sauce",
            "Green sauce",
            "Ragu sauce"],
        "A",
        "Marinara sauce is an Italian tomato sauce, usually made with tomatoes, garlic, herbs, and onions.Its many variations can include the addition of capers, olives, spices, and a dash of wine."
    );
    
    
    // let questions = [q1, q2, q3, q4];
    // let inputs = ["A", "A", "B", "A"];

    let questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    // let questions = [q1, q2, q3, q4];

    let guesses = [];
    let score = 0;
    let count = 0;

    isGameStarted = false;
    isNextChosen = false;
    isChoiceChosen = false;

    const TIMECOUNTDWN = 8;
    let time = TIMECOUNTDWN;

    resetGame();


    // for (let i = 0; i < questions.length; i++) {
    //     checkAnswer(questions[i], inputs[i]);
    //     console.log(score);
    // }

    $(".choice").on("click", function () {

        if (isGameStarted && !isChoiceChosen) {
            stopAll();
            isNextChosen = false;
            isChoiceChosen = true;
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