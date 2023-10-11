import React, {useContext, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { IAuthor, IBook, ICountry } from '../../types/types';
import { Context } from '../../index';
import { fetchCountries } from '../../http/countryAPI';
import { MAIN_ROUTE } from '../../utils/consts';

import './filterPanel.sass';

interface FilterPanelProps {
    elems: (IAuthor | IBook)[];
};


const FilterPanel:React.FC<FilterPanelProps> = observer(({elems}) => {
    const {library} = useContext(Context);
    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('Все');
    const [countries, setCountries] = useState<ICountry[]>([]);
    const location = useLocation();
    const isMain = location.pathname === MAIN_ROUTE;

    useEffect(() => {
        fetchCountries().then(data => setCountries(data));
    }, []);

    useEffect(() => {
        if (isMain) {
            // @ts-ignore 
            library.setVisibleBooks(sort(filterPost(search(elems, value), filter)));
        } else {
            // @ts-ignore 
            library.setVisibleAuthors(sort(filterPost(search(elems, value), filter)));
        }
    }, [value, filter, elems]);
        
    const arrAuthorId: number[] = library.books.map(book => book.authorId);
    
    const authorFrequency = arrAuthorId.reduce((acc: {[index: string]:any}, elem) => {
        acc[elem] = (acc[elem] || 0) + 1;
        return acc;
    }, {});

    const Russia: ICountry[] = countries.filter(country => country.name === 'Россия');
    const USSR: ICountry[] = countries.filter(country => country.name === 'СССР');   

    function search(items: (IAuthor | IBook)[], term: string) {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    function filterPost(items: (IAuthor | IBook)[], filter: string) {
        switch (filter) {
            case 'Отечественные':
                if (Russia.length > 0 && USSR.length > 0) {
                    return items.filter(item => item.countryId === Russia[0].id || item.countryId === USSR[0].id);
                } else if (Russia.length === 0 && USSR.length > 0) {
                    return items.filter(item => item.countryId === USSR[0].id);
                } else if (Russia.length > 0 && USSR.length === 0) {
                    return items.filter(item => item.countryId === Russia[0].id);
                } 
                return items;
            case 'Зарубежные':
                if (Russia.length > 0 && USSR.length > 0) {
                    return items.filter(item => item.countryId !== Russia[0].id && item.countryId !== USSR[0].id);
                } else if (Russia.length === 0 && USSR.length > 0) {
                    return items.filter(item => item.countryId !== USSR[0].id);
                } else if (Russia.length > 0 && USSR.length === 0) {
                    return items.filter(item => item.countryId !== Russia[0].id);
                }
                return items;
            case 'Любимые':
                return isMain ?
                    // @ts-ignore 
                    items.filter(item => item.rating >= 8)
                    : 
                    items.filter(item => authorFrequency[item.id] > 4);
            case 'Все':
                return items;
            default:
                return items;
        }
    };

    function sort(items: (IAuthor | IBook)[]) {        
        let sortItems: (IAuthor | IBook)[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return sortItems;
    };


    return (
        <>
            <div className='filter'>
                <button className='filter__btn' onClick={(e) => setFilter('Отечественные')}>Отечественные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Зарубежные')}>Зарубежные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Любимые')}>Любимые</button>
                <button className='filter__btn' onClick={(e) => setFilter('Все')}>Все</button>
            </div>
            <div className='search'>
                <input 
                    className='search__input' 
                    type='text' 
                    placeholder='Начните вводить искомое слово' 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                {Boolean(value) && <i className="bi bi-x-circle search__icon" onClick={() => setValue('')}></i>}
            </div>
        </>        
    );
});

export default FilterPanel;