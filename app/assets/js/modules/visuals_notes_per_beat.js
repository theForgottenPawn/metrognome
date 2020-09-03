// Import the components and beat module
import { beat } from './module_beat.js';
import { BEATSVISUAL, BEATCOUNT } from './components.js';

export const notesPerBeatVisuals = (() => {
  function animateTheBeatVisual() {
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
  }

  return {
    animateBeatVisual: animateTheBeatVisual
  };
})();