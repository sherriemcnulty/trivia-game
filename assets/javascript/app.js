// ------ MAIN PROGRAM ------ //
// INITIALIZE THE DISPLAY
$('rules-section').show();
$('#quiz-section').css('visibility', 'hidden');
$('#result').text('');

// LISTEN FOR EVENTS
window.onload = function () {

    $('#start').click(function () {

        startGame();

    });

    $('#quiz-form input').on('change', function () {

        var value = $('input[name=opt]:checked', '#quiz-form').val();

        timer.stop();

        clearTimeout(timer.timeoutId);
        timer.timeoutId = setTimeout(function () {

            checkAnswer(value);

        }, 1000);
    });
};
// ------ END MAIN PROGRAM ------ //

// GLOBAL VARIABLES
var qIndex = 0; // questions array index
var numAsked = 0; // number of questions asked
var numCorrect = 0; // number of correct answers
const questions = [{
        question: 'What hormone does the pancreas produce?',
        option1: 'Prolactin',
        option2: 'Insulin',
        option3: 'Adrenaline',
        answer: 'Insulin'
    },
    {
        question: 'What percent of cells in the human body are bacteria?',
        option1: '18%',
        option2: '35%',
        option3: '90%',
        answer: '90%'
    },
    {
        question: 'In what type of matter are atoms most tightly packed?',
        option1: 'Liquid',
        option2: 'Solid',
        option3: 'Gas',
        answer: 'Solid'
    },
    {
        question: 'What planet has the most moons?',
        option1: 'Jupiter',
        option2: 'Saturn',
        option3: 'Uranus',
        answer: 'Jupiter'
    },
    {
        question: 'Hurricanes only form over _____?',
        option1: 'Warm Water',
        option2: 'Cold Water',
        option3: 'Sirrus Clouds',
        answer: 'Warm Water'
    },
    {
        question: 'Which type of cloud means rain?',
        option1: 'Alto',
        option2: 'Cirrus',
        option3: 'Nimbus',
        answer: 'Nimbus'
    },
    {
        question: 'Who invented the first battery?',
        option1: 'Alessandro Volta',
        option2: 'Isaac Newton',
        option3: 'Benjamin Franklin',
        answer: 'Alessandro Volta'
    },
    {
        question: "What layer of the Earth's atmosphere makes radio communications possible?",
        option1: 'Stratosphere',
        option2: 'Thermosphere',
        option3: 'Ionosphere',
        answer: 'Ionosphere'
    },
    {
        question: 'How many pencils could you produce from the carbon in the average human body?',
        option1: '90',
        option2: '900',
        option3: '9,000',
        answer: '9,000'
    },
    {
        question: 'What is the most abundant element in the Universe?',
        option1: 'Hydrogen',
        option2: 'Iron',
        option3: 'Carbon',
        answer: 'Hydrogen'
    }
]; // questions

// TIMER OBJECT
var timer = {
    startTime: 30,
    time: 30,
    clockRunning: false,
    intervalId: "",
    timeoutId: "",

    // start countdown

    start: function () {

        // reset the timer
        var seconds = timer.startTime;
        timer.time = seconds;

        // display seconds
        $('#clock').text('00:' + seconds);

        // start countdown
        if (!timer.clockRunning) {

            // count is the timer's workhorse
            timer.intervalId = setInterval(timer.count, 1000);
            timer.clockRunning = true;
        }
    }, // start()

    // stop countdown
    stop: function () {

        timer.clockRunning = false;
        clearInterval(timer.intervalId);
    }, // stop()

    // countdown: this is the timer's workhorse
    count: function () {

        timer.time--;
        var t = timer.time;

        if (t < 1) { // time's up
            $('#clock').text('00:00');
            timer.stop();

            timer.timeoutId = setTimeout(function () {
                checkAnswer('-1');
            }, 1000);

        } else if (t < 10) { // single digit
            $('#clock').text('00:0' + t);

        } else {
            $('#clock').text('00:' + t);
        }
    }, // count()
}; // timer

// FUNCTIONS
function startGame() {
    // switch from rules display to quiz display
    $('#rules-section').hide();
    $('#quiz-section').css('visibility', 'visible');
    $('#quiz-form').css('visibility', 'visible');
    $('#clock').css('visibility', 'visible');
    // load the first question
    getQuestion();
} // startGame()

function getQuestion() {

    // qIndex is a global index into the questions array
    var i = qIndex;

    if (i === questions.length) { // no more questions

        endGame();

    } else {
        // reset radio buttons
        $('.option').attr('disabled', false);
        $('.option').prop('checked', false);

        // display the question
        $('#question').text(questions[i].question);
        $('#label-1').text(questions[i].option1);
        $('#label-2').text(questions[i].option2);
        $('#label-3').text(questions[i].option3);
        $('#answer').text('');

        // set timer
        timer.start();

        timer.timeoutID = setTimeout(function () {
            return;
        }, timer.startTime * 3000);
    }
} // getQuestion()

function checkAnswer(value) {
    var choice;
    var answer = questions[qIndex].answer;

    numAsked++;
    $('.option').attr('disabled', true);

    // get label text by button value
    switch (value) {
        case ('1'):
            {
                choice = $('#label-1').text();
                break;
            }
        case ('2'):
            {
                choice = $('#label-2').text();
                break;
            }
        case ('3'):
            {
                choice = $('#label-3').text();
                break;
            }
        case ('-1'):
            {
                choice = '-1';
            }
    } // switch

    if (choice === answer) {
        numCorrect++;
        $('#answer').text('Yes! The correct answer is ' + answer + '.');

    } else if (choice === '-1') {
        $('#answer').text('Too slow! The correct answer is ' + answer + '.');
    } else {
        $('#answer').text('Nope! The correct answer is ' + answer + '.');
    }

    // prepare for next question
    qIndex++;
    timer.timeoutId = setTimeout(function () {
        getQuestion();
    }, 3000);
} // checkAnswer()

function endGame() {
    timer.stop();

    // display results
    $('#quiz-form').css('visibility', 'hidden');
    $('#clock').css('visibility', 'hidden');
    $('#answer').text('');
    $('#result').text('Congratulations! You got ' + numCorrect + ' answers right out of ' + numAsked + '.');

    timer.timeoutId = setTimeout(function () {
        resetGame();
    }, 3000);
} // endGame()

function resetGame() {

    qIndex = 0;
    $('#rules-section').show();
    $('#answer').text('');
    $('#result').text('');
    $('#quiz-section').css('visibility', 'hidden');
} // resetGame()