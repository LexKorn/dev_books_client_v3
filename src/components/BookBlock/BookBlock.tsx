import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IAuthor, IBook } from '../../types/types';
import { MAIN_ROUTE, AUTHOR_ROUTE, NOTFOUND_ROUTE } from '../../utils/consts';
import { deleteBook, fetchOneBook } from '../../http/bookAPI';
import { fetchAuthors } from '../../http/authorAPI';
import {Context} from '../../index';
import ModalBook from '../Modals/ModalBook';

import './bookBlock.sass';


const BookBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [book, setBook] = useState<IBook>({} as IBook);    
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
        fetchOneBook(id)
            .then(data => setBook(data))
            .catch(() => navigate(NOTFOUND_ROUTE))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        library.setSelectedAuthor(authorBook[0]);
    }, [book]);

    const authorBook: IAuthor[] = library.authors.filter(author => author.id === book.authorId);

    const removeBook = () => {
        if (window.confirm('Вы действительно хотите удалить книгу?')) {
            deleteBook(book.id);
            navigate(MAIN_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }    


    return (
        <div className='book'>
            <Helmet>
                <title>{book.name}</title>
                <meta name="description" content={`Страничка книги ${book.name}`} />
            </Helmet>
            <div className="book__wrapper">
                <img src={process.env.REACT_APP_API_URL + book.cover} className='book__wrapper__cover' alt='cover of book' />
                <div className="book__wrapper__text">                    
                    <div 
                        className="book__author"
                        style={{cursor: 'pointer'}}
                        onClick={() => {navigate(AUTHOR_ROUTE + `/${authorBook[0].id}`)}}
                        >{authorBook.length > 0 ? authorBook[0].name : ''}
                    </div>
                    <div className="book__name">{book.name}</div>
                    <div className="book__rating">{book.rating}</div>
                    {book.link &&
                        <a className="book__link" href={book.link} target="_blank">Прочитать можно здесь &gt;&gt;</a>
                    }
                    <br/>
                    <button className='book__button' onClick={() => setVisible(true)}>Редактировать</button>
                    <button className='book__button' onClick={removeBook}>Удалить</button>
                    <div className="book__comment">{book.comment}</div>
                </div>                
            </div>
            <ModalBook 
                show={visible} 
                onHide={() => setVisible(false)} 
                book={book}
            />
        </div>
    );
};

export default BookBlock;