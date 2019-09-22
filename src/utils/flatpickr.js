import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css'

export const callFlatpickr = (container, object) => {
  flatpickr(container, object)
}
