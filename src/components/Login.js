/*Login — компонент авторизации пользователя с необходимыми стейт-переменными.*/
import React, { useState } from 'react';

function Login({ onLogin }) {
        const [userData, setUserData] = useState({
            password: "",
            email: "",
        });

        function onChange(e) {
            const {name, value} = e.target;

            setUserData({
                ...userData,
                [name]: value,
            });
        }

        function onSubmit(e) {
            e.preventDefault();
            onLogin(userData.email, userData.password);
        }

        return (
            <section className="auth">
                <h2 className="auth__title">Вход</h2>
                <form
                    className="auth__form"
                    name="login"
                    onSubmit={onSubmit}>
                    <input
                        className="auth__input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={userData.email || ''}
                        onChange={onChange}
                        required>
                    </input>
                    <input
                        className="auth__input"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        value={userData.password || ''}
                        onChange={onChange}
                        required>
                    </input>
                    <button
                        className="button auth__button"
                        type="submit">Войти
                    </button>
                </form>

            </section>
        );
    }


export default Login;