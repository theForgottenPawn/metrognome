export const beat = (() => {
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

