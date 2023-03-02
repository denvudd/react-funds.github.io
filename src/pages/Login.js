import React, { useContext } from 'react';
import { AuthContext } from '../context';

import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';


const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = e => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', true);
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="posts__title">Страница для входа</div>
        <form className="login__form" onSubmit={login}> 
          <MyInput type="text" placeholder="Введите логин"/>
          <MyInput type="text" placeholder="Введите пароль"/>
          <MyButton>Войти</MyButton>
        </form>
      </div>
    </div>
  );
};

export default Login;