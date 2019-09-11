$(document).ready(() => {
  // Start of Beats related code
  // Components
  const BEATSVISUAL = $('.beats-visual');
  const EMPHASIZE1STBEAT = $('#emphasize-1st-beat');
  const BEATCOUNT = $('#beat-count');
  // Variable
  let currentBeat = 0;

  // Event handlers
  BEATCOUNT.change(() => {
    // When BEATCOUNT's value changes, it will first delete all '.beats'
    // compnents found inside '.beats-visual', and fill it again with new
    // 'beats' component as many as BEATCOUNT value indicated
    currentBeat = 0;
    BEATSVISUAL.find('.beat').remove();

    for (let x = 0; x < BEATCOUNT.val(); x += 1) {
      const SRC = 'img/beats/beat_1.png';
      const BEAT = `<img src=${SRC} class='beat'>`;
      BEATSVISUAL.append(BEAT);
    }
  });
  // End of Beats related code

  // Start of NotesPerBeat code
  // Components
  const SINGLEBTN = $('#single-btn');
  const TUPLETSBTN = $('#tuplets-btn');
  const TRIPLETSBTN = $('#triplets-btn');
  const TRIPLETSMIDRESTBTN = $('#triplets-mid-rest-btn');
  const QUADRUPLETSBTN = $('#quadruplets-btn');
  // Variables
  const synthBlend = {
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 0,
      release: 0.01,
    },
  };
  const synth = new Tone.Synth(synthBlend).toMaster();
  const synth2 = new Tone.Synth(synthBlend).toMaster();
  synth2.volume.value = -6;
  let note = 'Single';

  // functions
  const changeNote = function changeTheNote(noteBtn, noteName) {
    if (!noteBtn.hasClass('focused')) {
      note = noteName;
      $('.note-btn').removeClass('focused');
      noteBtn.addClass('focused');
    }
  };

  const quarter = function quarterNote(isFirstBeat) {
    firstBeatPlay(isFirstBeat);
  };

  const playTuplets = function playTupletsNote(isFirstBeat, bpm) {
    const INTERVAL = Math.round(bpm / 2);

    firstBeatPlay(isFirstBeat);

    setTimeout(() => { NORMALBEAT.play(); }, INTERVAL);
  };

  const playTriplets = function playTripletsNote(isFirstBeat, bpm) {
    const INTERVAL = Math.round(bpm / 3);

    firstBeatPlay(isFirstBeat);

    for (let i = 0; i < 2; i += 1) {
      setTimeout(() => { NORMALBEAT.play(); }, INTERVAL);
    }
  };

  const playTripletsMidRest = function playTripletsMidRestNote(isFirstBeat, bpm) {
    const INTERVAL = Math.round((bpm / 3) * 2);

    firstBeatPlay(isFirstBeat);

    setTimeout(() => { NORMALBEAT.play(); }, INTERVAL);
  };

  const playQuadruplets = function playQuadrupletsNote(isFirstBeat, bpm) {
    const INTERVAL = Math.round(bpm / 4);

    firstBeatPlay(isFirstBeat);

    for (let i = 0; i < 3; i += 1) {
      setTimeout(() => { NORMALBEAT.play(); }, INTERVAL);
    }
  };

  // Events listeners
  SINGLEBTN.click(() => {
    changeNote(SINGLEBTN, 'Single');
  });

  TUPLETSBTN.click(() => {
    changeNote(TUPLETSBTN, 'Tuplets');
  });

  TRIPLETSBTN.click(() => {
    changeNote(TRIPLETSBTN, 'Triplets');
  });

  TRIPLETSMIDRESTBTN.click(() => {
    changeNote(TRIPLETSMIDRESTBTN, 'Triplets Mid Rest');
  });

  QUADRUPLETSBTN.click(() => {
    changeNote(QUADRUPLETSBTN, 'Quadruplets');
  });
  // End of NotesPerBeat code

  // Start of Metronome related codes
  // Metronome components
  const BPMRANGESLIDER = $('#bpm-range-slider');
  const BPMINDICATOR = $('#bpm-indicator');
  const PLAYPAUSEBTN = $('#play-pause-btn');
  const BPMINCREASEBTN = $('#bpm-increase-btn');
  const BPMDECREASEBTN = $('#bpm-decrease-btn');
  const PLAYBUTTONLOGO = $('#play-pause-btn > .logo');
  // Variables
  let playInterval = null;

  // Functions
  const playBeat = function playingTheBeat() {
    currentBeat += 1;
    let beatToPlay = NORMALBEAT;
    const CURRVISBEAT = BEATSVISUAL.find(`.beat:nth-child(${currentBeat})`);

    if (currentBeat === 1) {
      BEATSVISUAL.find('.beat').removeClass('beat-played');
      CURRVISBEAT.addClass('beat-played');

      if (EMPHASIZE1STBEAT[0].checked) {
        beatToPlay = EMPHASISBEAT;
      }
    } else if (currentBeat === Number(BEATCOUNT.val(), 10)) {
      CURRVISBEAT.addClass('beat-played');
      currentBeat = 0;
    } else {
      CURRVISBEAT.addClass('beat-played');
    }

    beatToPlay.play();
  };

  const playMetronome = function playTheMetronome() {
    // It plays the metronome by resetting the 'playInterval' - indicating the
    // sets of actions & decisions it must do every single time and seconds it
    // takes before the said sets of instructions execute again.
    clearInterval(playInterval);
    playInterval = setInterval(() => { playBeat(); },
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
