import React, { useEffect, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Context from '../context/Context';
import ErrorLogin from '../components/ErrorLogin';
import rockGlass from '../images/rockGlass.svg';

function Login() {
  const [isDisable, setIsDisable] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMsg,
    handleClickLogin,
  } = useContext(Context);
  const user = localStorage.getItem('user');

  useEffect(() => {
    const isValid = () => {
      const validEmail = email.match(/^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/ig);
      const minLength = 6;
      const validPassword = password.length >= minLength;
      if (validEmail) {
        if (validPassword) {
          setIsDisable(false);
        }
      } else {
        setIsDisable(true);
      }
    };
    isValid();
  }, [email, password, setIsDisable]);

  return user ? <Redirect to="/customer/products" /> : (
    <>
      <span className="logo">TRYBE</span>
      <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
      </object>
      <form action="">
        <label htmlFor="loginInput">
          Login
          <input
            type="email"
            name="loginInput"
            placeholder="email@trybeer.com.br"
            data-testid="common_login__input-email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="passwordInput">
          Senha
          <input
            type="password"
            name="passwordInput"
            placeholder="***********"
            data-testid="common_login__input-password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ isDisable }
          onClick={ ({ target }) => handleClickLogin(target.value) }
        >
          LOGIN
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          <Link to="/register">
            Ainda não tenho conta
          </Link>
        </button>
        { errorMsg ? <ErrorLogin /> : '' }
      </form>
    </>
  );
}

export default Login;
