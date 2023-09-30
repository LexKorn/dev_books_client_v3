import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { IBook, IQuote } from '../../types/types';
import { fetchQuotes, deleteQuote } from '../../http/quoteAPI';
import { fetchOneBook } from '../../http/bookAPI';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import ModalQuoteUpdate from '../Modals/ModalQuoteUpdate';
import ModalQuoteAdd from '../Modals/ModalQuoteAdd';

import './quotesList.sass';


export default function QuotesList<T> () {
    const [quote, setQuote] = useState<IQuote>({} as IQuote);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [book, setBook] = useState<IBook>({} as IBook);
    const [toggle, setToggle] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleQuote, setVisibleQuote] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(() => {
        fetchQuotes()
            .then(data => setQuotes(data))
            .catch(err => alert(err.message));
    }, [toggle, visible, visibleQuote]);

    useEffect(() => {
        fetchOneBook(id)
            .then(data => setBook(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }, []);

    const bookQuotes: IQuote[] = quotes.filter(quote => quote.bookId === book.id);

    const removeQuote = (quote: IQuote) => {
        if (window.confirm('Вы действительно хотите удалить цитату?')) {
            deleteQuote(quote.id);
            setToggle(!toggle);
        }
    };

    const editQuote = (quote: IQuote) => {
        setQuote(quote);
        setVisible(true);
    };


    return (
        <Container className="quotes">
            {!loading && <div className="quotes__title">
                <h3>Цитаты:</h3>
                <i className="bi bi-plus-circle quotes__title_icon" onClick={() => setVisibleQuote(true)}></i>
            </div>}
            <List 
                items={bookQuotes} 
                renderItem={(quote: IQuote) => 
                    <ListItem 
                        onDelete={() => removeQuote(quote)} 
                        onEdit={() => editQuote(quote)} 
                        item={quote} 
                        key={quote.id} 
                    />
                } 
            />
            <ModalQuoteAdd
                show={visibleQuote} 
                onHide={() => setVisibleQuote(false)} 
                bookId={book.id}
            />
            <ModalQuoteUpdate
                show={visible} 
                onHide={() => setVisible(false)} 
                bookId={book.id}
                quoteInit={quote}
            />
        </Container> 
    );
};