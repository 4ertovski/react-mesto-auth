import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]);

    const handleUserNameChange = (e) => {
        setName(e.target.value);
    };
    const handleUserStatusChange = (e) => {
        setDescription(e.target.value);
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return(
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        button="Сохранить"
        isOpen = { isOpen }
        onClose = { onClose }
        onSubmit = { handleSubmit }
        isLoading={ isLoading }
       >
        <label className="popup__form-field">
            <input className="popup__input popup__input_profile_name"
                   name="name"
                   id = "name-input"
                   type= "text"
                   placeholder="Имя"
                   minLength="2"
                   maxLength="40"
                   value = { name || ''}
                   onChange={ handleUserNameChange }
                   required
            />
            <span className="popup__input-error" id="name-input-error"/>
        </label>
        <label className="popup__form-field">
            <input className="popup__input popup__input_profile_title"
                   name="about"
                   id="title-input"
                   type="text"
                   placeholder="Описание"
                   minLength="2"
                   maxLength="200"
                   value = {description || ''}
                   onChange={ handleUserStatusChange }
                   required
            />
            <span className="popup__input-error" id="title-input-error"/>
        </label>
    </PopupWithForm>)
}
export default EditProfilePopup;