import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import { loginRequest } from '../services/authService'
import { isTokenExpired } from '../utils/auth' // ← ADICIONE ESSE IMPORT

type User = {
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  /* LOAD STORAGE */
  useEffect(() => {
    const storedUser = localStorage.getItem('cyber_user')
    const token = localStorage.getItem('cyber_token')

    const tokenValido =
      token &&
      token !== 'undefined' &&
      token !== 'null' &&
      !isTokenExpired(token) // ← VERIFICA SE NÃO ESTÁ EXPIRADO

    if (storedUser && tokenValido) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Erro ao ler credenciais locais:', error)
        logout()
      }
    } else {
      // Token expirado ou inválido — limpa tudo
      logout()
    }

    setLoading(false)
  }, [])

  /* LOGIN */
  async function login(email: string, password: string) {
    const responseData = await loginRequest(email, password)

    console.log('RETORNO DO BACKEND NO LOGIN:', responseData)

    const extractedToken =
      typeof responseData === 'string'
        ? responseData
        : (responseData as any)?.token

    if (!extractedToken || extractedToken === 'undefined' || extractedToken === 'null') {
      console.error('ERRO CRÍTICO: Token não é válido.', responseData)
      throw new Error('INVALID_TOKEN')
    }

    localStorage.setItem('cyber_token', extractedToken)

    const loggedUser = { email }
    localStorage.setItem('cyber_user', JSON.stringify(loggedUser))

    setUser(loggedUser)
  }

  /* LOGOUT */
  function logout() {
    localStorage.removeItem('cyber_token')
    localStorage.removeItem('cyber_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}