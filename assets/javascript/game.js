const trivia = [{
    question: "Which molecule has been referred to as the 'Spirit Molecule' for its ability to induce intense mystical experiences?",
    choices: ["N,N-Dimethyltryptamine", "Lysergic acid diethylamide", "Tetrahydrocannabinol", "3,4-Methylenedioxymethamphetamine"],
    answer: "N,N-Dimethyltryptamine"
},{
    question: "Who is the 'Father of LSD' & author of 'LSD: My Problem Child'?",
    choices: ["Timothy Leary", "Alexander Shulgin", "William Leonard Pickard", "Albert Hoffman"],
    answer: "Albert Hoffman"
},{
    question: "Which naturally occuring psychedelic was discovered in 1956 and had its active molecule isolated in 1958 by Albert Hoffman?",
    choices: ["Ayuhasca", "Psilocybe Cubensis", "Peyote", "Bufo Alvarius Toad Venom"],
    answer: "Psilocybe Cubensis"
},{
    question: "Which is a quote from 'Fear and Loathing in Las Vegas'?",
    choices: ["'Frankly, my dear, I don't give a damn.'", "'I'm as mad as hell, and I'm not going to take this anymore!'", "'We can't stop here, this is bat country!'", "'You're gonna need a bigger boat.'"],
    answer: "'We can't stop here, this is bat country!'"
},{
    question: "Which 1969 music festival was host to over 500,000 attendees?",
    choices: ["Woodstock", "Burning Man", "Coachella", "Bonnaroo"],
    answer: "Woodstock"
}];

let timeIndex;

let game = {

    currentTrivia: 0,
    seconds: 15,

    start: () => {
        
            // Hide Start Button
            $('#startBtn').toggle();

            // Display Question
            $('#question').html(trivia[game.currentTrivia].question);

            // Display Choices
            trivia[0].choices.forEach((choice, index) => {
                //Build choice div to display
                let choices = $('<div>');
                choices.text(choice);
                choices.attr({"data-index": index});
                choices.addClass("choice");
                //Append Choices
                $('#answers').append(choices);
            });

            // Start Timer
            game.timer();

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
    }
}

$('#startBtn').click(() => game.start());