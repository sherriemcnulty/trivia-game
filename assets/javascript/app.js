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
        question: '"Intelligence plus character—that is the goal of true education."',
        option1: 'Maya Angelou',
        option2: 'Dr. Martin Luther King Jr.',
        option3: 'Mahatma Gandhi',
        answer: 'Dr. Martin Luther King Jr.'
    },
    {
        question: '"If you are always trying to be normal you will never know how amazing you can be."',
        option1: 'Maya Angelou',
        option2: 'Nelson Mandela',
        option3: 'Mahatma Gandhi',
        answer: 'Maya Angelou'
    },
    {
        question: '"Be the change that you wish to see in the world."',
        option1: 'Maya Angelou',
        option2: 'Mother Teresa',
        option3: 'Mahatma Gandhi',
        answer: 'Mahatma Gandhi'
    },
    {
        question: '"If you want to change the world, go home and love your family."',
        option1: 'Mahatma Gandhi',
        option2: 'Mother Teresa',
        option3: 'Dr. Martin Luther King Jr.',
        answer: 'Mother Teresa'
    },
    {
        question: '"Do not learn how to react learn how to respond."',
        option1: 'Buddha',
        option2: 'Confucius',
        option3: 'Aristotle',
        answer: 'Buddha'
    },
    {
        question: '"True peace is not merely the absence of tension; it is the presence of justice."',
        option1: 'Dr. Martin Luther King Jr.',
        option2: 'Malcolm X',
        option3: 'Mahatma Gandhi',
        answer: 'Dr. Martin Luther King Jr.'
    },
    {
        question: '"Obstacles are those frightful things you see when you take your eyes off the goal."',
        option1: 'Steve Jobs',
        option2: 'Albert Einstein',
        option3: 'Henry Ford',
        answer: 'Henry Ford'
    },
    {
        question: '"It always seems impossible until it\'s done."',
        option1: 'Nelson Mandela',
        option2: 'Dr. Martin Luther King Jr.',
        option3: 'Mahatma Gandhi',
        answer: 'Nelson Mandela'
    },
    {
        question: '"Resentment is like drinking poison and then hoping it will kill your enemies."',
        option1: 'Mahatma Gandhi',
        option2: 'Nelson Mandela',
        option3: 'Dr. Martin Luther King Jr.',
        answer: 'Nelson Mandela'
    },
    {
        question: '"Only two things are infinite, the universe and human stupidity, and I\'m not sure about the former."',
        option1: 'Winston Churchill',
        option2: 'Albert Einstein',
        option3: 'Isaac Newton',
        answer: 'Albert Einstein'
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
    $('#result').text('Congratulations! You got ' + numCorrect + ' answers right out of ' + numAsked + ' questions.');

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