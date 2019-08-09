$(document).ready(function() {
  // Metronome components
  let BPMRANGESLIDER = $('#bpm-range-slider');
  let BPMINDICATOR = $('#bpm-indicator');
  let PLAYPAUSEBTN = $('#play-pause-btn');
  let BPMINCREASEBTN = $('#bpm-increase-btn');
  let BPMDECREASEBTN = $('#bpm-decrease-btn');
  // Variables
  let normal_beat = new Audio('audio/beat_01.mp3');
  let play_interval = null;

  // Functions
  function playMetronome() {
    clearInterval(play_interval);
    normal_beat.play();
    play_interval = setInterval(function() { normal_beat.play(); },
                                Math.round(60000/BPMRANGESLIDER.val()));
  }

  function changeBpmEvenWhenPlaying() {
    let logo = PLAYPAUSEBTN.children('.logo');

    if (logo.hasClass('glyphicon-pause')) {
      playMetronome();
    }
  }

  function adjustBpmByOne(direction) {
    let new_bpm = null;

    if (direction === 'increase') {
      new_bpm = Number.parseInt(BPMRANGESLIDER.val()) + 1;
    } else if (direction === 'decrease') {
      new_bpm = Number.parseInt(BPMRANGESLIDER.val()) - 1;
    } else {
      console.error('Invalid parameter(s). function adjustBpmByOne requires ' +
                    'only one parameter, either "increase" or "decrease"');

      return null;
    }

    BPMRANGESLIDER.val(new_bpm);
    BPMINDICATOR.text(new_bpm);
    changeBpmEvenWhenPlaying();
  }

  // Events listeners
  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', function(e) {
    BPMINDICATOR.text($(this).val());

    changeBpmEvenWhenPlaying();
  });

  // This plays/pauses the metronome
  PLAYPAUSEBTN.click(function(e) {
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

  BPMINCREASEBTN.click(function() {
    if (Number.parseInt(BPMRANGESLIDER.val()) < 260) {
      adjustBpmByOne('increase');
    }
  });

  BPMDECREASEBTN.click(function() {
    if (Number.parseInt(BPMRANGESLIDER.val()) > 20) {
      adjustBpmByOne('decrease');
    }
  });
});