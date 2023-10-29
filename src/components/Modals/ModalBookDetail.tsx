import React, {useState, useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';

import { IBook, IAuthor } from '../../types/types';
import { deleteBook } from '../../http/bookAPI';
import { Context } from '../..';
import ModalBook from './ModalBookUpdate';
import ModalAuthorDetail from './ModalAuthorDetail';
import QuotesList from '../QuotesList/QuotesList';

interface ModalBookDetailProps {
    showBook: boolean;
    onHideBook: () => void;
    book: IBook;
};


const ModalBookDetail: React.FunctionComponent<ModalBookDetailProps> = observer(({showBook, onHideBook, book}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAuthor, setVisibleAuthor] = useState<boolean>(false);
    const {library} = useContext(Context);

    useEffect(() => {
        library.setSelectedAuthor(authorBook[0]);
    }, [book]);

    const authorBook: IAuthor[] = library.authors.filter(author => author.id === book.authorId);

    const removeBook = () => {
        if (window.confirm('Ты действительно хочешь удалить книгу?')) {
            deleteBook(book.id);
            // window.location.reload();
            onHideBook();
            library.setToggle(library.toggle);
        }        
    };

    const closeModals = () => {
        setVisibleAuthor(false);
        onHideBook()
    };


    return (
        <Modal
            show={showBook}
            onHide={onHideBook}
            fullscreen="xxl-down"
            >
            <Modal.Body>
                    <div className="book__wrapper">
                        <img src={process.env.REACT_APP_API_URL + book.cover} className='book__wrapper_cover' alt='cover of book' />
                        <div className="book__wrapper_text">                    
                            <div 
                                className="book__author"
                                style={{cursor: 'pointer'}}
                                onClick={() => setVisibleAuthor(true)}
                                >{authorBook.length > 0 ? authorBook[0].name : ''}
                            </div>
                            <div className="book__name">{book.name}</div>
                            <div className="book__rating">{book.rating}</div>
                            {book.link &&
                                <a className="book__link" href={book.link} target="_blank" rel="noreferrer">Прочитать можно здесь &gt;&gt;</a>
                            }
                            <div className="book__comment">{book.comment}</div>
                        </div>                
                    </div>
                
                <div className="book__icons">
                    <i className="bi bi-pencil-fill list-item__icon" onClick={() => setVisible(true)}></i>
                    <i className="bi bi-trash3-fill list-item__icon" onClick={removeBook}></i>
                    <i className="bi bi-x-circle-fill list-item__icon" onClick={onHideBook}></i>
                </div>
                <QuotesList book={book} />
            </Modal.Body>
            <ModalBook 
                show={visible} 
                onHide={() => setVisible(false)} 
                book={book}
            />
            <ModalAuthorDetail 
                showAuthor={visibleAuthor} 
                onHideAuthor={closeModals}
                author={ authorBook[0]}
            />
        </Modal>
    );
});

export default ModalBookDetail;