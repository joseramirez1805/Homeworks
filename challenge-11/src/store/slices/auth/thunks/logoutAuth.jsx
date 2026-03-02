import { signOut } from 'firebase/auth'
import { auth } from '../../../../firebase/config'
import { logout } from '../authSlices'

export const logoutAuth = () => {
  return async (dispatch) => {
    try {
      await signOut(auth)
      dispatch(logout())
    } catch (error) {
      // If signOut fails still force logout locally
      dispatch(logout({ errorMessage: error.message }))
    }
  }
}
