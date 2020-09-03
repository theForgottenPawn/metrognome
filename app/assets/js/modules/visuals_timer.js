import { sharedVisuals } from './visuals_shared.js';
import { MIN_SETTER,
         SEC_SETTER,
         TIME_RESETTER } from './components.js';

export const timerVisuals = (() => {
  function enableTheTimeEditing() {
    MIN_SETTER.attr('disabled', false);
    SEC_SETTER.attr('disabled', false);
    TIME_RESETTER.attr('disabled', false);

    if ($('.remaining-time-wrapper')) {
      $('.remaining-time-wrapper').addClass('disabled');
    }
  }

  function disableTheTimeEditing() {
    MIN_SETTER.attr('disabled', true);
    SEC_SETTER.attr('disabled', true);
    TIME_RESETTER.attr('disabled', true);

    if ($('.remaining-time-wrapper')) {
      $('.remaining-time-wrapper').removeClass('disabled');
    }
  }

  function createRemainingTimeComponent(min, sec) {
    const WRAPPER = $('<div>');
    const LABEL = $('<b>Remaining Time: </b>');
    const MIN_MONITOR = $(`<span>${sharedVisuals.padTime(min)}m</span>`);
    const SEC_MONITOR = $(`<span>${sharedVisuals.padTime(sec)}s</span>`);

    WRAPPER.addClass('section remaining-time-wrapper disabled');
    MIN_MONITOR.addClass('time-monitor');
    MIN_MONITOR.attr('id', 'min-monitor');
    SEC_MONITOR.addClass('time-monitor');
    SEC_MONITOR.attr('id', 'sec-monitor');

    WRAPPER.append(LABEL);
    WRAPPER.append(MIN_MONITOR);
    WRAPPER.append(SEC_MONITOR);

    $('body').prepend(WRAPPER);
  }

  function disableTheTimer() {
    disableTheTimeEditing();

    if ($('.remaining-time-wrapper')) {
      $('.remaining-time-wrapper').remove();
    }
  }

  function updateTheTimeMonitor(newMin, newSec) {
    if ($('#min-monitor') && $('#sec-monitor')) {
      const MIN_MONITOR = $('#min-monitor');
      const SEC_MONITOR = $('#sec-monitor');

      newMin !== null ? MIN_MONITOR.text(`${sharedVisuals.padTime(newMin)}m`) : null;
      newSec !== null ? SEC_MONITOR.text(`${sharedVisuals.padTime(newSec)}s`) : null;
    }
  }

  function showTheTimerErrorModal() {
    const ERROR_MODAL = $('#error-msg-modal');
    ERROR_MODAL.modal('show');
  }

  return {
    enableTimeEditing: enableTheTimeEditing,
    disableTimeEditing: disableTheTimeEditing,
    createRemainingTime: createRemainingTimeComponent,
    disableTimer: disableTheTimer,
    updateTimerMonitor: updateTheTimeMonitor,
    showTimerErrorModal: showTheTimerErrorModal
  };
})();
