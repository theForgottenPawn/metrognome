$(document).ready(function() {
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
  });
});