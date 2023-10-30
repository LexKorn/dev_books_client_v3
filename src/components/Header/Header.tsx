import React, {useState, useEffect, useContext} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { MAIN_ROUTE, ADD_AUTHOR_ROUTE, AUTHORS_ROUTE, NOTE_ROUTE, MANUAL_ROUTE } from "../../utils/consts";
import { Context } from '../../index';

import './header.sass';


const Header: React.FC = () => {
    const location = useLocation();
    const [classMenu, setClassMenu] = useState<string>('');
    const {user} = useContext(Context);

    useEffect(() => {
        setClassMenu('');
    }, [location.pathname]);

    const menuHandler = () => {
        classMenu === '' ? setClassMenu('open-menu') : setClassMenu('');
    };

    const logOut = () => {
        user.setIsAuth(false);
        localStorage.clear();
    };

    return (
        <>
            {user.isAuth ?
                <div className='header'>
                    <div className={"header__menu-burger" + ' ' + classMenu} onClick={() => menuHandler()}>
                        <span></span>
                    </div>

                    <nav className={'header__nav' + ' ' + classMenu}>
                        <ul className="header__menu">
                            <li className="header__menu_item">
                                <NavLink to={MAIN_ROUTE} className={location.pathname === MAIN_ROUTE ? "active" : ''} >
                                    КНИГИ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={AUTHORS_ROUTE} className={location.pathname === AUTHORS_ROUTE ? "active" : ''} >
                                    АВТОРЫ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={ADD_AUTHOR_ROUTE} className={location.pathname === ADD_AUTHOR_ROUTE ? "active" : ''} >
                                    + АВТОР
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={NOTE_ROUTE} className={location.pathname === NOTE_ROUTE ? "active" : ''} >
                                    ПРОЧИТАТЬ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <NavLink to={MANUAL_ROUTE} className={location.pathname === MANUAL_ROUTE ? "active" : ''} >
                                    ИНСТРУКЦИЯ
                                </NavLink>
                            </li>
                            <li className="header__menu_item">
                                <Button 
                                    variant={"outline-secondary"} 
                                    onClick={() => logOut()} 
                                    className="ms-2 nav-btn"
                                    >Выйти
                                </Button> 
                            </li>
                        </ul>
                    </nav>
                </div>
            :
                <div></div>
            }
        </>
    );
};

export default Header;