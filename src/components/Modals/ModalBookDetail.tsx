import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { Button, Modal } from 'react-bootstrap';

import { IBook, IAuthor } from '../../types/types';
import { deleteBook } from '../../http/bookAPI';
import { AUTHOR_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import ModalBook from './ModalBook';
import QuotesList from '../QuotesList/QuotesList';

interface ModalBookDetailProps {
    show: boolean;
    onHide: () => void;
    book: IBook;
};


const ModalBookDetail: React.FunctionComponent<ModalBookDetailProps> = observer(({show, onHide, book}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const {library} = useContext(Context);
    const navigate = useNavigate();

    const authorBook: IAuthor[] = library.authors.filter(author => author.id === book.authorId);

    const removeBook = () => {
        if (window.confirm('Ты действительно хочешь удалить книгу?')) {
            deleteBook(book.id);
            library.setToggle(!library.toggle);
            onHide();
        }        
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            fullscreen="xxl-down"
            // centered
            >
            <Modal.Body>
                    <div className="book__wrapper">
                        <img src={process.env.REACT_APP_API_URL + book.cover} className='book__wrapper_cover' alt='cover of book' />
                        <div className="book__wrapper_text">                    
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
                            <div className="book__comment">{book.comment}</div>
                        </div>                
                    </div>
                
                <div className="book__icons">
                    <i className="bi bi-pencil-fill list-item__icon" onClick={() => setVisible(true)}></i>
                    <i className="bi bi-trash3-fill list-item__icon" onClick={removeBook}></i>
                    <Button variant={"outline-secondary"} className="book__card_close" onClick={onHide}>Закрыть</Button>
                </div>
                <QuotesList book={book} />
            </Modal.Body>
            <ModalBook 
                show={visible} 
                onHide={() => setVisible(false)} 
                book={book}
            />
        </Modal>
    );
});

export default ModalBookDetail;