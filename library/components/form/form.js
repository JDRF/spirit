class SpiritFormInputMasks {
    static enable() {

      // var im = new Inputmask("99-9999999");
      // im.mask(selector);

      // //or

      // Inputmask({"mask": "(999) 999-9999", .... other options .....}).mask(selector);
      // Inputmask("9-a{1,3}9{1,3}").mask(selector);
      // Inputmask("9", { repeat: 10 }).mask(selector);

      // Inputmask({ regex: "\\d*" }).mask(selector);
      // Inputmask({ regex: String.raw`\d*` }).mask(selector);
      var im = new Inputmask("99-9999999");


      // Look for modifier classes for tel and date inputs that need masks
      // const maskedPhoneInputs = Array.from(document.querySelectorAll('.spirit-form__input--tel-mask'));
      // const maskedDateInputs = Array.from(document.querySelectorAll('.spirit-form__input--date-mask'));

      // Inputmask({mask: "mm/dd/yyyy"}).mask('.spirit-form__input--date-mask');

      // maskedPhoneInputs.forEach((i) => {
      //   vanillaTextMask.maskInput({
      //     inputElement: i,
      //     mask: phoneMask,
      //     keepCharPositions: true
      //   });
      // });

      // maskedDateInputs.forEach((i) => {
      // });
    }
}

SpiritFormInputMasks.enable();
