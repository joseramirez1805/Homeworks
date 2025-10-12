import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuth } from '../store/slices/auth/thunks/registerAuth'
import { loginWithGoogle } from '../store/slices/auth/thunks/loginWithGoogle'
import { loginWithEmailPassword } from '../store/slices/auth/thunks/loginWithEmailPassword'
import { logoutAuth } from '../store/slices/auth/thunks/logoutAuth'

export const Registro = () => {

    const dispatch = useDispatch()
    const { status, displayName, email: userEmail } = useSelector(state => state.auth)

    const [formState, setFormState] = useState({
        email: 'pepe@gmail.com',
        password: 'pepe1234'
    })

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const { email, password } = formState
        dispatch(registerAuth(email, password))
    }

    const onGoogleSignIn = () => {
        dispatch(loginWithGoogle())
    }

    const onEmailSignIn = (event) => {
        event.preventDefault()
        const { email, password } = formState
        dispatch(loginWithEmailPassword(email, password))
    }

    const onLogout = () => {
        dispatch(logoutAuth())
    }

        if (status === 'authenticated') {
            return (
                <div>
                    <h1>Bienvenido</h1>
                    <p>Hola</p>
                    <button onClick={onLogout}>Logout</button>
                </div>
            )
        }

        return (
            <>
                <h1>Challenge - 11</h1>
                <hr />
                <h2> Registro </h2>

                <form onSubmit={onSubmit}>
                    <input
                        name='email'
                        type="email"
                        onChange={onInputChange}
                        value={formState.email}
                    />
                    <input
                        name='password'
                        type="password"
                        onChange={onInputChange}
                        value={formState.password}
                    />
                    <button type="submit"> Registro </button>
                </form>

                <hr />

                <form onSubmit={onEmailSignIn}>
                    <h2> Inicio sesión </h2>
                    <input
                        name='email'
                        type="email"
                        onChange={onInputChange}
                        value={formState.email}
                    />
                    <input
                        name='password'
                        type="password"
                        onChange={onInputChange}
                        value={formState.password}
                    />
                    <button type="submit"> Iniciar sesión </button>
                </form>

                <hr />

                <button onClick={onGoogleSignIn}> Iniciar sesión con Google </button>
            </>
        )
}