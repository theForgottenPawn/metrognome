import { PLAYBUTTONLOGO, BPMRANGESLIDER, BPMINDICATOR } from './components.js';

export const sharedVisuals = (() => {
  function changeTheBpmIndicatorText(value) {
    BPMINDICATOR.text(value);
  }

  function adjustTheBpmSlider(newBpm) {
    BPMRANGESLIDER.val(newBpm);
    changeTheBpmIndicatorText(newBpm);
  };

  function togglePlayButtonLogo() {
    PLAYBUTTONLOGO.toggleClass('glyphicon-play');
    PLAYBUTTONLOGO.toggleClass('glyphicon-pause');
  };

  function padTheTime(time) {
    if (time < 10) {
      return `0${time}`;
    }

    return time.toString();
  }

  return {
    changeBpmIndicatorText: changeTheBpmIndicatorText,
    adjustBpmSlider: adjustTheBpmSlider,
    togglePlayLogo: togglePlayButtonLogo,
    padTime: padTheTime
  };
})();