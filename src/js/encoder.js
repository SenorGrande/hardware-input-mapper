module.exports = function rotaryEncoder({
  upButton,
  downButton,
  onUp,
  onDown,
}) {
  let waveform = '';
  let waveformTimeout;

  upButton.on('up', () => {
    waveform += '1';
    handleWaveform();
  });

  downButton.on('up', () => {
    waveform += '0';
    handleWaveform();
  });

  function handleWaveform() {
    if (waveform.length < 2) {
      waveformTimeout = setTimeout(() => {
        waveform = '';
      }, 8);
      return;
    }

    if (waveformTimeout) {
      clearTimeout(waveformTimeout);
    }

    if (waveform === '01') {
      onUp();
    } else if (waveform === '10') {
      onDown();
    }

    waveform = '';
  }
}