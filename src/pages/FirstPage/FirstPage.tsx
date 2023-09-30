import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';

import { LOGIN_ROUTE } from "../../utils/consts";

import './firstPage.sass';


const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container className="first">
            <h1 className="first__title">МОИ КНИГИ</h1>
            <p className="first__text">
                Привет! 
                <br/> 
                Добро пожаловать на портал книг.
                <br/> 
                Здесь ты можешь добавлять любимые книги и цитаты из них, авторов, комментарии, а также делать заметки, что хотел бы прочитать.
                <br/><br/>
                Каждый пользователь создаёт свою персональную библиотеку, поэтому необходима регистрация.
                <br/><br/>
                Чтобы ознакомиться с сайтом ты можешь использовать тестовые данные для входа: email: test@q.ru, password: test1234.
            </p>
            <Button 
                className="first__btn"
                variant={"outline-dark"} 
                onClick={() => navigate(LOGIN_ROUTE)}
                >Авторизация
            </Button>
        </Container>
    );
};

export default FirstPage;