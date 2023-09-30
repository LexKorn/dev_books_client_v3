import React, {useContext} from 'react';
import { Card } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { IAuthor, IBook } from '../../types/types';
import { Context } from '../../index';

import './bookItem.sass';

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem: React.FC<BookItemProps> = observer(({book, onClick}) => {    
    const {library} = useContext(Context);
    const authorBook: IAuthor[] = library.authors.filter(author => author.id === book.authorId);

    if (authorBook.length > 0) {
        return (
            <Card 
                className="book-item shadow"
                onClick={() => onClick(book)}
            >
                {/* <div className='book-item__title'><span>{book.name}</span> - {authorBook[0].name} </div> */}
                <div className='book-item__title'>
                    <div className='book-item__title_book'>{book.name}</div>
                    <div className='book-item__title_author'>{authorBook[0].name}</div>
                </div>
                <div className='book-item__rating'>{book.rating} <i className="bi bi-star"></i></div>
            </Card>        
        );
    } else {
        return (
            <div></div>
        );
    }
});

export default BookItem;