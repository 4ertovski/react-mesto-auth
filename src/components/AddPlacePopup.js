import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    const handleCardName = (e) => {
      setName(e.target.value)
    };

    const handleCardLink = (e) => {
        setLink(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            name="element"
            title="Новое место"
            button="Сохранить"
            isOpen = { isOpen }
            onClose = { onClose }
            onSubmit = { handleSubmit }
            isLoading={ isLoading }
           >
            <label className="popup__form-field">
                <input className="popup__input popup__input_element_name"
                       name="name"
                       id="element-name-input"
                       type="text"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       value={name}
                       onChange={ handleCardName }
                       required
                />
                <span className="popup__input-error" id="element-name-input-error"/>
            </label>
            <label className="popup__form-field">
                <input className="popup__input popup__input_element_url"
                       name="link"
                       id="url-input"
                       type="url"
                       placeholder="Ссылка на картинку"
                       value={link}
                       onChange={ handleCardLink }
                       required
                />
                <span className="popup__input-error" id="url-input-error"/>
            </label>
        </PopupWithForm>
    )

}
export default AddPlacePopup;
