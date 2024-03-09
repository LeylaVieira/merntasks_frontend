import io from 'socket.io-client'

const URL = import.meta.env.VITE_BACKEND_URL

// TODO: Investigar más sobre cómo usar estar variable para no tener que crearla en Proyecto.jsx y en ProyectosProvider.jsx
// TODO: Si lo uso, se pierde la actualización del estado en la ventana donde hago la modificación
// TODO: https://socket.io/how-to/use-with-react
export const socket = io(URL, {
    autoConnect: false
})