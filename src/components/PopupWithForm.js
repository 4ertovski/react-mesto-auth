import React from "react";

function PopupWithForm({title, name, children, button, isOpen, onClose, onSubmit}) {

    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__button popup__button_active_exit popup__close" type="button"
                        aria-label="Закрыть" value="close" onClick={onClose}/>
                <form className={`popup__form popup__form_${name}`}
                      onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        className="popup__button  popup__button_active_submit popup__button_active_save-profile"
                        type="submit" aria-label="Сохранить" value="save">{button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm