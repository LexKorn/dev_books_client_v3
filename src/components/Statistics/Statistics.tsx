import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';

import { fetchAuthors } from '../../http/authorAPI';
import { fetchBooks } from '../../http/bookAPI';
import {MAIN_ROUTE, AUTHORS_ROUTE} from '../../utils/consts';

import './statistics.sass';


const Statistics: React.FC = () => {
    const [quantityAuthors, setQuantityAuthors] = useState<number>(0);
    const [quantityBooks, setQuantityBooks] = useState<number>(0);

    useEffect(() => {
        fetchAuthors().then(data => setQuantityAuthors(data.length));
        fetchBooks().then(data => setQuantityBooks(data.length));
    }, []);

    return (
        <div className='statistics'>
            <div className='statistics__icons'>
                <NavLink to={MAIN_ROUTE} className='statistics__icons_link'><i className="bi bi-book-half"></i>{quantityBooks}</NavLink>
                <NavLink to={AUTHORS_ROUTE} className='statistics__icons_link'><i className="bi bi-person-circle"></i> {quantityAuthors}</NavLink>
            </div>
        </div>
    );
};

export default Statistics;