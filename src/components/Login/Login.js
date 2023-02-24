import React, { useState, useEffect, useReducer } from "react";
import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false,
  }
}
const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT_PASSWORD') {
    return {
      value: action.value,
      validLengthPassword: (action.value.trim().length > 7),
    }
  }
  if (action.type === 'INPUT_BLUR_PASSWORD') {
    return {
      value: prevState.value,
      validLengthPassword: (prevState.value.trim().length > 7),
    }
  }
  return {
    value: '',
    validLengthPassword: false,
  }
}

const Login = (props) => {
  /*const [inputEmail, setInputEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();*/
  /*const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();*/
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: undefined });
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', validLengthPassword: undefined });
  const { isValid } = emailState;
  const { validLengthPassword } = passwordState;
  useEffect(() => {
    let stateTimer = setTimeout(() => {
      setFormIsValid(
        isValid && validLengthPassword
      );
    }, 100);
    return () => { clearTimeout(stateTimer) }
  }, [isValid, validLengthPassword])
  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });

  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: 'USER_INPUT_PASSWORD', value: event.target.value })

  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'INPUT_BLUR_PASSWORD' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordState.validLengthPassword === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type='password'
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
