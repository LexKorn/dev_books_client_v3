import React, {useState, useContext, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { Modal } from 'react-bootstrap';

import { IAuthor, ICountry } from '../../types/types';
import { deleteAuthor } from '../../http/authorAPI';
import { Context } from '../..';
import ModalAuthor from './ModalAuthor';
import BooksList from '../BooksList/BooksList';
import ModalBookAdd from './ModalBookAdd';

interface ModalAuthorDetailProps {
    showAuthor: boolean;
    onHideAuthor: () => void;
    author: IAuthor;
};


const ModalAuthorDetail: React.FunctionComponent<ModalAuthorDetailProps> = observer(({showAuthor, onHideAuthor, author}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAddBook, setVisibleAddBook] = useState<boolean>(false);
    const {library} = useContext(Context);

    useEffect(() => {
        library.setSelectedCountry(countryAuthor[0]);
        library.setSelectedAuthor(author);
    }, [author]);

    const countryAuthor: ICountry[] = library.countries.filter(country => country.id === author.countryId);

    const removeAuthor = () => {
        if (window.confirm('Ты действительно хочешь удалить автора?')) {
            deleteAuthor(author.id);
            library.setToggle(!library.toggle);
            onHideAuthor();
        }        
    };


    return (
        <Modal
            show={showAuthor}
            onHide={onHideAuthor}
            fullscreen="xxl-down"
            >
            <Modal.Body>
                <div className="author__wrapper">
                    <img src={process.env.REACT_APP_API_URL + author.photo} className='author__wrapper_photo' alt="photo of author" />
                    <div className="author__wrapper_text">
                        <div className="author__name">{author.name}</div>
                        <div className="author__country">{Boolean(countryAuthor.length) && countryAuthor[0].name}</div>
                        <div className="author__description">{author.description}</div>
                    </div>                
                </div>
                
                <div className="author__icons">
                    <i className="bi bi-pencil-fill list-item__icon" onClick={() => setVisible(true)}></i>
                    <i className="bi bi-trash3-fill list-item__icon" onClick={removeAuthor}></i>
                    <i className="bi bi-x-circle-fill list-item__icon" onClick={onHideAuthor}></i>
                </div>
                <div className="books-list__title">
                    <h3 style={{textAlign: 'center'}}>Книги автора:</h3>
                    <i className="bi bi-plus-circle quotes__title_icon" onClick={() => setVisibleAddBook(true)}></i>
                </div>
                <BooksList author={author} />
            </Modal.Body>
            <ModalAuthor
                show={visible} 
                onHide={() => setVisible(false)} 
                author={author}
            />
            <ModalBookAdd
                show={visibleAddBook}
                onHide={() => setVisibleAddBook(false)}
            />
        </Modal>
    );
});

export default ModalAuthorDetail;