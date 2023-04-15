import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken, setAccessToken } from "../stores/AccessTokenStore";
import { getCurrentUser as getCurrentUserService } from '../services/UserService'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null); // El usuario en sesión
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // Para saber si ya tengo usuario o al menos lo he comprobado

  const getCurrentUser = useCallback((callback) => {
    getCurrentUserService() // llama a /users/me para que con el token, me traiga a mi usuario, se lo enchufe al contexto y toda mi aplicación sepa quien es
      .then(user => {
        setCurrentUser(user)
        setIsAuthLoaded(true)
        callback && callback() // Para cuando necesite redirigir despues de un login
      })
  }, [])

  const login = useCallback((token) => {
    const navigateToProfile = () => {
      navigate('/profile')
    }
    // Lo guaaardo
    setAccessToken(token);
    getCurrentUser(navigateToProfile)

  }, [getCurrentUser])


  useEffect(() => { // UseEffect se ejecuta al menos una vez despues del primer render
    if (getAccessToken()) {
      getCurrentUser()
    } else {
      setIsAuthLoaded(true)
    }
  }, [getCurrentUser])

  const value = useMemo(() => {
    return {
      currentUser, // Usuario que está en sesión
      isAuthLoaded, // Si ya intenté saber si hay usuario en sesión
      login // login
    }
  }, [currentUser, isAuthLoaded, login])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}