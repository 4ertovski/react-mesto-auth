import '../index.css';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { useNavigate, Route, Routes } from "react-router-dom";
import * as auth from '../utils/auth';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
    const [isInfoToolTipOpen, setIsInfoTooltipOpen] = useState(false);
    
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedCard, setSelectedCard] = useState({link: "", name: "", isOpen: false});
    const [selectedCardDelete, setSelectedCardDelete] = useState({});


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate()


    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data)})
            .catch(err => console.log(err));
    }, []);

    function handleCardClick(card) {
        setSelectedCard({link: card.link, name: card.name, isOpen: true});
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleDeleteCardClick(card) {
        setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
        setSelectedCardDelete(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.putLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(err));

        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    const newCards = cards.map((c) => c._id === card._id ? newCard : c)
                    setCards(newCards)
                })
                .catch(err => console.log(err));
        }
    }
    function handleCardDelete() {
        api.deleteCard(selectedCardDelete._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== selectedCardDelete._id);
                setCards(newCards);
                setSelectedCardDelete({});
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }
        function handleUpdateUser(data) {
            api.patchUserProfile(data)
                .then(() => {
                    setCurrentUser({...currentUser, ...data});
                    closeAllPopups();
                })
                .catch(err => console.log(err));
        }

    function handleUpdateAvatar(data) {
        api.patchAvatar(data)
            .then(res => {
                setCurrentUser(res);
            })
            .then(() => {
                setIsEditAvatarPopupOpen(false);
            })
            .catch(err => console.log(err));
    }

        function handleAddPlaceSubmit(card) {
            api.postUserCard(card)
                .then((newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
                .catch(err => console.log(err));
        }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setSelectedCard({link: "", name: "", isOpen: false});
    };


  return (
      <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header
          />
        <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleDeleteCardClick}
            cards = {cards}
            />
      <Footer />
       <ImagePopup
            name="img"
            card={selectedCard}
            onClose={closeAllPopups}/>
        <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            />
        <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}/>
        <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpen}/>
       <DeleteCardPopup
            onClose={closeAllPopups}
            isOpen={isDeleteCardPopupOpen}
            onDeleteCard={handleCardDelete}/>

    </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
