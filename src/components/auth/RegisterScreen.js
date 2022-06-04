import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signUp, uiSetError, uiRemoveError } from '../../actions'
import { useForm } from '../../hooks/useForm'
import { validateEmail } from '../../helpers'

export const RegisterScreen = () => {
  const { handleInputChange, name, email, password, password2, reset } = useForm({ name: '', email: '', password: '', password2: '' })
  const ui = useSelector(state => state.ui)
  const send = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid()) {
      return
    }

    console.log(name, email, password, password2)
    send(signUp({ name, email, password }))
    reset()
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      send(uiSetError('Name is required'))
      return false
    }
    if (!validateEmail(email)) {
      send(uiSetError('Email is invalid'))
      return false
    }
    if (password.trim().length === 0) {
      send(uiSetError('Password is required'))
      return false
    }
    if (password !== password2) {
      send(uiSetError('Passwords do not match'))
      return false
    }
    send(uiRemoveError())
    return true
  }

  return (
    <section className='animate__animated animate__fadeIn animate__faster'>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleSubmit}>
        {ui.msgError
          ? <div className='auth__alert-error'>
            <p>{ui.msgError}</p>
          </div>
          : null}

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>

        <Link
          to="/auth/login"
          className="link"
        >
          Already registered?
        </Link>

      </form>
    </section>
  )
}
