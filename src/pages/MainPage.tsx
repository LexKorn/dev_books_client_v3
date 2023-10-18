import React, {useState, useEffect, useContext} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import BookItem from '../components/BookItem/BookItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Statistics from '../components/Statistics/Statistics';
import ModalBookDetail from '../components/Modals/ModalBookDetail';
import { IBook } from '../types/types';
import { fetchBooks } from '../http/bookAPI';
import { fetchAuthors } from '../http/authorAPI';
import { fetchCountries } from '../http/countryAPI';
import { Context } from '../index';


const MainPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [book, setBook] = useState<IBook>({} as IBook);

    useEffect(() => {
        getBooks();
        fetchAuthors().then(data => library.setAuthors(data));
        fetchCountries().then(data => library.setCountries(data));
    }, []);
  
    function getBooks() {
        fetchBooks()
            .then(data => library.setBooks(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const selectBook = (item: IBook) => {
        setBook(item);
        setVisible(true)
    };

    return (        
        <Container>
            <Helmet>
                <title>Мои книги</title>
                <meta name="description" content="Портал прочитанных книг" />
            </Helmet>

            <Statistics />
            <FilterPanel elems={library.books} />
            <h1 style={{textAlign: 'center'}}>Прочитанные книги:</h1>
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={library.visibleBooks} 
                    renderItem={(book: IBook) => 
                        <BookItem 
                            book={book} 
                            onClick={(book) => selectBook(book)}                  
                            key={book.id} 
                        />
                    } 
                />
            }
            <ModalBookDetail 
                showBook={visible} 
                onHideBook={() => setVisible(false)} 
                book={book}
            />
        </Container>
    );
});

export default MainPage;