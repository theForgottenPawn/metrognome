$(document).ready(function() {
  // Metronome components
  let BPMRANGESLIDER = $('#bpm-range-slider');
  let BPMINDICATOR = $('#bpm-indicator');

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', function(e) {
    let bpm = $(this).val();

    BPMINDICATOR.text(bpm);
  });
});