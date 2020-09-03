import { sharedVisuals } from './visuals_shared.js';
import { notesPerBeat } from './module_notes_per_beat.js';
import { timer } from './module_timer.js';

export const metronome = (() => {
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
      sharedVisuals.adjustBpmSlider(bpm);
    }
  }

  function bpmMinusOne() {
    if (bpm > 20) {
      bpmSetter(bpm - 1);
      sharedVisuals.adjustBpmSlider(bpm);
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
