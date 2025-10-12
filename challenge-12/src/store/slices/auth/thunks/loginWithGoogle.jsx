import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../../../firebase/config'
import { checkingCredentials, login, logout } from '../authSlices'

const provider = new GoogleAuthProvider()

export const loginWithGoogle = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
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
