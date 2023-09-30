import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import BookItem from '../components/BookItem/BookItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Statistics from '../components/Statistics/Statistics';
import { IBook } from '../types/types';
import { fetchBooks } from '../http/bookAPI';
import { fetchAuthors } from '../http/authorAPI';
import { Context } from '../index';


const MainPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
        fetchAuthors().then(data => library.setAuthors(data));
    }, []);
  
    function getBooks() {
        fetchBooks()
            .then(data => library.setBooks(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }


    return (        
        <Container>
            <Helmet>
                <title>Мои книги</title>
                <meta name="description" content="Портал прочитанных книг" />
            </Helmet>

            <Statistics />
            <FilterPanel elems={library.books} />
            <h1 style={{textAlign: 'center'}}>Список добавленных книг:</h1>
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={library.visibleBooks} 
                    renderItem={(book: IBook) => 
                        <BookItem 
                            book={book} 
                            onClick={(book) => navigate('/book/' + book.id)}                         
                            key={book.id} 
                        />
                    } 
                />}           
        </Container>
    );
});

export default MainPage;