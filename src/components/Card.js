import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwned = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(item => item._id === currentUser._id);

    const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;
    const cardDeleteButtonClassName = `element__trash-button ${isOwned ? 'element__trash-button_active' : ''}`;
    function handleCardClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }


  return (
      <div id="card-template">
        <article className="element">
          <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить" type="button"/>
          <img className="element__item" onClick={handleCardClick} src={card.link} alt={card.name} />
            <div className="element__wrapper">
              <h2 className="element__subject">{card.name}</h2>
              <div className="element__like-container">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится" type="button"/>
                <span className="element__like-button_counter">{card.likes.length}</span>
              </div>
            </div>
        </article>
      </div>
  );
}

export default Card