import React from "react";

function ImagePopup({card, name, onClose}) {

    return (
        <div className={`popup popup_${name} ${card.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__item-container">
                <button className="popup__button popup__button_item_exit popup__close"
                        type="button"
                        onClick={onClose}
                />
                <img className="popup__item" src={card.link} alt={card.name}/>
                    <h2 className="popup__item-subject">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup