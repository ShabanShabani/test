import io from 'socket.io-client'
const { REACT_APP_WEB_API_URL_SOCKET: web_api_url_socket } = process.env;
const socket = io(web_api_url_socket);

const getSocket=()=>{
    return socket;
}

export default getSocket;