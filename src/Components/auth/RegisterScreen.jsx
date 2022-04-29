import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);

  const { name, email, password, password2, handleInputChange } = useForm({
    email: "nico@gmail.com",
    name: "nicolas",
    password: "123456",
    password2: "123456",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFomValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  const isFomValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("name is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("email is no valid"));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(
        setError(
          "password should be at least 6 characters and match each other"
        )
      );
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title mb-5">Register</h3>
      <form onSubmit={handleSubmit}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          className="auth__input"
          autoComplete="off"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          value={name}
        />
        <input
          type="text"
          className="auth__input"
          autoComplete="off"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Confirm"
          name="password2"
          onChange={handleInputChange}
          value={password2}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
          disabled={loading}
        >
          Register
        </button>
        <Link className="link" to="/auth/login">
          Already registered? Sign In
        </Link>
      </form>
    </>
  );
};
