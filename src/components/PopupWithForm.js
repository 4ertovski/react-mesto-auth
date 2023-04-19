import React from "react";

function PopupWithForm({title, name, children, button, isOpen, onClose, onSubmit, isLoading}) {

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
                        type="submit" aria-label="Сохранить" value="save">{isLoading ? "Сохранение" : button}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm


/*

Если будет интересно, можно добавить универсальную обертку Popup для любых попапов, в которой будет обработка оверлея, крестика и Escape.
    JSX
import { useEffect } from "react";
// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children }) => {
// внутри указываем `useEffect` для обработчика `Escape`
    useEffect(() => {
        // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
        if (!isOpen) return;
// объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)
        // обязательно удаляем обработчик в `clean-up` функции
        return () => document.removeEventListener('keydown', closeByEscape)
// обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
    }, [isOpen, onClose])

// создаем обработчик оверлея
    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

// внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
    return (
        <div
            className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
            // добавляем обработчик оверлея
            onClick={handleOverlay}
        >
            {/!* добавляем контейнер для контента попапа *!/}
            <div className='popup__container'>
                {/!* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`,
        хоть для `PopupWithForm` *!/}
                {children}
                {/!* кнопка крестика есть у любого попапа *!/}
                <button
                    className='popup__close'
                    type='button'
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Popup;


И теперь можно использовать в любом компоненте, который является попапом: в  ImagePopup,  InfoTooltip и  PopupWithForm.

    JSX


function PopupWithForm({isOpen, name, onClose, ...props}) {
    return (
        <Popup isOpen={isOpen} name={name} onClose={onClose}>
            <h2 className='popup__title'>{props.title}</h2>


            И теперь Вам не нужно дублировать верстку обертки попапа, навешивать обработчики оверлея, крестиков и Escape где-то еще. Все будет в одном компоненте Popup. Кстати, можете попробовать сделать компонент Form для любых форм, а так же Input для инпутов.

*/
