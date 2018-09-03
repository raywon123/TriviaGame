$(document).ready(function () {


    window.onload = function () {
        // $("#start").on("click", game.start);
        // $("#stop").on("click", game.stop);
        // $("#reset").on("click", game.reset);
    };

    // This function remove element from an array
    function removeElement(array, element) {
        let index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    }

    // Object for Questions
    function Question(question, choices, answer) {
        this.question = question;
        this.choices = choices;
        this.answer = answer;

        this.displayQuestion = function () {
            console.log(this.question);
        };

        this.displayChoices = function () {
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
            console.log("Correct");
        }
        else {
            console.log("Incorrect");
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



    let q1 = new Question("What is A", ["A", "B", "C"], "A");
    let q2 = new Question("What is B", ["A", "B", "C"], "B");
    let q3 = new Question("What is C", ["A", "B", "C"], "C");
    let q4 = new Question("What is A", ["A", "B", "C"], "A");
    let q5 = new Question("What is B", ["A", "B", "C"], "B");
    let q6 = new Question("What is C", ["A", "B", "C"], "C");

    let questions = [q1, q2, q3, q4];
    let inputs = ["A", "A", "B", "A"];
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
        playGame(questions[i], inputs[i]);
        console.log(score);
    }
    console.log("final score = " + score);

});