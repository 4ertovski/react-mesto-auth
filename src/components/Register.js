/*Register — компонент регистрации пользователя с необходимыми стейт-переменными.*/
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
    const [userData, setUserData] = useState({
        password: "",
        email: "",
    });
    function onChange(e) {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    }
    function onSubmit(e) {
        e.preventDefault();
        onRegister(userData.email, userData.password);
    }
    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form"
                  name="login"
                  onSubmit={onSubmit}>
                    <input className="auth__input"
                           name="email"
                           type="email"
                           placeholder="Email"
                           value={userData.email || ''}
                           onChange={onChange}
                           required/>
                    <input className="auth__input"
                           name="password"
                           type="password"
                           placeholder="Пароль"
                           value={userData.password || ''}
                           onChange={onChange}
                           required/>
                    <button className="button auth__button"
                            aria-label="Зарегистрироваться"
                            type="submit">Зарегистрироваться</button>
            </form>
            <p className="auth__caption">Уже зарегистрированы?
                <Link to="/sign-in" className="auth__link" href=""> Войти</Link>
            </p>
        </div>
    );
}

export default Register;