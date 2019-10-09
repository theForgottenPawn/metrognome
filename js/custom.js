$(document).ready(() => {
  // Components
  // Metronome
  const BPMRANGESLIDER = $('#bpm-range-slider');
  const BPMINDICATOR = $('#bpm-indicator');
  const PLAYPAUSEBTN = $('#play-pause-btn');
  const BPMINCREASEBTN = $('#bpm-increase-btn');
  const BPMDECREASEBTN = $('#bpm-decrease-btn');
  const PLAYBUTTONLOGO = $('#play-pause-btn > .logo');
  // Beats
  const BEATSVISUAL = $('.beats-visual');
  const EMPHASIZE1STBEAT = $('#emphasize-1st-beat');
  const BEATCOUNT = $('#beat-count');
  // Notes Per Beat
  const SINGLEBTN = $('#single-btn');
  const TUPLETSBTN = $('#tuplets-btn');
  const TRIPLETSBTN = $('#triplets-btn');
  const TRIPLETSMIDRESTBTN = $('#triplets-mid-rest-btn');
  const QUADRUPLETSBTN = $('#quadruplets-btn');
  // Timer
  const ENABLE_TIMER_TOGGLER = $('#enable-timer-toggler');
  const MIN_SETTER = $('#min-select');
  const SEC_SETTER = $('#sec-select');
  const TIME_RESETTER = $('#time-resetter');
  // Tap Timer
  const TAP_TEMPO_BTN = $('#tap-tempo-btn');

  // Constants
  // Notes Per Beat
  const SYNTH_BLEND = {
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 0,
      release: 0.01,
    },
  };
  const SYNTH = new Tone.Synth(SYNTH_BLEND).toMaster();
  const SYNTH2 = new Tone.Synth(SYNTH_BLEND).toMaster();
  // Timer
  const MINIMUM_TIME = [0, 1];

  // Variables
  // Metronome
  let metronomePaused = true;
  let bpmAdjust = null;
  // Beats
  let currentBeat = 0;
  // Notes Per Beat
  let mainLoop = null;
  let subLoop = null;
  let note = 'Single';
  // Timer
  let min = Number.parseInt(MIN_SETTER.val(), 10);
  let sec = Number.parseInt(SEC_SETTER.val(), 10);
  let timerInterval = null;
  // Tap Tempo
  let firstTap = 0;
  let taps = 0;
  let idleTimer = null;

  // Early tweak
  // General Tweak
  $('[data-toggle="tooltip"]').tooltip();
  // Metronome
  Tone.Transport.bpm.value = Number.parseInt(BPMRANGESLIDER.val(), 10);
  // Notes Per Beat
  SYNTH2.volume.value = -3;

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

  const setMain = function setMainLoop() {
    mainLoop = new Tone.Loop(() => {
      let chord = 'A5';
      animateVisual();

      if (EMPHASIZE1STBEAT[0].checked && (currentBeat === 1)) {
        chord = 'B6';
      }

      SYNTH.triggerAttackRelease(chord, '0:0:1');
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
      SYNTH2.triggerAttackRelease('G3', '0:0:1');
    }, '8n');

    subLoop.start('+0');
  };

  const triplets = function tripletsNote() {
    setMain();

    subLoop = new Tone.Loop(() => {
      SYNTH2.triggerAttackRelease('G3', '0:0:1');
    }, '8t');

    subLoop.start('+0');
  };

  const tripletsMid = function tripletsMidRestNote() {
    setMain();
    let count = 1;

    subLoop = new Tone.Loop(() => {
      if (count === 1) {
        SYNTH2.triggerAttackRelease('G3', '0:0:1');
      } else if (count >= 3) {
        SYNTH2.triggerAttackRelease('G3', '0:0:1');
        count = 0;
      }

      count += 1;
    }, '8t');

    subLoop.start('+0');
  };

  const quadruplets = function quadrupletsNote() {
    setMain();

    subLoop = new Tone.Loop(() => {
      SYNTH2.triggerAttackRelease('G3', '0:0:1');
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

    if (!metronomePaused) {
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

  const playNote = function playTheNote() {
    setNote();
    Tone.Transport.start();
  };

  const pauseNote = function pauseTheNote() {
    Tone.Transport.stop();
    disposeLoops();
  };

  const enableTimeEditing = function enableTheTimeEditing() {
    MIN_SETTER.attr('disabled', false);
    SEC_SETTER.attr('disabled', false);
    TIME_RESETTER.attr('disabled', false);
    ENABLE_TIMER_TOGGLER.attr('disabled', false);

    if ($('.remaining-time-wrapper')) {
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
    const MIN_MONITOR = $(`<span>${padTime(min)}m</span>`);
    const SEC_MONITOR = $(`<span>${padTime(sec)}m</span>`);

    WRAPPER.addClass('section remaining-time-wrapper disabled');
    MIN_MONITOR.addClass('time-monitor');
    MIN_MONITOR.attr('id', 'min-monitor');
    SEC_MONITOR.addClass('time-monitor');
    SEC_MONITOR.attr('id', 'sec-monitor');

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

  const resetTimer = function resetTheTimer() {
    min = Number.parseInt(MIN_SETTER.val(), 10);
    sec = Number.parseInt(SEC_SETTER.val(), 10);

    if ($('#min-monitor') && $('#sec-monitor')) {
      const MIN_MONITOR = $('#min-monitor');
      const SEC_MONITOR = $('#sec-monitor');

      MIN_MONITOR.text(`${MIN_SETTER.val()}m`);
      SEC_MONITOR.text(`${SEC_SETTER.val()}s`);
    }
  };

  const togglePlayLogo = function togglePlayButtonLogo() {
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
  };

  const pauseTimer = function pauseTheTimer() {
    if (ENABLE_TIMER_TOGGLER[0].checked) {
      clearInterval(timerInterval);
      enableTimeEditing();
    }
  };

  const timerPauseMetronome = function timerWillPauseTheMetronome() {
    togglePlayLogo();
    pauseNote();
    pauseTimer();
    metronomePaused = true;
  };

  const stopTimer = function stopTheTimer() {
    timerPauseMetronome();
    resetTimer();
  };

  const updateTimerMonitor = function updateTheTimeMonitor(newMin, newSec) {
    if ($('#min-monitor') && $('#sec-monitor')) {
      const MIN_MONITOR = $('#min-monitor');
      const SEC_MONITOR = $('#sec-monitor');

      if (newMin !== null) {
        MIN_MONITOR.text(`${padTime(newMin)}m`);
      }

      SEC_MONITOR.text(`${padTime(newSec)}s`);
    }
  };

  const timeStep = function timerStep() {
    if (sec > 1) {
      sec -= 1;
      updateTimerMonitor(null, sec);
    } else if (min > 0) {
      min -= 1;
      sec = 59;
      updateTimerMonitor(min, sec);
    } else {
      stopTimer();
    }
  };

  const startTimer = function startTheTimer() {
    if (ENABLE_TIMER_TOGGLER[0].checked) {
      disableTimeEditing();
      ENABLE_TIMER_TOGGLER.attr('disabled', true);

      timerInterval = setInterval(() => {
        timeStep();
      }, 1000);
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

  const playMetronome = function playTheMetronome() {
    playNote();
    startTimer();
    metronomePaused = false;
  };

  const pauseMetronome = function pauseTheMetronome() {
    pauseNote();
    pauseTimer();
    metronomePaused = true;
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

  const clearIdleTimer = function clearTheIdleTimer() {
    if (idleTimer !== null) {
      clearTimeout(idleTimer)
      idleTimer = null;
    }
  };

  const toggleTapTempoBtn = function toggleTheTapTempoBtn() {
    TAP_TEMPO_BTN.toggleClass('btn-success');
    TAP_TEMPO_BTN.toggleClass('btn-danger');
  };

  const getFirstTap = function getThefirstTap() {
    let minBpm = 20;

    toggleTapTempoBtn();
    
    firstTap = $.now();
    taps = 1;
    BPMRANGESLIDER.val(minBpm);
    BPMINDICATOR.text(minBpm.toString());
    Tone.Transport.bpm.value = minBpm;
  };

  const getTapBasedTempo = function getTheTapBasedTempo(currentTap) {
    let averageBpm = (60000 * taps) / (currentTap - firstTap);
    let minBpm = 20;
    let maxBpm = 260;

    if (averageBpm < minBpm) {
      averageBpm = minBpm;
    } else if (averageBpm > maxBpm) {
      averageBpm = maxBpm;
    } else {
      averageBpm = Math.round(averageBpm);
    }

    BPMRANGESLIDER.val(averageBpm);
    setBpm(averageBpm);

    taps += 1;
  };

  const resetTapTempo = function resetTheTapTempo() {
    toggleTapTempoBtn();
    firstTap = 0;
    taps = 0;
    clearIdleTimer();
  };

  const tapTempoTapped = function tapTempoIsTapped() {
    let tapSnapshot = $.now();

    clearIdleTimer();

    if (taps < 1) {
      getFirstTap();
    } else {
      getTapBasedTempo(tapSnapshot);
    }

    idleTimer = setTimeout(() => { resetTapTempo(); }, 5000);
  };

  // Events listeners
  // Metronome start
  PLAYPAUSEBTN.click(() => {
    togglePlayLogo();

    if (metronomePaused) {
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
  // Metronome end

  // Beats start
  BEATCOUNT.change(() => {
    currentBeat = 0;
    BEATSVISUAL.find('.beat').remove();

    for (let x = 0; x < BEATCOUNT.val(); x += 1) {
      const SRC = 'img/beats/beat_1.png';
      const BEAT = `<img src=${SRC} class='beat'>`;
      BEATSVISUAL.append(BEAT);
    }
  });
  // Beats end

  // Notes Per Beat start
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
  // Notes Per Beat end

  // Timer start
  ENABLE_TIMER_TOGGLER.click(() => {
    toggleTimer();
  });

  MIN_SETTER.change(() => {
    changeTime('min', Number.parseInt(MIN_SETTER.val(), 10));
  });

  SEC_SETTER.change(() => {
    changeTime('sec', Number.parseInt(SEC_SETTER.val(), 10));
  });

  TIME_RESETTER.click(() => {
    if (
      (padTime(min) !== MIN_SETTER.val())
      || (padTime(sec) !== SEC_SETTER.val())
    ) {
      resetTimer();
    }
  });
  // Timer end

  // Tap Metronome start
  TAP_TEMPO_BTN.mousedown(() => {
    tapTempoTapped();
  });

  TAP_TEMPO_BTN.hover(() => {
    setTimeout(() => { TAP_TEMPO_BTN.tooltip('hide'); }, 5000);
  });
  // Tap Metronome end
});
