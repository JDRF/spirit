class SpiritDocIconSwatch {
  static init() {
    // Get all the icon swatches
    const iconSwatches = Array.from(document.querySelectorAll('.spirit-doc-icon-swatch'));
    iconSwatches.forEach((s) => {
      SpiritDocIconSwatch.initializeEachSwatch(s);
    });
  }

  static initializeEachSwatch(swatch) {
    swatch.addEventListener('click', () => {
      swatch.classList.remove('spirit-doc-icon-swatch--name-copied');
      SpiritDocIconSwatch.copyIconName(swatch);
    });
  }

  static copyIconName(swatch) {
    const source = swatch.querySelector('.esds-doc-icon-swatch__label');

    if (swatch.querySelector('.spirit-doc-icon-swatch__name-copied-message') === null) {
      const feedbackMessage = document.createElement('span');
      feedbackMessage.textContent = "Icon Name Copied";
      feedbackMessage.classList.add('spirit-doc-icon-swatch__name-copied-message');
      swatch.appendChild(feedbackMessage);
    }

    let textarea = document.createElement('textarea');
    textarea.style.height = '0';
    textarea.style.width = '0';
    textarea.style.position = 'absolute';
    textarea.style.left = '-99999px';
    swatch.appendChild(textarea);

    textarea.textContent = source.textContent.trim();
    textarea.select();

    try {
      var successful = document.execCommand('copy');
      if (successful) {
        swatch.classList.add('spirit-doc-icon-swatch--name-copied');
      } else {
        // Don't show anything
      }
      // var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
      // Don't show anything
    } finally {
      // remove the temp textarea
      swatch.removeChild(textarea);
    }
  }
}

SpiritDocIconSwatch.init();
