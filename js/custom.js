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
  // Timer
  const MINIMUM_TIME = [0, 1];

  // Variables
  // Beats
  let currentBeat = 0;
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

  const isNoteNew = function isTheNoteNew(noteBtn) {
    if (noteBtn.hasClass('focused')) {
      return false;
    } else {
      $('.note-btn').removeClass('focused');
      noteBtn.addClass('focused');

      return true;
    }
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

  const clearIdleTimer = function clearTheIdleTimer() {
    if (idleTimer !== null) {
      clearTimeout(idleTimer);
      idleTimer = null;
    }
  };

  const toggleTapTempoBtn = function toggleTheTapTempoBtn() {
    TAP_TEMPO_BTN.toggleClass('btn-success');
    TAP_TEMPO_BTN.toggleClass('btn-danger');
  };

  const getFirstTap = function getThefirstTap(time) {
    const MIN_BPM = 20;

    toggleTapTempoBtn();

    firstTap = time;
    taps = 1;
    BPMRANGESLIDER.val(MIN_BPM);
    setBpm(MIN_BPM);
  };

  const getTapBasedTempo = function getTheTapBasedTempo(currentTap) {
    let averageBpm = (60000 * taps) / (currentTap - firstTap);
    const MIN_BPM = 20;
    const MAX_BPM = 260;

    if (averageBpm < MIN_BPM) {
      averageBpm = MIN_BPM;
    } else if (averageBpm > MAX_BPM) {
      averageBpm = MAX_BPM;
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
    const TAP_SNAPSHOT = $.now();

    clearIdleTimer();

    if (taps < 1) {
      getFirstTap(TAP_SNAPSHOT);
    } else {
      getTapBasedTempo(TAP_SNAPSHOT);
    }

    idleTimer = setTimeout(() => { resetTapTempo(); }, 3500);
  };

  // Modules
  const metronome = (() => {
    let metronomePaused = true;
    let bpmAdjust = null;

    function isPaused() {
      return metronomePaused;
    }

    function playMetronome() {
      notesPerBeat.playNote();
      startTimer();
      metronomePaused = false;
    }

    function pauseMetronome() {
      notesPerBeat.pauseNote();
      pauseTimer();
      metronomePaused = true;
    }

    function bpmSetter(bpm) {
      newBpm = Number.parseInt(bpm, 10);
      BPMINDICATOR.text(newBpm);
      Tone.Transport.bpm.value = newBpm;

      return newBpm;
    }

    function bpmPlusOne() {
      let bpm = Number.parseInt(BPMRANGESLIDER.val(), 10);

      if (bpm < 260) {
        BPMRANGESLIDER.val(bpmSetter(bpm + 1));
      }
    }

    function bpmMinusOne() {
      let bpm = Number.parseInt(BPMRANGESLIDER.val(), 10);

      if (bpm > 20) {
        BPMRANGESLIDER.val(bpmSetter(bpm - 1));
      }
    }

    function minorBpmAdjustLooper(direction, willLoop) {
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
    }

    function bpmAdjustStoper() {
      clearInterval(bpmAdjust);
    }

    return {
      play: playMetronome,
      pause: pauseMetronome,
      isPaused: isPaused,
      setBpm: bpmSetter,
      bpmAdjustLoop: minorBpmAdjustLooper,
      bpmAdjustStop: bpmAdjustStoper
    };
  })();

  const notesPerBeat = (() => {
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
    SYNTH2.volume.value = -3;

    let mainLoop = null;
    let subLoop = null;
    let note = 'Single';

    function disposeLoops() {
      let result = true;

      if (metronome.isPaused()) {
        result = false;
      } else {
        if (mainLoop !== null) {
          mainLoop.dispose();
          mainLoop = null;
        }

        if (subLoop !== null) {
          subLoop.dispose();
          subLoop = null;
        }

        Tone.Transport.stop();
      }

      return result;
    }

    function setMain() {
      mainLoop = new Tone.Loop(() => {
        let chord = 'A5';
        animateVisual();

        if (EMPHASIZE1STBEAT[0].checked && (currentBeat === 1)) {
          chord = 'B6';
        }

        SYNTH.triggerAttackRelease(chord, '0:0:1');
      }, '4n');

      mainLoop.start('+0');
    }

    function singlet() {
      setMain();
      subLoop = null;
    }

    function tuplets() {
      setMain();

      subLoop = new Tone.Loop(() => {
        SYNTH2.triggerAttackRelease('G3', '0:0:1');
      }, '8n');

      subLoop.start('+0');
    }

    function triplets() {
      setMain();

      subLoop = new Tone.Loop(() => {
        SYNTH2.triggerAttackRelease('G3', '0:0:1');
      }, '8t');

      subLoop.start('+0');
    }

    function tripletsMid() {
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
    }

    function quadruplets() {
      setMain();

      subLoop = new Tone.Loop(() => {
        SYNTH2.triggerAttackRelease('G3', '0:0:1');
      }, '16n');

      subLoop.start('+0');
    }

    function setNote () {
      let forceStopped = disposeLoops();
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

      if (forceStopped) {
        Tone.Transport.start();
      }
    }

    function changeTheNote(noteName) {
      note = noteName
      setNote();
    };

    function playTheNote() {
      mainLoop === null ? setNote() : null;
      Tone.Transport.start();
    }

    function pauseTheNote() {
      Tone.Transport.stop();
      disposeLoops();
    }

    return {
      playNote: playTheNote,
      pauseNote: pauseTheNote,
      changeNote: changeTheNote,
    };
  })();

  // Events listeners
  // Metronome start
  PLAYPAUSEBTN.click(() => {
    togglePlayLogo();

    if (metronome.isPaused()) {
      if (ENABLE_TIMER_TOGGLER[0].checked) {
        if (isTimeReachedMinimum()) {
          metronome.play();
        }
      } else {
        metronome.play();
      }
    } else {
      metronome.pause();
    }
  });

  BPMRANGESLIDER.on('input', () => {
    metronome.setBpm(BPMRANGESLIDER.val());
  });

  // BPMINCREASEBTN events
  BPMINCREASEBTN.click(() => {
    metronome.bpmAdjustLoop('increase', false);
  });

  BPMINCREASEBTN.mousedown(() => {
    metronome.bpmAdjustLoop('increase', true);
  });

  BPMINCREASEBTN.mouseup(() => {
    metronome.bpmAdjustStop();
  });

  BPMINCREASEBTN.mouseleave(() => {
    metronome.bpmAdjustStop();
  });

  // BPMDECREASEBTN events
  BPMDECREASEBTN.click(() => {
    metronome.bpmAdjustLoop('decrease', false);
  });

  BPMDECREASEBTN.mousedown(() => {
    metronome.bpmAdjustLoop('decrease', true);
  });

  BPMDECREASEBTN.mouseup(() => {
    metronome.bpmAdjustStop();
  });

  BPMDECREASEBTN.mouseleave(() => {
    metronome.bpmAdjustStop();
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
    if (isNoteNew(SINGLEBTN)) {
      notesPerBeat.changeNote('Single');
    };
  });

  TUPLETSBTN.click(() => {
    if (isNoteNew(TUPLETSBTN)) {
      notesPerBeat.changeNote('Tuplets');
    }
  });

  TRIPLETSBTN.click(() => {
    if (isNoteNew(TRIPLETSBTN)) {
      notesPerBeat.changeNote('Triplets');
    }
  });

  TRIPLETSMIDRESTBTN.click(() => {
    if (isNoteNew(TRIPLETSMIDRESTBTN)) {
      notesPerBeat.changeNote('Triplets Mid Rest');
    }
  });

  QUADRUPLETSBTN.click(() => {
    if (isNoteNew(QUADRUPLETSBTN)) {
      notesPerBeat.changeNote('Quadruplets');
    }
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

  $(document).keydown((e) => {
    if (e.keyCode === 32) {
      tapTempoTapped();
      e.preventDefault();
    }
  });

  TAP_TEMPO_BTN.hover(() => {
    setTimeout(() => { TAP_TEMPO_BTN.tooltip('hide'); }, 5000);
  });
  // Tap Metronome end
});
