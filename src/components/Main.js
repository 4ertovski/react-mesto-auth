
import React from "react";
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}
                >
                    <img className="profile__avatar"  alt="" src={currentUser.avatar}/>
                </div>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__button profile__button_active_edit"
                                aria-label="Редактировать"
                                type="button"
                                onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__definition">{currentUser.about}</p>
                </div>
                <button className="profile__button profile__button_active_add"
                        aria-label="Добавить"
                        type="button"
                        onClick={onAddPlace}
                />
            </section>
            <section className="elements" aria-label="Публикации">
                {cards.map((card) => (
                    <Card key={card._id}
                          card={card}
                          onCardClick={onCardClick}
                          onCardDelete={onCardDelete}
                          onCardLike={onCardLike}
                         />
                ))}
            </section>
        </main>
    );
}

export default Main