import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarUrl = React.useRef();

   /*function handleChangeAvatar(e) {
        avatarUrl.current.value = e.target.value;
    }*/

    React.useEffect(() => {
        avatarUrl.current.value = '';
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({avatar: avatarUrl.current.value});
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            button="Сохранить"
            isOpen = { isOpen }
            onClose = { onClose }
            onSubmit = { handleSubmit }
           >
            <label className="popup__form-field">
                <input className="popup__input popup__input_avatar_url"
                       ref = { avatarUrl }
                       /*onChange={handleChangeAvatar}*/
                       name="link"
                       id="avatar-input"
                       type="url"
                       placeholder="Ссылка на аватар"
                       required
                />
                <span className="popup__input-error" id="avatar-input-error"/>
            </label>
        </PopupWithForm>
    );
}
export default EditAvatarPopup;
