$(document).ready(function() {
  // Variables
  let normal_beat = new Audio('audio/beat_01.mp3');
  let play_interval = null;
  // Metronome components
  let BPMRANGESLIDER = $('#bpm-range-slider');
  let BPMINDICATOR = $('#bpm-indicator');
  let PLAYPAUSEBTN = $('#play-pause-btn');

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', function(e) {
    let bpm = $(this).val();

    BPMINDICATOR.text(bpm);
  });

  // This plays/pauses the metronome
  PLAYPAUSEBTN.click(function(e) {
    let logo = $(this).children('.logo');

    // for changing the logo
    logo.toggleClass('glyphicon-play');
    logo.toggleClass('glyphicon-pause');

    if (logo.hasClass('glyphicon-pause')) {
      normal_beat.play();
      play_interval = setInterval(function() { normal_beat.play(); }, 1000);
    } else if (logo.hasClass('glyphicon-play')) {
      clearInterval(play_interval);
    } else {
      clearInterval(play_interval);
    }
  });
});