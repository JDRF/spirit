class SpiritFormInputMasks {
    static enable() {
      Inputmask({mask: "99/99/9999", placeholder: "MM/DD/YYYY"}).mask('.spirit-form__input--date-mask');
      Inputmask({mask: "(999) 999-9999"}).mask('.spirit-form__input--tel-mask');
    }
}

SpiritFormInputMasks.enable();
