import { sharedVisuals } from './visuals_shared.js';
import { tapTempoVisuals } from './visuals_tap_tempo.js';
import { metronome } from './module_metronome.js';

export const tapTempo = (() => {
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

    tapTempoVisuals.toggleTapTempoBtn();

    firstTap = time;
    taps = 1;
    sharedVisuals.adjustBpmSlider(MIN_BPM);
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

    sharedVisuals.adjustBpmSlider(averageBpm);
    metronome.setBpm(averageBpm);

    taps += 1;
  }

  function resetTapTempo() {
    tapTempoVisuals.toggleTapTempoBtn();
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

    sharedVisuals.changeBpmIndicatorText(metronome.getBpm())
    idleTimer = setTimeout(() => { resetTapTempo(); }, 3500);
  }

  return {
    tap: tapTempoTapped
  };
})();
