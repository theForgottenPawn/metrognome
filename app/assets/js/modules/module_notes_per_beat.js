import { notesPerBeatVisuals } from './visuals_notes_per_beat.js';
import { metronome } from './module_metronome.js';
import { beat } from './module_beat.js';


export const notesPerBeat = (() => {
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
      notesPerBeatVisuals.animateBeatVisual();

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

