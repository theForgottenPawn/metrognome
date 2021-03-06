import * as components from './modules/components.js';
import { sharedVisuals } from './modules/visuals_shared.js';
import { metronome } from './modules/module_metronome.js';
import { tapTempo } from './modules/module_tap_tempo.js';
import { beat } from './modules/module_beat.js';
import { notesPerBeat } from './modules/module_notes_per_beat.js';
import { timer } from './modules/module_timer.js';

$(document).ready(() => {
  // Early tweak
  $('[data-toggle="tooltip"]').tooltip();
  metronome.setBpm(components.BPMRANGESLIDER.val());

  // functions
  const resetBeatVisuals = function resetTheBeatVisual() {
    components.BEATSVISUAL.find('.beat').remove();

    for (let x = 0; x < components.BEATCOUNT.val(); x += 1) {
      const SRC = '../assets/img/beats/beat_1.png';
      const BEAT = `<img src=${SRC} class='beat'>`;
      components.BEATSVISUAL.append(BEAT);
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

  // Events listeners
  // Metronome start
  components.PLAYPAUSEBTN.click(() => {
    sharedVisuals.togglePlayLogo();

    if (metronome.isPaused()) {
      if (components.ENABLE_TIMER_TOGGLER[0].checked) {
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

  components.BPMRANGESLIDER.on('input', () => {
    metronome.setBpm(components.BPMRANGESLIDER.val());
    sharedVisuals.changeBpmIndicatorText(metronome.getBpm())
  });

  // BPMINCREASEBTN events
  components.BPMINCREASEBTN.click(() => {
    metronome.bpmAdjustLoop('increase', false);
  });

  components.BPMINCREASEBTN.mousedown(() => {
    metronome.bpmAdjustLoop('increase', true);
  });

  components.BPMINCREASEBTN.mouseup(() => {
    metronome.bpmAdjustStop();
  });

  components.BPMINCREASEBTN.mouseleave(() => {
    metronome.bpmAdjustStop();
  });

  // BPMDECREASEBTN events
  components.BPMDECREASEBTN.click(() => {
    metronome.bpmAdjustLoop('decrease', false);
  });

  components.BPMDECREASEBTN.mousedown(() => {
    metronome.bpmAdjustLoop('decrease', true);
  });

  components.BPMDECREASEBTN.mouseup(() => {
    metronome.bpmAdjustStop();
  });

  components.BPMDECREASEBTN.mouseleave(() => {
    metronome.bpmAdjustStop();
  });
  // Metronome end

  // Beats start
  components.BEATCOUNT.change(() => {
    beat.revertCurrentBeat();
    resetBeatVisuals();
  });

  components.EMPHASIZE1STBEAT.change(() => {
    beat.setPlayFirstBeat(components.EMPHASIZE1STBEAT[0].checked);
  });
  // Beats end

  // Notes Per Beat start
  components.SINGLEBTN.click(() => {
    if (isNoteNew(components.SINGLEBTN)) {
      notesPerBeat.changeNote('Single');
    }
  });

  components.TUPLETSBTN.click(() => {
    if (isNoteNew(components.TUPLETSBTN)) {
      notesPerBeat.changeNote('Tuplets');
    }
  });

  components.TRIPLETSBTN.click(() => {
    if (isNoteNew(components.TRIPLETSBTN)) {
      notesPerBeat.changeNote('Triplets');
    }
  });

  components.TRIPLETSMIDRESTBTN.click(() => {
    if (isNoteNew(components.TRIPLETSMIDRESTBTN)) {
      notesPerBeat.changeNote('Triplets Mid Rest');
    }
  });

  components.QUADRUPLETSBTN.click(() => {
    if (isNoteNew(components.QUADRUPLETSBTN)) {
      notesPerBeat.changeNote('Quadruplets');
    }
  });
  // Notes Per Beat end

  // Timer start
  components.ENABLE_TIMER_TOGGLER.click(() => {
    timer.toggleTimer(components.ENABLE_TIMER_TOGGLER[0].checked);
    if (timer.isEnabled && ((timer.getMin() < 1) && (timer.getSec() < 1))) {
      timer.setMin(Number.parseInt(components.MIN_SETTER.val(), 10));
      timer.setSec(Number.parseInt(components.SEC_SETTER.val(), 10));
    }
  });

  components.MIN_SETTER.change(() => {
    timer.setMin(Number.parseInt(components.MIN_SETTER.val(), 10));
    timer.setSec(Number.parseInt(components.SEC_SETTER.val(), 10));
  });

  components.SEC_SETTER.change(() => {
    timer.setSec(Number.parseInt(components.SEC_SETTER.val(), 10));
  });

  components.TIME_RESETTER.click(() => {
    if (
      (sharedVisuals.padTime(timer.getMin()) !== components.MIN_SETTER.val()) ||
      (sharedVisuals.padTime(timer.getSec()) !== components.SEC_SETTER.val())
    ) {
      timer.reset();
    }
  });
  // Timer end

  // Tap Metronome start
  components.TAP_TEMPO_BTN.mousedown(() => {
    tapTempo.tap();
  });

  $(document).keydown((e) => {
    if (e.keyCode === 32) {
      tapTempo.tap();
      e.preventDefault();
    }
  });

  components.TAP_TEMPO_BTN.hover(() => {
    setTimeout(() => { components.TAP_TEMPO_BTN.tooltip('hide'); }, 5000);
  });
  // Tap Metronome end
});
