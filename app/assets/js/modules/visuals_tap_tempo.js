import { TAP_TEMPO_BTN } from './components.js';

export const tapTempoVisuals = (() => {
  function toggleTheTapTempoBtn() {
    TAP_TEMPO_BTN.toggleClass('btn-success');
    TAP_TEMPO_BTN.toggleClass('btn-danger');
  }

  return {
    toggleTapTempoBtn: toggleTheTapTempoBtn
  };
})();
