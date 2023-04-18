import React from 'react';
import Mesto_header_logo from '../images/Mesto_header_logo.svg';
import {Link, Route, Routes} from "react-router-dom";
function Header({onLogout, email}) {
    return (
        <header className='header'>
            <img src={Mesto_header_logo} alt="логотип Место" className="header__logo" />
            <div className="header__auth-info">
                {email && <p className="header__email">{email}</p>}
                <Routes>
                    <Route path="/" element={<Link to="/sign-in" className="header__logout" onClick={onLogout}>Выйти</Link>}/>
                    <Route path="/sign-up" element={<Link to="/sign-in" className="header__auth">Войти</Link>}/>
                    <Route path="/sign-in" element={<Link to="/sign-up" className="header__auth">Регистрация</Link>}/>
                </Routes>
            </div>
        </header>
    );
}

export default Header