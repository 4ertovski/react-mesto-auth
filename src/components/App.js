import '../index.css';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState,useEffect } from 'react';
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
import {useNavigate, Route, Routes ,Navigate} from "react-router-dom";
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

    //TODO utils
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [dataLoadingError, setDataLoadingError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    ////////TODO AUTH

    useEffect(() => {
        const cachedUser = localStorage.getItem("cachedUser");
        if (cachedUser){
            auth
                .checkToken(cachedUser)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        navigate("/");
                        setUserEmail(res.data.email);
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [navigate]);

    useEffect(() => {
        isLoggedIn &&
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards])=>{
                setCurrentUser(user);
                setCards(cards);
                //TODO is loaded
                setDataIsLoaded(true);
            })
            .catch((error) => {
                //TODO loading error
                setDataLoadingError(`Что-то пошло не так... (${error})`);
                console.log(error)
            })
    }, [isLoggedIn]);


    const handleRegister = (values) =>{
        if (!values.email || !values.password){
            return;
        }
        auth
            .register(values.email, values.password)
            .then((res) => {
                setError(false);
                setIsInfoTooltipOpen((prev) => !prev);
                navigate("/sign-in", { replace: true });
            })
            .catch((error) => {
                setError(true);
                setIsInfoTooltipOpen((prev) => !prev);
                console.log(error);
            })
    }

    const handleLogin = (values) => {
        if (!values.email || !values.password){
            return;
        }
        auth
            .authorize(values.email, values.password)
            .then((data) => {
                if (data.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem("cachedUser", data.token);
                    setUserEmail(values.email);
                    navigate("/")
                }
            })
            .catch((error) => {
                setError(true);
                setIsInfoTooltipOpen((prev) => !prev);
                console.log(error);
            })
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail("");
        localStorage.removeItem("cachedUser");
    };

    ///////END AUTH

    function handleCardClick(card) {
        setSelectedCard({link: card.link, name: card.name, isOpen: true}); //TODO test with card
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
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

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
            })
            .then(() => {
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }
    function handleUpdateUser(data) {
        //TODO is loading
        setIsLoading(true);
        api.patchUserProfile(data)
            .then(() => {
                setCurrentUser({...currentUser, ...data});
                closeAllPopups();
            })
            .catch(err => console.log(err))
            //TODO finally is loading
         .finally(() => {
             setIsLoading(false);
        });
    }

    function handleUpdateAvatar(data) {
        //TODO is loading
        setIsLoading(true);
        api.patchAvatar(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups(); //TODO del?
            })
            // .then(() => { TODO uncomment?
            //     setIsEditAvatarPopupOpen(false);
            // })
            .catch(err => console.log(err))
        //TODO finally is loading
    .finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit(card) {
        setIsLoading(true);
        //TODO is loading
        api.postUserCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
        //TODO finally is loading
            .finally(() => setIsLoading(false));
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsDeleteCardPopupOpen(false)
        setSelectedCard({link: "", name: "", isOpen: false});
        setIsInfoTooltipOpen(false);
    }


    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header email={userEmail} onLogout={handleLogout}/>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                element={Main}
                                loggedIn={isLoggedIn}
                                onEditProfile={handleEditProfileClick}
                                onEditAvatar={handleEditAvatarClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike = {handleCardLike}
                                onCardDelete = {handleDeleteCardClick}
                                cards = {cards}
                                dataIsLoaded={dataIsLoaded}
                                dataLoadingError={dataLoadingError}/> //TODO add dataIsLoaded dataLoadingError
                        }
                    />
                    <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
                    <Route path="/sign-in" element={<Login
                        onLogin={handleLogin}
                        setError={setError}
                        setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                        setUserEmail={setUserEmail}
                    />}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
             < Footer />
                <ImagePopup
                    name="img"
                    card={selectedCard}
                    onClose={closeAllPopups}/>
                <AddPlacePopup
                    onAddPlace={handleAddPlaceSubmit}
                    onClose={closeAllPopups}
                    isOpen={isAddPlacePopupOpen}
                    isLoading={isLoading}
                />
                <EditAvatarPopup
                    onUpdateAvatar={handleUpdateAvatar}
                    onClose={closeAllPopups}
                    isOpen={isEditAvatarPopupOpen}
                    isLoading={isLoading}/>
                <EditProfilePopup
                    onUpdateUser={handleUpdateUser}
                    onClose={closeAllPopups}
                    isOpen={isEditProfilePopupOpen}
                    isLoading={isLoading}/>
                <DeleteCardPopup
                    onClose={closeAllPopups}
                    isOpen={isDeleteCardPopupOpen}
                    onDeleteCard={handleCardDelete}/>
                {/*    TODO add infoTooltip*/}
                <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={closeAllPopups}
                    error={error}/>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
