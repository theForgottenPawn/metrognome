$(document).ready(() => {
  // General Variable
  let paused = true;
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

  // Start of Timer related code
  // Components
  const ENABLE_TIMER_TOGGLER = $('#enable-timer-toggler');
  const MIN_SETTER = $('#min-select');
  const SEC_SETTER = $('#sec-select');
  const TIME_RESETTER = $('#time-resetter');
  // Constant Variable
  const MINIMUM_TIME = [0, 10];
  // Variables
  let min = Number.parseInt(MIN_SETTER.val(), 10);
  let sec = Number.parseInt(SEC_SETTER.val(), 10);
  let timerInterval = null;

  // Funcitons
  const enableTimeEditing = function enableTheTimeEditing() {
    MIN_SETTER.attr('disabled', false);
    SEC_SETTER.attr('disabled', false);
    TIME_RESETTER.attr('disabled', false);

    if ($('.remaining-time-wrapper')) {
      ENABLE_TIMER_TOGGLER.attr('disabled', false);
      $('.remaining-time-wrapper').addClass('disabled');
    }
  };

  const disableTimeEditing = function disableTheTimeEditing() {
    MIN_SETTER.attr('disabled', true);
    SEC_SETTER.attr('disabled', true);
    TIME_RESETTER.attr('disabled', true);

    if ($('.remaining-time-wrapper')) {
      $('.remaining-time-wrapper').removeClass('disabled');
    }
  };

  const padTime = function padTheTime(time) {
    if (time < 10) {
      return `0${time}`;
    }

    return time.toString();
  };

  const createRemaingTime = function createRemaingTimeComponent() {
    const WRAPPER = $('<div>');
    const LABEL = $('<b>Remaining Time: </b>');
    const MIN_MONITOR = $('<span>');
    const SEC_MONITOR = $('<span>');

    WRAPPER.addClass('section remaining-time-wrapper disabled');
    MIN_MONITOR.addClass('time-monitor');
    MIN_MONITOR.attr('id', 'min-monitor');
    MIN_MONITOR.text(`${padTime(min)}m`);
    SEC_MONITOR.addClass('time-monitor sec');
    SEC_MONITOR.attr('id', 'sec-monitor');
    SEC_MONITOR.text(`${padTime(sec)}s`);

    WRAPPER.append(LABEL);
    WRAPPER.append(MIN_MONITOR);
    WRAPPER.append(SEC_MONITOR);

    $('body').prepend(WRAPPER);
  };

  const destroyRemainingTime = function destroyRemainingTimeComponent() {
    if ($('.remaining-time-wrapper')) {
      $('.remaining-time-wrapper').remove();
    }
  };

  const enableTimer = function enableTheTimer() {
    enableTimeEditing();
    createRemaingTime();
  };

  const disableTimer = function disableTheTimer() {
    disableTimeEditing();
    destroyRemainingTime();
  };

  const toggleTimer = function toggleTheTimer() {
    if (ENABLE_TIMER_TOGGLER[0].checked) {
      enableTimer();
    } else {
      disableTimer();
    }
  };

  const isTimeReachedMinimum = function isTimeReachedMinimum() {
    if (min <= MINIMUM_TIME[0]) {
      if (sec < MINIMUM_TIME[1]) {
        const ERROR_MODAL = $('#error-msg-modal');
        ERROR_MODAL.modal('show');

        return false;
      }
    }

    return true;
  };

  const timerPauseMetronome = function timerWillPauseTheMetronome() {
    const PLAYBUTTONLOGO = $('#play-pause-btn > .logo');
    paused = true;

    // Function from Notes Per Beat, this function is responsible for actually
    // pausing the looping of the beat sounds.
    disposeLoops();
    npbPlayedToggle();

    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
  };

  const resetTimer = function resetTheTimer() {
    const MIN_MONITOR = $('#min-monitor');
    const SEC_MONITOR = $('#sec-monitor');

    min = Number.parseInt(MIN_SETTER.val(), 10);
    sec = Number.parseInt(SEC_SETTER.val(), 10);

    MIN_MONITOR.text(`${MIN_SETTER.val()}m`);
    SEC_MONITOR.text(`${SEC_SETTER.val()}s`);
  };

  const pauseTimer = function pauseTheTimer() {
    clearInterval(timerInterval);
    enableTimeEditing();
  };

  const stopTimer = function stopTheTimer() {
    pauseTimer();
    timerPauseMetronome();
    resetTimer();
  };

  const timeStep = function timerStep() {
    const MIN_MONITOR = $('#min-monitor');
    const SEC_MONITOR = $('#sec-monitor');

    if (sec > 1) {
      sec -= 1;
      SEC_MONITOR.text(`${padTime(sec)}s`);
    } else if (min > 0) {
      min -= 1;
      sec = 59;

      MIN_MONITOR.text(`${padTime(min)}m`);
      SEC_MONITOR.text(`${padTime(sec)}s`);
    } else {
      stopTimer();
    }
  };

  const startTimer = function startTheTimer() {
    disableTimeEditing();
    ENABLE_TIMER_TOGGLER.attr('disabled', true);

    timerInterval = setInterval(() => {
      timeStep();
    }, 1000);
  };

  const changeTime = function changeTheTime(timeType, newTime) {
    let monitor = null;
    let timeUnit = null;

    if (timeType === 'min') {
      min = newTime;
      monitor = $('#min-monitor');
      timeUnit = 'm';
    } else if (timeType === 'sec') {
      sec = newTime;
      monitor = $('#sec-monitor');
      timeUnit = 's';
    }

    if (monitor != null) {
      monitor.text(`${padTime(newTime)}${timeUnit}`);
    }
  };

  // Event Handlers
  ENABLE_TIMER_TOGGLER.click(() => {
    toggleTimer();
  });

  MIN_SETTER.change(() => {
    const TIME = Number.parseInt(MIN_SETTER.val(), 10);
    changeTime('min', TIME);
  });

  SEC_SETTER.change(() => {
    const TIME = Number.parseInt(SEC_SETTER.val(), 10);
    changeTime('sec', TIME);
  });

  TIME_RESETTER.click(() => {
    if (
      (padTime(min) !== MIN_SETTER.val())
      || (padTime(sec) !== SEC_SETTER.val())
    ) {
      resetTimer();
    }
  });
  // End of Timer related code

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
  let bpmAdjust = null;

  // Functions
  const togglePlayLogo = function togglePlayButtonLogo() {
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
  };

  const playMetronome = function playTheMetronome() {
    paused = false;
    togglePlayLogo();
    setNote();
    npbPlayedToggle();
    Tone.Transport.start();

    if (ENABLE_TIMER_TOGGLER[0].checked) {
      startTimer();
    }
  };

  const pauseMetronome = function pauseTheMetronome() {
    paused = true;
    togglePlayLogo();
    Tone.Transport.stop();
    disposeLoops();
    npbPlayedToggle();

    if (ENABLE_TIMER_TOGGLER[0].checked) {
      pauseTimer();
    }
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
      setBpm(newBpm);
    }
  };

  const bpmMinusOne = function decreaseBpmByOne() {
    let newBpm = Number.parseInt(BPMRANGESLIDER.val(), 10);

    if (Number.parseInt(BPMRANGESLIDER.val(), 10) > 20) {
      newBpm -= 1;
      BPMRANGESLIDER.val(newBpm);
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
    if (paused) {
      if (ENABLE_TIMER_TOGGLER[0].checked) {
        if (isTimeReachedMinimum()) {
          playMetronome();
        }
      } else {
        playMetronome();
      }
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
