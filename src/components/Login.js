/*Login — компонент авторизации пользователя с необходимыми стейт-переменными.*/
import React from 'react';
import {useValidation} from "../hooks/ValidationHook";

function Login({ onLogin }) {
    const { values, handleChange, errors, isValid} = useValidation();

    function onSubmit(e) {
        e.preventDefault();
        onLogin(values);
    }

    return (
        <div className="auth">
            <form
                className="auth__form"
                name="login"
                onSubmit={onSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input
                    className="auth__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email || ''}
                    onChange={handleChange}
                    minLength="2"
                    maxLength="40"
                    required>
                </input>
                <span
                    className={`form__input-error auth-form__input-error ${
                        isValid ? "" : "form__input-error_active"
                    }`}
                >
                        {errors.email}
                    </span>
                <input
                    className="auth__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={values.password || ''}
                    onChange={handleChange}
                    minLength="6"
                    maxLength="200"
                    required>
                </input>
                <span
                    className={`form__input-error auth-form__input-error ${
                        isValid ? "" : "form__input-error_active"
                    }`}
                >
                        {errors.password}
                    </span>
                <button
                    className="button auth__button"
                    type="submit"
                    disabled={!isValid}
                >Войти
                </button>
            </form>

        </div>
    );
}


export default Login;