import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onDeleteCard();
    }
    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="delete-card"
            title="Вы уверены?"
            button="Да"/>
    )
};

export default DeleteCardPopup;