//----- event handlers -----//

window.onload = function () {

     $('#start-btn').click(function () {

          startGame();

     });

     $('#quiz-form input').on('change', function () {

          var value = $('input[name=opt]:checked', '#quiz-form').val();

          timer.stop();

          clearTimeout(timer.timeoutId);
          timer.timeoutId = setTimeout(function () {

               checkAnswer(value);

          }, 2500);
     });
};

//----- variables -----//


var timeoutId; // coordinates questions with timer
var clockRunning = false; // determines whether to clear interval
var quizIndex = 0; // input array
var numAsked = 0; // number of questions asked
var numCorrect = 0; // number of correct answers

var timer = {

     totalSeconds: 30,
     time: totalSeconds,
     intervalId: "",
     timeoutId: "",

     // start countdown

     start: function () {

          // reset the timer

          var seconds = this.totalSeconds;
          timer.time = seconds;

          // display seconds
          $('#clock').text('00:' + seconds);

          // start countdown

          if (!clockRunning) {

               // count() is the timer's workhorse

               this.intervalId = setInterval(timer.count, 1000);
               clockRunning = true;
          }
     },

     // stop game & show answers

     stop: function () {

          clockRunning = false;
          clearInterval(this.intervalId);
     },

     // countdown

     count: function () {

          timer.time--;
          var t = timer.time;

          if (t < 1) {

               // time's up

               $('#clock').text('00:00');
               timer.stop();

               this.timeoutId = setTimeout(function () {

                    checkAnswer('-1');

               }, 1000);

          } else if (t < 10) {

               // single digit

               $('#clock').text('00:0' + t);

          } else {

               $('#clock').text('00:' + t);
          }
     }
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

$('#rules-section').show();
/*
$('#quiz-form').css('visibility', 'hidden');
$('#quiz-section').css('visibility', 'hidden');
*/
$('#quiz-section').hide();
$('#answer').empty();
$('#result').empty();


function startGame() {

     // switch display to rules 
     $('#rules-section').hide();
     $('#quiz-section').css('visibility', 'visible');
     $('#quiz-form').css('visibility', 'visible');

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

          this.timeoutID = setTimeout(function () {
               return;
          }, this.totalSeconds * 1000);

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

     this.timeoutId = setTimeout(function () {

          getQuestion();

     }, 2500);

}

function endGame() {

     timer.stop();

     // display results

     $('#quiz-form').css('visibility', 'hidden');
     $('#answer').text('');
     $('#result').text('You got ' + numCorrect + ' answers right out of ' + numAsked + ' questions.');

     timeoutId = setTimeout(function () {

          resetGame();

     }, 2500);
}

function resetGame() {

     quizIndex = 0;
     $('#start').show();
     $('#rules-section').show();
     $('#answer').text('');
     $('#result').text('');
     $('#quiz-form').css('visibility', 'hidden');
     $('#quiz-section').css('visibility', 'hidden');
}