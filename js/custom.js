$(document).ready(function() {
  // Start of Metronome related codes
  // Metronome components
  const BPMRANGESLIDER = $('#bpm-range-slider');
  const BPMINDICATOR = $('#bpm-indicator');
  const PLAYPAUSEBTN = $('#play-pause-btn');
  const BPMINCREASEBTN = $('#bpm-increase-btn');
  const BPMDECREASEBTN = $('#bpm-decrease-btn');
  // Variables
  const NORMALBEAT = new Audio('audio/beat_01.mp3');
  let play_interval = null;

  // Functions
  const playMetronome = function playTheMetronome() {
    clearInterval(play_interval);
    NORMALBEAT.play();
    play_interval = setInterval(function() { NORMALBEAT.play(); },
                                Math.round(60000/BPMRANGESLIDER.val()));
  };

  const changeBpmAndPlay = function changeBpmEvenWhenPlaying() {
    let logo = PLAYPAUSEBTN.children('.logo');

    if (logo.hasClass('glyphicon-pause')) {
      playMetronome();
    }
  };

  const minorBpmAdjust = function adjustBpmByOne(direction) {
    let new_bpm = null;

    if (direction === 'increase') {
      new_bpm = Number.parseInt(BPMRANGESLIDER.val()) + 1;
    } else if (direction === 'decrease') {
      new_bpm = Number.parseInt(BPMRANGESLIDER.val()) - 1;
    } else {
      console.error('Invalid parameter(s). function minorBpmAdjust requires ' +
                    'only one parameter, either "increase" or "decrease"');

      return null;
    }

    BPMRANGESLIDER.val(new_bpm);
    BPMINDICATOR.text(new_bpm);
    changeBpmAndPlay();
  };

  // Events listeners
  // This plays/pauses the metronome
  PLAYPAUSEBTN.click(function() {
    let logo = $(this).children('.logo');

    // for changing the logo
    logo.toggleClass('glyphicon-play');
    logo.toggleClass('glyphicon-pause');

    if (logo.hasClass('glyphicon-pause')) {
      playMetronome();
    } else if (logo.hasClass('glyphicon-play')) {
      clearInterval(play_interval);
    } else {
      clearInterval(play_interval);
    }
  });

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', function() {
    BPMINDICATOR.text($(this).val());

    changeBpmAndPlay();
  });

  BPMINCREASEBTN.click(function() {
    if (Number.parseInt(BPMRANGESLIDER.val()) < 260) {
      minorBpmAdjust('increase');
    }
  });

  BPMDECREASEBTN.click(function() {
    if (Number.parseInt(BPMRANGESLIDER.val()) > 20) {
      minorBpmAdjust('decrease');
    }
  });
  // End of Metronome related codes
});