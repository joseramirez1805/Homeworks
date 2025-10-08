import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase/config'
import { checkingCredentials, login, logout } from '../authSlices'

export const loginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password)
      const user = resp.user
      dispatch(login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL
      }))
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }))
    }
  }
}
