import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startLogin, startLoginGoogle } from '../../actions'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
  const { handleInputChange, email, password, reset } = useForm({ email: '', password: '' })
  const send = useDispatch()
  const { isLoading } = useSelector(state => state.ui)

  const handleSubmit = (e) => {
    e.preventDefault()
    send(startLogin({ email, password }))
    reset()
  }

  const handleAuthGoogle = () => {
    send(startLoginGoogle())
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
          className="auth__input"
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="auth__input"
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <p>Login with social networks</p>

          <div
            className="google-btn"
            onClick={handleAuthGoogle}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link
          to="/auth/register"
          className="link"
        >
          Create new account
        </Link>

      </form>
    </>
  )
}
