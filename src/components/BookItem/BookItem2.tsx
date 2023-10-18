import React from 'react';
import { Card } from 'react-bootstrap';

import { IBook } from '../../types/types';

import './bookItem.sass';

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem2: React.FC<BookItemProps> = ({book, onClick}) => {
    return (
        <Card 
            className="book-item shadow"
            onClick={() => onClick(book)}
        >
            <div className='book-item__title'>
                <div className='book-item__title_book'>{book.name}</div>
            </div>
            <div className='book-item__rating'>{book.rating} <i className="bi bi-star"></i></div>
        </Card>        
    );
};

export default BookItem2;