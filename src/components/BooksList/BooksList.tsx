import React, {useState, useEffect, useContext} from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { IBook, IAuthor } from '../../types/types';
import { fetchBooks } from '../../http/bookAPI';
import { Context } from '../..';
import ModalBookDetail from '../Modals/ModalBookDetail';
import List from '../List/List';
import BookItem2 from '../BookItem/BookItem2';
import ModalBookAdd from '../Modals/ModalBookAdd';

import './booksList.sass';

interface BooksListProps {
    author: IAuthor;
};


const BooksList: React.FC<BooksListProps> = observer(({author}) => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [authorBooks, setAuthorBooks] = useState<IBook[]>([]);
    const [book, setBook] = useState<IBook>({} as IBook);
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleAddBook, setVisibleAddBook] = useState<boolean>(false);
    const {library} = useContext(Context);

    useEffect(() => {
        fetchBooks()
            .then(data => setBooks(data.sort((a: IBook, b: IBook) => a.name > b.name ? 1 : -1)))
            .catch(err => alert(err.message))
    }, [library.toggle]);

    useEffect(() => {
        setAuthorBooks(books.filter(book => book.authorId === author.id));
    }, [books]);

    const selectBook = (item: IBook) => {
        setBook(item);
        setVisible(true)
    };

    return (
        <Container>
            <div className="books-list__title">
                <h3 style={{textAlign: 'center'}}>Книги автора:</h3>
                <i className="bi bi-plus-circle quotes__title_icon" onClick={() => setVisibleAddBook(true)}></i>
            </div>
            {Boolean(authorBooks.length) &&
                <ListGroup className="books-list__list">
                    <List 
                        items={authorBooks} 
                        renderItem={(book: IBook) => 
                            <BookItem2
                                book={book} 
                                onClick={(book) => selectBook(book)}                  
                                key={book.id} 
                            />
                        } 
                    />
                </ListGroup>
            }
            <ModalBookDetail 
                showBook={visible} 
                onHideBook={() => setVisible(false)} 
                book={book}
            />
            <ModalBookAdd
                show={visibleAddBook}
                onHide={() => setVisibleAddBook(false)}
            />
        </Container>        
    );
});

export default BooksList;