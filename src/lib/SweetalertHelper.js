import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const showSwalError = (title, text, cb) => {
  MySwal.fire({
    title: title ? `${title}` : 'Oops...!',
    html: text ? `${text}` : 'Something went wrong.',
    icon: 'error',
    confirmButtonText: 'OK',
    // Prevent SweetAlert from immediately re‑focusing the confirm button again
    // when it closes (extra safety; not strictly required)
    didClose: () => {
      if (cb && typeof cb === 'function') {
        // Defer to ensure SweetAlert's focus trap has been fully released
        requestAnimationFrame(() => {
          cb();
        });
      }
    },
  });
};

const SweetalertHelper = {
  showSwalError,
};

export default SweetalertHelper;
