//----- event handlers -----//

window.onload = function() {

    $('#start').click(function() {

        startGame();

    });

    $('#quiz-form input').on('change', function() {

        var value = $('input[name=opt]:checked', '#quiz-form').val();

        timer.stop();

        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {

            checkAnswer(value);

        }, 1000);
    });
};

//----- variables -----//

var totalSeconds = 10; // number of seconds per question
var intervalId; // timer second intervals
var timeoutId; // coordinates questions with timer
var clockRunning = false; // determines whether to clear interval
var quizIndex = 0; // input array
var numAsked = 0; // number of questions asked
var numCorrect = 0; // number of correct answers

var timer = {

    time: totalSeconds,

    // start countdown

    start: function() {

        // reset the timer

        var seconds = totalSeconds;
        timer.time = seconds;

        // display seconds

        timer.audioUpdate(seconds);
        $('#clock').text('00:' + seconds);

        // start countdown

        if (!clockRunning) {

            // count() is the timer's workhorse

            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },

    // stop game & show answers

    stop: function() {

        clockRunning = false;
        clearInterval(intervalId);
    },

    // countdown

    count: function() {

        timer.time--;
        var t = timer.time;

        if (t < 1) {

            // time's up

            $('#clock').text('00:00');
            timer.stop();
            timer.audioUpdate(t);

            timeoutId = setTimeout(function() {

                checkAnswer('-1');

            }, 1000);

        } else if (t < 10) {

            // single digit

            $('#clock').text('00:0' + t);

        } else {

            $('#clock').text('00:' + t);

            // audio countdown every 10 seconds

            if ((t % 10) === 0) {

                timer.audioUpdate(t);
            }
        }
    },

    // audio countdown

    audioUpdate: function(seconds) {

        var recording;

        switch (seconds) {
            case 60:
                recording = 'assets/audio/begin.mp3';
                break;
            case 50:
                recording = 'assets/audio/50-seconds.mp3';
                break;
            case 40:
                recording = 'assets/audio/40-seconds.mp3';
                break;
            case 30:
                recording = 'assets/audio/30-seconds.mp3';
                break;
            case 20:
                recording = 'assets/audio/20-seconds.mp3';
                break;
            case 10:
                recording = 'assets/audio/10-seconds.mp3';
                break;
            case 0:
                recording = 'assets/audio/stop.mp3';
                break;
        }

        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', recording);
        audioElement.play();
    },
};

//----- input array (questions and answers) -----//

var quizArr = [{
        question: 'Who invented the first printing press?',
        option1: 'Johannes Gutenberg',
        option2: 'Wang Chen',
        option3: 'Bi Sheng',
        answer: 'Bi Sheng'
    },
    {
        question: 'Who was the first person to experiment with electricity?',
        option1: 'Nikola Tesla',
        option2: 'Girolamo Cardano',
        option3: 'Thales of Miletus',
        answer: 'Thales of Miletus'
    },
    {
        question: 'Who invented the first motorized car?',
        option1: 'Carle Benz',
        option2: 'Henry Ford',
        option3: 'Nicolas-Joseph Cugnot',
        answer: 'Nicolas-Joseph Cugnot'
    },
    {
        question: 'Who invented the first computer?',
        option1: 'Charles Babbage',
        option2: 'Pierre Jaquet-Droz',
        option3: 'Hipparchus',
        answer: 'Charles Babbage'
    },
    {
        question: 'Who invented the atom bomb?',
        option1: 'Albert Einstein',
        option2: 'J.Robert Oppenheimer',
        option3: 'Neither',
        answer: 'Neither'
    },
    {
        question: 'Who invented the first radio?',
        option1: 'Nikola Tesla',
        option2: 'Guglielmo Marconi',
        option3: 'Heinrich HertzHeinrich Hertz',
        answer: 'Guglielmo Marconi'
    }
];

//----- this is where the action takes place -----//

// initial state displays rules and start button

$('rules-section').show();
$('#quiz-section').css('visibility', 'hidden');
$('#result').text('');


function startGame() {

    // switch display to rules 
    $('#start').hide();
    $('#rules-section').hide();
    $('#quiz-section').css('visibility', 'visible');

    // start volley between questions and answers
    getQuestion();
}

function getQuestion() {

    var i = quizIndex;

    if (i === quizArr.length) { // no more questions

        endGame();

    } else {

        // set timer
        timer.start();

        timeoutID = setTimeout(function() {
            return;
        }, totalSeconds * 1000);

        // reset state

        $('.option').attr('disabled', false);
        $('.option').prop('checked', false);

        // load form

        $('#question').text(quizArr[i].question);
        $('#label-1').text(quizArr[i].option1);
        $('#label-2').text(quizArr[i].option2);
        $('#label-3').text(quizArr[i].option3);
        $('#answer').text('');
    }
}

function checkAnswer(value) {

    var choice;
    var answer = quizArr[quizIndex].answer;

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
    }

    if (choice === answer) {

        numCorrect++;
        $('#answer').text('Yes! The correct answer is ' + answer + '.');

    } else if (choice === '-1') {

        $('#answer').text('Too slow! The correct answer is ' + answer + '.');

    } else {

        $('#answer').text('Nope! The correct answer is ' + answer + '.');
    }

    // prepare for next question

    quizIndex++;

    timeoutId = setTimeout(function() {

        getQuestion();

    }, 1000);

}

function endGame() {

    timer.stop();

    // display results

    $('#quiz-section').css('visibility', 'hidden');
    $('#answer').text('');
    $('#result').text('Congratulations! You got ' + numCorrect + ' answers right out of ' + numAsked + ' questions.');

    timeoutId = setTimeout(function() {

        resetGame();

    }, 1000);
}

function resetGame() {

    quizIndex = 0;
    $('#start').show();
    $('#rules-section').show();
    $('#answer').text('');
    $('#result').text('');
    $('#quiz-section').css('visibility', 'hidden');
}