import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, ListGroup } from 'react-bootstrap';

import { IBook, IAuthor } from '../../types/types';
import { fetchBooks } from '../../http/bookAPI';
import { fetchOneAuthor } from '../../http/authorAPI';
import { BOOK_ROUTE } from '../../utils/consts';

import './booksList.sass';


export default function BooksList<T> ()  {   //props: ListProps<T>
    const [books, setBooks] = useState<IBook[]>([]);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
        fetchOneAuthor(id).then(data => setAuthor(data))
    }, []);      
  
    function getBooks() {
        fetchBooks()
            .then(data => setBooks(data))
            .catch(err => alert(err.message))
    }

    const authorBooks: IBook[] = books.filter(book => book.authorId === author.id);   


    return (
        <Container>
            {authorBooks.length === 0 ? '' : <h3 style={{textAlign: 'center'}}>Книги автора:</h3>}            
            <ListGroup className="books-list">
                {authorBooks.map(item =>
                    <ListGroup.Item 
                        key={item.id}
                        className="books-list__item"
                        onClick={() => {navigate(BOOK_ROUTE + `/${item.id}`)}}
                        >{item.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>        
    );
};