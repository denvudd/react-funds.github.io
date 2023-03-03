import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context';

import MyButton from '../../components/UI/button/MyButton';
import MyInput from '../../components/UI/input/MyInput';

import './login.css'

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);

  const correctPass = '123456';
  const correctName = 'user';

  const login = e => {
    e.preventDefault();

    if (password === correctPass && name === correctName) {
      console.log(password);
      setIsAuth(true);
      localStorage.setItem('auth', true);
    } else {
      setResult('failure');
      console.log(result);
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="posts__title">Страница для входа</div>
        <form className="login__form" onSubmit={login}> 
          <MyInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите логин"/>
          <MyInput type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль"/>
          {result === 'failure' 
                ? <div className="failure-label">Неправильный логин или пароль!</div>
                : null
          }
          <MyButton>Войти</MyButton>
        </form>
      </div>
      <div className="hint">Login: user <br></br> Password: 123456</div>
    </div>
  );
};

export default Login;