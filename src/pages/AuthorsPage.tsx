import React, {useState, useEffect, useContext} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import AuthorItem from '../components/AuthorItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import Statistics from '../components/Statistics/Statistics';
import ModalAuthorDetail from '../components/Modals/ModalAuthorDetail';
import { IAuthor } from '../types/types';
import { fetchAuthors } from '../http/authorAPI';
import { fetchBooks } from '../http/bookAPI';
import { fetchCountries } from '../http/countryAPI';
import { Context } from '../index';


const AuthorsPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getAuthors();
        fetchBooks().then(data => library.setBooks(data));
        fetchCountries().then(data => library.setCountries(data));
    }, [library.toggle]);
  
    function getAuthors() {
        fetchAuthors()
            .then(data => library.setAuthors(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const selectAuthor = (item: IAuthor) => {
        setAuthor(item);
        setVisible(true)
    };


    return (
        <Container
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        >
            <Helmet>
                <title>Список авторов</title>
                <meta name="description" content="Список авторов" />
            </Helmet>

            <Statistics />
            <FilterPanel elems={library.authors} />
            <h1 style={{textAlign: 'center'}}>Список авторов:</h1>
            {loading ? <Spinner animation={"border"}/> :
                <List
                    items={library.visibleAuthors} 
                    renderItem={(author: IAuthor) => 
                        <AuthorItem 
                            onClick={(author) => selectAuthor(author)}
                            author={author} 
                            key={author.id} 
                        />
                    } 
                />
            }
            <ModalAuthorDetail 
                showAuthor={visible} 
                onHideAuthor={() => setVisible(false)} 
                author={author}
            />
        </Container>
    );
});

export default AuthorsPage;