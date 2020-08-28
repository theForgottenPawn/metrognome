$(document).ready(() => {
  // Components
  const components = (() => {
    return {
      // Metronome
      BPMRANGESLIDER: $('#bpm-range-slider'),
      BPMINDICATOR: $('#bpm-indicator'),
      PLAYPAUSEBTN: $('#play-pause-btn'),
      BPMINCREASEBTN: $('#bpm-increase-btn'),
      BPMDECREASEBTN: $('#bpm-decrease-btn'),
      PLAYBUTTONLOGO: $('#play-pause-btn > .logo'),
      // Beats
      BEATSVISUAL: $('.beats-visual'),
      EMPHASIZE1STBEAT: $('#emphasize-1st-beat'),
      BEATCOUNT: $('#beat-count'),
      // Notes Per Beat
      SINGLEBTN: $('#single-btn'),
      TUPLETSBTN: $('#tuplets-btn'),
      TRIPLETSBTN: $('#triplets-btn'),
      TRIPLETSMIDRESTBTN: $('#triplets-mid-rest-btn'),
      QUADRUPLETSBTN: $('#quadruplets-btn'),
      // Timer
      ENABLE_TIMER_TOGGLER, $('#enable-timer-toggler'),
      MIN_SETTER, $('#min-select'),
      SEC_SETTER, $('#sec-select'),
      TIME_RESETTER, $('#time-resetter'),
      // Tap Timer
      TAP_TEMPO_BTN: $('#tap-tempo-btn')
    };
  })();

  // Early tweak
  // General Tweak
  $('[data-toggle="tooltip"]').tooltip();

  // Functions
  const changeBpmIndicatorText = function changeTheBpmIndicatorText(value) {
    BPMINDICATOR.text(value);
  };

  const adjustBpmSlider = function adjustTheBpmSlider(newBpm) {
    BPMRANGESLIDER.val(newBpm);
    changeBpmIndicatorText(newBpm);
  };

  const resetBeatVisual = function resetTheBeatVisual() {
    BEATSVISUAL.find('.beat').remove();

    for (let x = 0; x < BEATCOUNT.val(); x += 1) {
      const SRC = 'img/beats/beat_1.png';
      const BEAT = `<img src=${SRC} class='beat'>`;
      BEATSVISUAL.append(BEAT);
    }
  };

  const animateBeatVisual = function animateTheBeatVisual() {
    beat.plusOneCurrentBeat();
    let currentBeat = beat.getCurrentBeat();
    const CURRVISBEAT = BEATSVISUAL.find(`.beat:nth-child(${currentBeat})`);

    if (currentBeat === 1) {
      BEATSVISUAL.find('.beat').removeClass('beat-played');
      CURRVISBEAT.addClass('beat-played');
    } else if (currentBeat >= Number(BEATCOUNT.val(), 10)) {
      CURRVISBEAT.addClass('beat-played');
      beat.revertCurrentBeat();
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

  const createRemaingTime = function createRemaingTimeComponent(min, sec) {
    const WRAPPER = $('<div>');
    const LABEL = $('<b>Remaining Time: </b>');
    const MIN_MONITOR = $(`<span>${padTime(min)}m</span>`);
    const SEC_MONITOR = $(`<span>${padTime(sec)}s</span>`);

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

  const disableTimer = function disableTheTimer() {
    disableTimeEditing();
    destroyRemainingTime();
  };

  const togglePlayLogo = function togglePlayButtonLogo() {
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
  };

  const updateTimerMonitor = function updateTheTimeMonitor(newMin, newSec) {
    if ($('#min-monitor') && $('#sec-monitor')) {
      const MIN_MONITOR = $('#min-monitor');
      const SEC_MONITOR = $('#sec-monitor');

      newMin !== null ? MIN_MONITOR.text(`${padTime(newMin)}m`) : null;
      newSec !== null ? SEC_MONITOR.text(`${padTime(newSec)}s`) : null;
    }
  };

  const showTimerErrorModal = function showTheTimerErrorModal() {
    const ERROR_MODAL = $('#error-msg-modal');
    ERROR_MODAL.modal('show');
  };

  const toggleTapTempoBtn = function toggleTheTapTempoBtn() {
    TAP_TEMPO_BTN.toggleClass('btn-success');
    TAP_TEMPO_BTN.toggleClass('btn-danger');
  };

  // Modules
  const sharedVisuals = (() => {

  })();

  const metronome = (() => {
    let metronomePaused = true;
    let bpm = null;
    let bpmAdjust = null;

    function isPaused() {
      return metronomePaused;
    }

    function playMetronome() {
      notesPerBeat.playNote();
      timer.start();
      metronomePaused = false;
    }

    function pauseMetronome() {
      notesPerBeat.pauseNote();
      timer.pause();
      metronomePaused = true;
    }

    function bpmGetter() {
      return bpm;
    }

    function bpmSetter(newBpm) {
      bpm = Number.parseInt(newBpm, 10);
      Tone.Transport.bpm.value = bpm;
    }

    function bpmPlusOne() {
      if (bpm < 260) {
        bpmSetter(bpm + 1);
        adjustBpmSlider(bpm);
      }
    }

    function bpmMinusOne() {
      if (bpm > 20) {
        bpmSetter(bpm - 1);
        adjustBpmSlider(bpm);
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
      getBpm: bpmGetter,
      setBpm: bpmSetter,
      bpmAdjustLoop: minorBpmAdjustLooper,
      bpmAdjustStop: bpmAdjustStoper
    };
  })();

  const tapTempo = (() => {
    let firstTap = 0;
    let taps = 0;
    let idleTimer = null;

    function clearIdleTimer() {
      if (idleTimer !== null) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }
    }

    function getFirstTap(time) {
      const MIN_BPM = 20;

      toggleTapTempoBtn();

      firstTap = time;
      taps = 1;
      adjustBpmSlider(MIN_BPM);
      metronome.setBpm(MIN_BPM);
    }

    function getTapBasedTempo(currentTap) {
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

      adjustBpmSlider(averageBpm);
      metronome.setBpm(averageBpm);

      taps += 1;
    }

    function resetTapTempo() {
      toggleTapTempoBtn();
      firstTap = 0;
      taps = 0;
      clearIdleTimer();
    }

    function tapTempoTapped () {
      const TAP_SNAPSHOT = $.now();
      clearIdleTimer();

      if (taps < 1) {
        getFirstTap(TAP_SNAPSHOT);
      } else {
        getTapBasedTempo(TAP_SNAPSHOT);
      }

      changeBpmIndicatorText(metronome.getBpm())
      idleTimer = setTimeout(() => { resetTapTempo(); }, 3500);
    }

    return {
      tap: tapTempoTapped
    };
  })();

  const beat = (() => {
    let currentBeat = 0;
    let playFirstBeat = false;

    function getTheCurrentBeat() {
      return currentBeat;
    }

    function revertTheCurrentBeat() {
      currentBeat = 0;
    }

    function plusOneToCurrentBeat() {
      currentBeat += 1;
    }

    function shouldPlayTheFirstBeat() {
      return playFirstBeat;
    }

    function setThePlayFirstBeat(newPlayFirstBeat) {
      playFirstBeat = newPlayFirstBeat;
    }

    return {
      getCurrentBeat: getTheCurrentBeat,
      revertCurrentBeat: revertTheCurrentBeat,
      plusOneCurrentBeat: plusOneToCurrentBeat,
      shouldPlayFirstBeat: shouldPlayTheFirstBeat,
      setPlayFirstBeat: setThePlayFirstBeat
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
        animateBeatVisual();

        if (beat.shouldPlayFirstBeat() && (beat.getCurrentBeat() === 1)) {
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
      beat.revertCurrentBeat();

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

  const timer = (() => {
    let defaultMin = 0;
    let defaultSec = 0;
    let min = 0;
    let sec = 0;
    let timerInterval = null;
    let timerEnabled = false;

    function timerPauseMetronome() {
      togglePlayLogo();
      metronome.pause();
      pauseTheTimer();
    }

    function stopTimer() {
      timerPauseMetronome();
      resetTheTimer();
    }

    function timeStep() {
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
    }

    function isTheTimeReachedMinimum() {
      let result = false;
      (min <= 0) && (sec < 1) ? showTimerErrorModal() : result = true;

      return result;
    }

    function toggleTheTimer(state) {
      timerEnabled = state;

      if (timerEnabled) {
        enableTimeEditing();
        createRemaingTime(min, sec);
      } else {
        disableTimer();
      }
    }

    function resetTheTimer() {
      min = defaultMin;
      sec = defaultSec;
      updateTimerMonitor(min, sec);
    }

    function startTheTimer() {
      if (timerEnabled) {
        disableTimeEditing();
        timerInterval = setInterval(() => { timeStep(); }, 1000);
      }
    }

    function pauseTheTimer() {
      if (timerEnabled) {
        clearInterval(timerInterval);
        enableTimeEditing();
      }
    }

    function getTheMin() {
      return min;
    }

    function setTheMin(newMin) {
      defaultMin = newMin;
      min = defaultMin;
      updateTimerMonitor(min, null);
    }

    function getTheSec() {
      return sec;
    }

    function setTheSec(newSec) {
      defaultSec = newSec;
      sec = defaultSec;
      updateTimerMonitor(null, sec);
    }

    function getTimerEnabled() {
      return timerEnabled;
    }

    return {
      toggleTimer: toggleTheTimer,
      isReachedMinimumValidTime: isTheTimeReachedMinimum,
      start: startTheTimer,
      pause: pauseTheTimer,
      reset: resetTheTimer,
      getMin: getTheMin,
      setMin: setTheMin,
      getSec: getTheSec,
      setSec: setTheSec,
      isEnabled: getTimerEnabled
    };
  })();

  metronome.setBpm(BPMRANGESLIDER.val());

  // Events listeners
  // Metronome start
  PLAYPAUSEBTN.click(() => {
    togglePlayLogo();

    if (metronome.isPaused()) {
      if (ENABLE_TIMER_TOGGLER[0].checked) {
        if (timer.isReachedMinimumValidTime()) {
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
    changeBpmIndicatorText(metronome.getBpm())
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
    beat.revertCurrentBeat();
    resetBeatVisual();
  });

  EMPHASIZE1STBEAT.change(() => {
    beat.setPlayFirstBeat(EMPHASIZE1STBEAT[0].checked);
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
    timer.toggleTimer(ENABLE_TIMER_TOGGLER[0].checked);
    if (timer.isEnabled && ((timer.getMin() < 1) && (timer.getSec() < 1))) {
      timer.setMin(Number.parseInt(MIN_SETTER.val(), 10));
      timer.setSec(Number.parseInt(SEC_SETTER.val(), 10));
    }
  });

  MIN_SETTER.change(() => {
    timer.setMin(Number.parseInt(MIN_SETTER.val(), 10));
    timer.setSec(Number.parseInt(SEC_SETTER.val(), 10));
  });

  SEC_SETTER.change(() => {
    timer.setSec(Number.parseInt(SEC_SETTER.val(), 10));
  });

  TIME_RESETTER.click(() => {
    if (
      (padTime(timer.getMin()) !== MIN_SETTER.val()) ||
      (padTime(timer.getSec()) !== SEC_SETTER.val())
    ) {
      timer.reset();
    }
  });
  // Timer end

  // Tap Metronome start
  TAP_TEMPO_BTN.mousedown(() => {
    tapTempo.tap();
  });

  $(document).keydown((e) => {
    if (e.keyCode === 32) {
      tapTempo.tap();
      e.preventDefault();
    }
  });

  TAP_TEMPO_BTN.hover(() => {
    setTimeout(() => { TAP_TEMPO_BTN.tooltip('hide'); }, 5000);
  });
  // Tap Metronome end
});
