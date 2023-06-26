import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState,
} from 'react'
import type { User } from 'src/types/User'
import type { Session } from 'src/types/Session'
import { Nullable } from 'src/types/Nullable'
import { useSupabase } from 'src/hooks/useSupabase'
import { AuthState } from './types'
import { initialState } from './state'

export const AuthContext = createContext<AuthState>({ ...initialState })

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const { supabase, transformSession } = useSupabase()
  const [session, setSession] = useState<Nullable<Session>>(null)
  const [signUpErrors, setSignUpErrors] = useState<Error | false>(false)
  const [signInErrors, setSignInErrors] = useState<Error | false>(false)
  const [signOutErrors, setSignOutErrors] = useState<Error | false>(false)
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(false)
  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false)

  const signIn = useCallback(
    async ({ email, password = '' }: Pick<User, 'email' | 'password'>) => {
      clearSignInErrors()
      setIsLoadingSignIn(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setIsLoadingSignIn(false)

      if (error) {
        setSignInErrors(error)
        throw error
      }

      setSession(transformSession(data))
    },
    [supabase]
  )

  const signUp = useCallback(
    async (user: User) => {
      clearSignUpErrors()
      setIsLoadingSignUp(true)

      const { name, email, password = '' } = user

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      setIsLoadingSignUp(false)

      if (error) {
        setSignUpErrors(error)
        throw error
      }

      setSession(transformSession(data))
    },
    [supabase]
  )

  const signOut = async () => {
    setSession(null)
    setSignOutErrors(false)
    setIsLoadingSignOut(true)

    const { error } = await supabase.auth.signOut()

    setIsLoadingSignOut(false)

    if (error) {
      setSignOutErrors(error)
      throw error
    }
  }

  const autoSignIn = async () => {
    setSession(null)
    setSignInErrors(false)
    setIsLoadingSignIn(true)

    const { data, error } = await supabase.auth.getSession()

    setIsLoadingSignIn(false)

    if (error) {
      setSignInErrors(error)
      throw error
    }

    setSession(transformSession(data))
  }

  const clearSignInErrors = () => setSignInErrors(false)
  const clearSignUpErrors = () => setSignUpErrors(false)

  const state = {
    session,

    signInErrors,
    signUpErrors,
    signOutErrors,

    isLoadingSignIn,
    isLoadingSignUp,
    isLoadingSignOut,

    signIn,
    signUp,
    signOut,
    autoSignIn,
    clearSignInErrors,
    clearSignUpErrors,
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}