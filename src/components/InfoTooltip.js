/* InfoTooltip — компонент модального окна,
который информирует пользователя об успешной (или не очень) регистрации */
import React from "react";
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

function InfoTooltip({isOpen, onClose, error}){
    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__button popup__button_active_exit popup__close" type="button"
                        aria-label="Закрыть" value="close" onClick={onClose}/>
                <img
                    src={error ? successIcon : failIcon}
                    alt={
                        error ? 'Регистрация прошла успешно' : 'Регистрация не прошла'
                    }
                    className="popup__signup-icon"
                />
                <h2 className="popup__signup-title">
                    {error
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
};
export default InfoTooltip;