// import $ from 'jquery';

const trivia = [{
    question: "How long does it take for the Moon to complete its phases?",
    choices: ["Twenty-nine and one half days", "Twenty-eight days", "Twenty-seven days", "Twenty-eight and one half days"],
    answer: 0,
    gif: 'assets/images/moon.webp'
},{
    question: "What is the term for the science of timekeeping?",
    choices: ["Quantum Mechanics", "Astrology", "General Relativity", "Horology"],
    answer: 3,
    gif: 'assets/images/time.gif'
},{
    question: "A Jiffy is usually used to indicate a very short period of time, but it is formally defined in the fields of Physics and Chemistry as the time required for light to travel a centimeter. Also known as a light centimeter, a jiffy is equal to about?",
    choices: ["23.3444 picoseconds", "33.3564 picoseconds", "33.3564 milliseconds", "23.3444 milliseconds"],
    answer: 1,
    gif: 'assets/images/light.webp'
},{
    question: "What is an hourglass symbolic of?",
    choices: ["Flow of Time", "Infinity", "Existence is Fleeting", "Time Travel"],
    answer: 2,
    gif: 'assets/images/fleet.gif'
},{
    question: "In the movie Back to the Future the characters would time travel by going 88 miles per hour in what type of car?",
    choices: ["DeLorean", "Porsche", "Ford", "VW Bus"],
    answer: 0,
    gif: 'assets/images/delorean.webp'
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

    timer: () => {
        seconds = 15;
        $("#timer").html("<p>Time Remaining: " + seconds + "</h3>"); //first second of the timer    
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

        let git = $('<img>');
        $(git).attr('src', trivia[game.currentTrivia].gif);
        $('#gif').html(git);

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
        $('#startBtn').hide();
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
            $('#answers').append(choices);
        });

        // Start Timer
        game.timer();
        click();
    },

    score: () => {
        $('#timer').empty();
        $('#message').empty();
        $("#feedback").empty();
        $("#gif").empty();

        $("#message").text(game.messages.done);
        $("#correct").text("Correct: " + game.correct);
        $("#incorrect").text("Incorrect: " + game.incorrect);
        $("#skipped").text("Skipped: " + game.skipped);
        $("#resetBtn").toggle();
    },

    restart: () => {
        $("#resetBtn").toggle();
        $("#message").empty();
        $("#correct").empty();
        $("#incorrect").empty();
        $("#skipped").empty();
        game.correct = 0;
        game.incorrect = 0;
        game.skipped = 0;
        game.currentTrivia = 0;
        game.responded = false;
        game.askTrivia();
    }
}

// Actual start of the game
$('#startBtn').click(() => game.askTrivia());

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