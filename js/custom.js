$(document).ready(() => {
  // Start of Beats related code
  // Components
  const BEATSVISUAL = $('.beats-visual');
  const BEATCOUNT = $('#beat-count');

  // Event handlers
  BEATCOUNT.change(() => {
    // When BEATCOUNT's value changes, it will first delete all '.beats'
    // compnents found inside '.beats-visual', and fill it again with new
    // 'beats' component as many as BEATCOUNT value indicated
    BEATSVISUAL.find('.beat').remove();

    for (let x = 0; x < BEATCOUNT.val(); x += 1) {
      const SRC = 'img/beats/beat_1.png';
      const BEAT = `<img src=${SRC} class='beat'>`;
      BEATSVISUAL.append(BEAT);
    }
  });
  // End of Beats related code

  // Start of Metronome related codes
  // Metronome components
  const BPMRANGESLIDER = $('#bpm-range-slider');
  const BPMINDICATOR = $('#bpm-indicator');
  const PLAYPAUSEBTN = $('#play-pause-btn');
  const BPMINCREASEBTN = $('#bpm-increase-btn');
  const BPMDECREASEBTN = $('#bpm-decrease-btn');
  const PLAYBUTTONLOGO = $('#play-pause-btn > .logo');
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
    if (PLAYBUTTONLOGO.hasClass('glyphicon-pause')) {
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
  PLAYPAUSEBTN.click(() => {
    // for changing the logo
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');

    if (PLAYBUTTONLOGO.hasClass('glyphicon-pause')) {
      playMetronome();
    } else if (PLAYBUTTONLOGO.hasClass('glyphicon-play')) {
      clearInterval(playInterval);
    } else {
      clearInterval(playInterval);
    }
  });

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', () => {
    BPMINDICATOR.text(BPMRANGESLIDER.val());

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
