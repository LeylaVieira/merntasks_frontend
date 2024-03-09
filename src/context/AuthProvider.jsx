import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState({})
    const [ cargando, setCargando ] = useState(true)

    const navigate = useNavigate()

    // Para buscar en localStorage el token del usuario logueado
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)

                // Si el usuario se ha logeado correctamente, le redireccionamos automáticamente a la página proyectos
                // navigate('/proyectos')
            } catch (error) {
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext