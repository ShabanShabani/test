import { toast } from 'react-toastify'

const options = {
    position: toast.POSITION.BOTTOM_RIGHT,
    newestOnTop: false,
    closeOnClick: true,
    hideProgressBar: true,
    draggable: true,
    autoClose: 10000
}

export function error(message) {
    toast.error(message, options)
}

export function success(message) {
    toast.success(message, options);
}