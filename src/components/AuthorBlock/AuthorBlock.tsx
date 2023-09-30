import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import {Helmet} from "react-helmet";

import { IAuthor, ICountry } from '../../types/types';
import { AUTHORS_ROUTE, NOTFOUND_ROUTE } from '../../utils/consts';
import { deleteAuthor, fetchOneAuthor } from '../../http/authorAPI';
import { fetchCountries } from '../../http/countryAPI';
import {Context} from '../../index';
import ModalAuthor from '../Modals/ModalAuthor';

import './authorBlock.sass';


const AuthorBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [author, setAuthor] = useState<IAuthor>({} as IAuthor);    
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        fetchCountries().then(data => library.setCountries(data));
        fetchOneAuthor(id)
            .then(data => setAuthor(data))
            .catch(() => navigate(NOTFOUND_ROUTE))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        library.setSelectedCountry(countryAuthor[0]);
    }, [author]);

    const countryAuthor: ICountry[] = library.countries.filter(country => country.id === author.countryId);

    const removeAuthor = () => {
        if (window.confirm('Вы действительно хотите удалить автора? Все книги, связанные с ним, будут удалены.')) {
            deleteAuthor(author.id);
            navigate(AUTHORS_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <div className='author'>
            <Helmet>
                <title>{author.name}</title>
                <meta name="description" content={`Страничка ${author.name}`} />
            </Helmet>
            <div className="author__wrapper">
                <img src={process.env.REACT_APP_API_URL + author.photo} className='author__wrapper__photo' alt="photo of author" />
                <div className="author__wrapper__text">
                    <div className="author__name">{author.name}</div>
                    <div className="author__country">{countryAuthor.length > 0 ? countryAuthor[0].name : ''}</div>
                    <button className='author__button' onClick={() => setVisible(true)}>Редактировать</button>
                    <button className='author__button' onClick={removeAuthor}>Удалить</button>
                    <div className="author__description">{author.description}</div>
                </div>                
            </div>
            <ModalAuthor 
                show={visible} 
                onHide={() => setVisible(false)} 
                author={author}
            />
        </div>
    );
};

export default AuthorBlock;