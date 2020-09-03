import { timerVisuals } from './visuals_timer.js';
import { metronome } from './module_metronome.js';

export const timer = (() => {
  let defaultMin = 0;
  let defaultSec = 0;
  let min = 0;
  let sec = 0;
  let timerInterval = null;
  let timerEnabled = false;

  function timerPauseMetronome() {
    sharedVisuals.togglePlayLogo();
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
      timerVisuals.updateTimerMonitor(null, sec);
    } else if (min > 0) {
      min -= 1;
      sec = 59;
      timerVisuals.updateTimerMonitor(min, sec);
    } else {
      stopTimer();
    }
  }

  function isTheTimeReachedMinimum() {
    let result = false;
    (min <= 0) && (sec < 1) ? timerVisuals.showTimerErrorModal() : result = true;

    return result;
  }

  function toggleTheTimer(state) {
    timerEnabled = state;

    if (timerEnabled) {
      timerVisuals.enableTimeEditing();
      timerVisuals.createRemainingTime(min, sec);
    } else {
      timerVisuals.disableTimer();
    }
  }

  function resetTheTimer() {
    min = defaultMin;
    sec = defaultSec;
    timerVisuals.updateTimerMonitor(min, sec);
  }

  function startTheTimer() {
    if (timerEnabled) {
      timerVisuals.disableTimeEditing();
      timerInterval = setInterval(() => { timeStep(); }, 1000);
    }
  }

  function pauseTheTimer() {
    if (timerEnabled) {
      clearInterval(timerInterval);
      timerVisuals.enableTimeEditing();
    }
  }

  function getTheMin() {
    return min;
  }

  function setTheMin(newMin) {
    defaultMin = newMin;
    min = defaultMin;
    timerVisuals.updateTimerMonitor(min, null);
  }

  function getTheSec() {
    return sec;
  }

  function setTheSec(newSec) {
    defaultSec = newSec;
    sec = defaultSec;
    timerVisuals.updateTimerMonitor(null, sec);
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
