/*Register — компонент регистрации пользователя с необходимыми стейт-переменными.*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useValidation} from "../hooks/ValidationHook";

function Register({ onRegister }) {
    const {values, handleChange, errors, isValid} = useValidation();

    function onSubmit(e) {
        e.preventDefault();
        onRegister(values);
    }
    return (
        <div className="auth">
            <form className="auth__form"
                  name="login"
                  onSubmit={onSubmit}>
                <h2 className="auth__title">Регистрация</h2>
                <input className="auth__input"
                       name="email"
                       type="email"
                       placeholder="Email"
                       value={values.email || ''}
                       onChange={handleChange}
                       minLength="2"
                       maxLength="40"
                       required/>
                <span
                    className={`form__input-error auth-form__input-error ${
                        isValid ? "" : "form__input-error_active"
                    }`}
                > {errors.email}</span>
                <input className="auth__input"
                       name="password"
                       type="password"
                       placeholder="Пароль"
                       value={values.password || ''}
                       onChange={handleChange}
                       minLength="6"
                       maxLength="200"
                       required/>
                <span
                    className={`form__input-error auth-form__input-error ${
                        isValid ? "" : "form__input-error_active"
                    }`}
                >
                    {errors.password}
                </span>
                <button className="button auth__button"
                        aria-label="Зарегистрироваться"
                        type="submit"
                        disabled={!isValid}
                >Зарегистрироваться</button>
            </form>
            <p className="auth__caption">Уже зарегистрированы?
                <Link to="/sign-in" className="auth__link" href=""> Войти</Link>
            </p>
        </div>
    );
}

export default Register;