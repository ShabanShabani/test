import { toast } from 'react-toastify'

const options = {
    position: toast.POSITION.BOTTOM_LEFT,
    newestOnTop: false,
    closeOnClick: true,
    hideProgressBar: false,
    draggable: true,
    autoClose: 3000
}

export function error(message) {
    toast.error(message, options)
}

export function success(message) {
    toast.success(message, options);
}