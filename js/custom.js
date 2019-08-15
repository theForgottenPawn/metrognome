$(document).ready(() => {
  // Start of Metronome related codes
  // Metronome components
  const BPMRANGESLIDER = $('#bpm-range-slider');
  const BPMINDICATOR = $('#bpm-indicator');
  const PLAYPAUSEBTN = $('#play-pause-btn');
  const BPMINCREASEBTN = $('#bpm-increase-btn');
  const BPMDECREASEBTN = $('#bpm-decrease-btn');
  // Variables
  const NORMALBEAT = new Audio('audio/beat_01.mp3');
  let playInterval = null;

  // Functions
  const playMetronome = function playTheMetronome() {
    clearInterval(playInterval);
    NORMALBEAT.play();
    playInterval = setInterval(() => { NORMALBEAT.play(); },
      Math.round(60000 / BPMRANGESLIDER.val()));
  };

  const changeBpmAndPlay = function changeBpmEvenWhenPlaying() {
    const LOGO = PLAYPAUSEBTN.children('.logo');

    if (LOGO.hasClass('glyphicon-pause')) {
      playMetronome();
    }
  };

  const minorBpmAdjust = function adjustBpmByOne(direction) {
    let newBpm = null;

    if (direction === 'increase') {
      newBpm = Number.parseInt(BPMRANGESLIDER.val(), 10) + 1;
    } else if (direction === 'decrease') {
      newBpm = Number.parseInt(BPMRANGESLIDER.val(), 10) - 1;
    }

    BPMRANGESLIDER.val(newBpm);
    BPMINDICATOR.text(newBpm);
    changeBpmAndPlay();
  };

  // Events listeners
  // This plays/pauses the metronome
  PLAYPAUSEBTN.click(function playButtonClick() {
    const LOGO = $(this).children('.logo');

    // for changing the logo
    LOGO.toggleClass('glyphicon-play');
    LOGO.toggleClass('glyphicon-pause');

    if (LOGO.hasClass('glyphicon-pause')) {
      playMetronome();
    } else if (LOGO.hasClass('glyphicon-play')) {
      clearInterval(playInterval);
    } else {
      clearInterval(playInterval);
    }
  });

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', function bpmRangeSliderInput() {
    BPMINDICATOR.text($(this).val());

    changeBpmAndPlay();
  });

  BPMINCREASEBTN.click(() => {
    if (Number.parseInt(BPMRANGESLIDER.val(), 10) < 260) {
      minorBpmAdjust('increase');
    }
  });

  BPMDECREASEBTN.click(() => {
    if (Number.parseInt(BPMRANGESLIDER.val(), 10) > 20) {
      minorBpmAdjust('decrease');
    }
  });
  // End of Metronome related codes
});
