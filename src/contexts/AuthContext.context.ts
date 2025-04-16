import { createContext } from 'react'

interface AuthContextType {
  token: string | null
  userEmail: string | null
  setToken: (token: string | null) => void
  setUserEmail: (email: string | null) => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
