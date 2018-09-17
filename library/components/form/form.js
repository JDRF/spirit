class SpiritFormInputMasks {
    static enable() {
      // Using the `text-mask` library
      // See: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme for details on how to create masks
      const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      const dateMask = [/[0-1]/, /\d/, '/', /[0-3]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/];

      // Look for modifier classes for tel and date inputs that need masks
      const maskedPhoneInputs = Array.from(document.querySelectorAll('.spirit-form__input--tel-mask'));
      const maskedDateInputs = Array.from(document.querySelectorAll('.spirit-form__input--date-mask'));

      maskedPhoneInputs.forEach((i) => {
        vanillaTextMask.maskInput({
          inputElement: i,
          mask: phoneMask,
          keepCharPositions: true
        });
      });

      maskedDateInputs.forEach((i) => {
        vanillaTextMask.maskInput({
          inputElement: i,
          mask: dateMask,
          keepCharPositions: true
        });
      });
    }
}

SpiritFormInputMasks.enable();
