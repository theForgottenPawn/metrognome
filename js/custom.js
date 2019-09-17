$(document).ready(() => {
  // Start of Beats related code
  // Components
  const BEATSVISUAL = $('.beats-visual');
  const EMPHASIZE1STBEAT = $('#emphasize-1st-beat');
  const BEATCOUNT = $('#beat-count');
  // Variable
  let currentBeat = 0;

  // Functions
  const revertVisual = function revertTheVisual() {
    currentBeat = 0;
  };

  const animateVisual = function animateVisualBeat() {
    currentBeat += 1;
    const CURRVISBEAT = BEATSVISUAL.find(`.beat:nth-child(${currentBeat})`);

    if (currentBeat === 1) {
      BEATSVISUAL.find('.beat').removeClass('beat-played');
      CURRVISBEAT.addClass('beat-played');
    } else if (currentBeat >= Number(BEATCOUNT.val(), 10)) {
      CURRVISBEAT.addClass('beat-played');
      revertVisual();
    } else {
      CURRVISBEAT.addClass('beat-played');
    }
  };

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
  // Error-Resolved: Volume too low, can't be heard on built in pc speakers.
  // Please increase.
  synth2.volume.value = -3;
  let mainLoop = null;
  let subLoop = null;
  let npbPlayed = false;
  let note = 'Single';

  // functions
  const npbPlayedToggle = function notesPerbeatPlayedToggle() {
    if (npbPlayed) {
      npbPlayed = false;
    } else {
      npbPlayed = true;
    }
  };

  const setMain = function setMainLoop() {
    mainLoop = new Tone.Loop(() => {
      let chord = 'A5';
      animateVisual();

      if (EMPHASIZE1STBEAT[0].checked && (currentBeat === 1)) {
        chord = 'B6';
      }

      synth.triggerAttackRelease(chord, '0:0:1');
    }, '4n');

    mainLoop.start('+0');
  };

  const singlet = function singletNote() {
    setMain();
    subLoop = null;
  };

  const tuplets = function tupletsNote() {
    setMain();

    subLoop = new Tone.Loop(() => {
      synth2.triggerAttackRelease('G3', '0:0:1');
    }, '8n');

    subLoop.start('+0');
  };

  const triplets = function tripletsNote() {
    setMain();

    subLoop = new Tone.Loop(() => {
      synth2.triggerAttackRelease('G3', '0:0:1');
    }, '8t');

    subLoop.start('+0');
  };

  const tripletsMid = function tripletsMidRestNote() {
    setMain();
    let count = 1;

    subLoop = new Tone.Loop(() => {
      if (count === 1) {
        synth2.triggerAttackRelease('G3', '0:0:1');
      } else if (count >= 3) {
        synth2.triggerAttackRelease('G3', '0:0:1');
        count = 0;
      }

      count += 1;
    }, '8t');

    subLoop.start('+0');
  };

  const quadruplets = function quadrupletsNote() {
    setMain();

    subLoop = new Tone.Loop(() => {
      synth2.triggerAttackRelease('G3', '0:0:1');
    }, '16n');

    subLoop.start('+0');
  };

  const disposeLoops = function disposeTheLoops() {
    if (mainLoop !== null) {
      mainLoop.dispose();
      mainLoop = null;
    }

    if (subLoop !== null) {
      subLoop.dispose();
      subLoop = null;
    }

    // Error-Resolved: This functionality must not depend on a class name or
    // anything at the presentation side. Please revise it.
    if (npbPlayed) {
      Tone.Transport.stop();
      return true;
    }

    return false;
  };

  const setNote = function setTheNote() {
    const FORCE_STOPED = disposeLoops();
    revertVisual();

    if (note === 'Single') {
      singlet();
    } else if (note === 'Tuplets') {
      tuplets();
    } else if (note === 'Triplets') {
      triplets();
    } else if (note === 'Triplets Mid Rest') {
      tripletsMid();
    } else if (note === 'Quadruplets') {
      quadruplets();
    }

    if (FORCE_STOPED) {
      Tone.Transport.start();
    }
  };

  const changeNote = function changeTheNote(noteBtn, noteName) {
    if (!noteBtn.hasClass('focused')) {
      note = noteName;
      $('.note-btn').removeClass('focused');
      noteBtn.addClass('focused');

      setNote();
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
  // Early tweak
  Tone.Transport.bpm.value = Number.parseInt(BPMRANGESLIDER.val(), 10);
  // Variables
  let paused = true;
  let bpmAdjust = null;

  // Functions
  const playMetronome = function playTheMetronome() {
    paused = false;
    // Enhancement: The setNote() function call sets the variables mainLoop and
    // subLoop, in any case those said variables are already set before this
    // function is called then an unnecessary resetting will occur. Try to find
    // a way remove the unnecessary resetting while maintaining it's main
    // behavior which is setting mainLoop and subLoop only if they're not yet
    // set.
    setNote();
    npbPlayedToggle();
    Tone.Transport.start();
  };

  const pauseMetronome = function pauseTheMetronome() {
    paused = true;
    Tone.Transport.stop();
    disposeLoops();
    npbPlayedToggle();
  };

  const setBpm = function setTheBPM(newBpm) {
    BPMINDICATOR.text(newBpm);
    Tone.Transport.bpm.value = newBpm;
  };

  const bpmPlusOne = function increaseBpmByOne() {
    let newBpm = Number.parseInt(BPMRANGESLIDER.val(), 10);

    if (Number.parseInt(BPMRANGESLIDER.val(), 10) < 260) {
      newBpm += 1;
      BPMRANGESLIDER.val(newBpm);
      // Error-Resolved: Duplicated code: create
      // separate  function and call it
      // on functionsthat needs it.
      setBpm(newBpm);
    }
  };

  const bpmMinusOne = function decreaseBpmByOne() {
    let newBpm = Number.parseInt(BPMRANGESLIDER.val(), 10);

    if (Number.parseInt(BPMRANGESLIDER.val(), 10) > 20) {
      newBpm -= 1;
      BPMRANGESLIDER.val(newBpm);
      // Error-Resolved: Duplicated code: create
      // separate  function and call it
      // on functionsthat needs it.
      setBpm(newBpm);
    }
  };

  const minorBpmAdjustLoop = function adjustBpmByOne(direction, willLoop) {
    if (direction === 'increase') {
      if (willLoop) {
        bpmAdjust = setInterval(() => {
          bpmPlusOne();
        }, 200);
      } else {
        bpmPlusOne();
      }
    } else if (direction === 'decrease') {
      if (willLoop) {
        bpmAdjust = setInterval(() => {
          bpmMinusOne();
        }, 200);
      } else {
        bpmMinusOne();
      }
    }
  };

  // Events listeners
  // This plays/pauses the metronome
  PLAYPAUSEBTN.click(() => {
    // for changing the logo
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
    // Error-Resolved: This line was used functional wise which is not advisable, please
    // remove it.

    if (paused) {
      playMetronome();
    } else {
      pauseMetronome();
    }
  });

  // This changes the BPMINDICATOR's text according to BPMRANGESLIDER's value
  BPMRANGESLIDER.on('input', () => {
    setBpm(Number.parseInt(BPMRANGESLIDER.val(), 10));
  });

  // BPMINCREASEBTN events
  BPMINCREASEBTN.click(() => {
    minorBpmAdjustLoop('increase', false);
  });

  BPMINCREASEBTN.mousedown(() => {
    minorBpmAdjustLoop('increase', true);
  });

  BPMINCREASEBTN.mouseup(() => {
    clearInterval(bpmAdjust);
  });

  BPMINCREASEBTN.mouseleave(() => {
    clearInterval(bpmAdjust);
  });

  // BPMDECREASEBTN events
  BPMDECREASEBTN.click(() => {
    minorBpmAdjustLoop('decrease', false);
  });

  BPMDECREASEBTN.mousedown(() => {
    minorBpmAdjustLoop('decrease', true);
  });

  BPMDECREASEBTN.mouseup(() => {
    clearInterval(bpmAdjust);
  });

  BPMDECREASEBTN.mouseleave(() => {
    clearInterval(bpmAdjust);
  });
  // End of Metronome related codes
});
