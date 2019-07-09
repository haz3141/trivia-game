// import $ from 'jquery';


const trivia = [{
    question: "Which molecule has been referred to as the 'Spirit Molecule' for its ability to induce intense mystical experiences?",
    choices: ["N,N-Dimethyltryptamine", "Lysergic acid diethylamide", "Tetrahydrocannabinol", "3,4-Methylenedioxymethamphetamine"],
    answer: 0   
},{
    question: "Who is the 'Father of LSD' & author of 'LSD: My Problem Child'?",
    choices: ["Timothy Leary", "Alexander Shulgin", "William Leonard Pickard", "Albert Hoffman"],
    answer: 3
},{
    question: "Which naturally occuring psychedelic was discovered in 1956 and had its active molecule isolated in 1958 by Albert Hoffman?",
    choices: ["Ayuhasca", "Psilocybe Cubensis", "Peyote", "Bufo Alvarius Toad Venom"],
    answer: 1
},{
    question: "Which is a quote from 'Fear and Loathing in Las Vegas'?",
    choices: ["'Frankly, my dear, I don't give a damn.'", "'I'm as mad as hell, and I'm not going to take this anymore!'", "'We can't stop here, this is bat country!'", "'You're gonna need a bigger boat.'"],
    answer: 2
},{
    question: "Which 1969 music festival was host to over 500,000 attendees?",
    choices: ["Woodstock", "Burning Man", "Coachella", "Bonnaroo"],
    answer: 0
}];

let timeIndex;

let game = {

    currentTrivia: 0, seconds: 15, userChoice: -1,
    responded: false,
    correct: 0, incorrect: 0, skipped: 0,

    messages: {
        correct: "Correct!",
        incorrect: "Sorry!",
        noTime: "Oops, you ran out of time!",
        done: "Your Score!"
    },

    start: () => {
            $('#startBtn').toggle();
            game.askTrivia();
    },

    timer: () => {
        seconds = 15;
        $("#timer").html("<p>Time Remaining: " + seconds + "</h3>");
        //timer spindown
        timeIndex = setInterval(game.countdown, 1000);
    },

    countdown: () => {
        seconds--;
        $("#timer").html("<p>Time Remaining: " + seconds + "</h3>");
        if (seconds === 0) {
            clearInterval(timeIndex);
            game.responded = false;
            game.displayFeedback();
        }
    },
    
    displayFeedback: () => {

        $("#question").empty();
        $("#answers").empty();

        let correctChoice = trivia[game.currentTrivia].answer;

        if (game.userChoice === correctChoice && game.responded === true) {
            game.correct++;
            $("#message").text(game.messages.correct);
        } else if (game.userChoice !== correctChoice && game.responded === true) {
            game.incorrect++;
            $("#message").text(game.messages.incorrect);
            $('#feedback').text('The correct answer was: ' + trivia[game.currentTrivia].choices[correctChoice]);
        } else {
            game.skipped++;
            $("#message").text(game.messages.noTime);
            $('#feedback').text('The correct answer was: ' + trivia[game.currentTrivia].choices[correctChoice]);
        }

        //Change Questions - last question and other questions
        if (game.currentTrivia === (trivia.length-1)){
            setTimeout(game.score, 4444)
        } else {
            game.currentTrivia++;
            setTimeout(game.askTrivia, 4444);
        }
    },

    askTrivia: () => {
        $("#feedback").empty();
        $("#message").empty();
        $("#gif").empty();

        // Display Question
        $('#question').html(trivia[game.currentTrivia].question);

        // Display Choices
        trivia[game.currentTrivia].choices.forEach((choice, index) => {
            //Build choice div to display
            let choices = $('<div>');
            choices.text(choice);
            choices.attr({'data-index': index});
            choices.addClass("choice");
            //Append Choices
            $('#answers').append(choices);
        });

        // Start Timer
        game.timer();
        click();
    },

    score: () => {
        //Empty Divs
        $('#timer').empty();
        $('#message').empty();
        $("#feedback").empty();
        $("#gif").empty();

        //Populate Divs
        $("#message").text(game.messages.done);
        $("#correct").text("Correct: " + game.correct);
        $("#incorrect").text("Incorrect: " + game.incorrect);
        $("#skipped").text("Skipped: " + game.skipped);
        $("#resetBtn").toggle();
    },

    restart: () => {
        $("#resetBtn").toggle();
        game.correct = 0;
        game.incorrect = 0;
        game.skipped = 0;
        game.currentTrivia = 0;
    }
}

// Actual start of the game
$('#startBtn').click(() => game.start());
$('#resetBtn').click(() => game.restart());

// Pulled the click function out of the object to better handle 'this'
function click() {
    $('.choice').click(function() {
        clearInterval(timeIndex);
        game.responded = true;
        game.userChoice = parseInt($(this).attr('data-index'));
        console.log(game.userChoice);
        game.displayFeedback();
    });
}