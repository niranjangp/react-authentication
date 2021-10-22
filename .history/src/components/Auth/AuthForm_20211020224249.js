import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInpRef = useRef();
  const pwdInpRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInpRef.current.value;
    const enteredPwd = pwdInpRef.current.value;

    setIsLoading(true);
    if (isLogin) {

    } else {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEyyhOGxTsh-OE59A1AN5JTDLGkSC7vP4', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPwd,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsLoading(false);
      if (response.ok) {

      } else {
        const jsonData = await response.json();
        let errMsg = 'Authentication Failed!';
        //console.log(jsonData);
        if (jsonData && jsonData.error && jsonData.error.message) {
          errMsg = jsonData.error.message;
          alert(errMsg);
        }
      }
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInpRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={pwdInpRef} />
        </div>
        <div className={classes.actions}>
          {isLoading ? <p>Sending Request...</p> : <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
