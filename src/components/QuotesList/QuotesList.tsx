import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';

import { IBook, IQuote } from '../../types/types';
import { fetchQuotes, deleteQuote } from '../../http/quoteAPI';
import List from '../List/List';
import QuoteItem from '../QuoteItem/QuoteItem';
import ModalQuoteUpdate from '../Modals/ModalQuoteUpdate';
import ModalQuoteAdd from '../Modals/ModalQuoteAdd';

import './quotesList.sass';

interface QuotesListProps {
    book: IBook;
};


const QuotesList: React.FC<QuotesListProps> = ({book}) => {
    const [quote, setQuote] = useState<IQuote>({} as IQuote);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [visibleQuote, setVisibleQuote] = useState<boolean>(false);

    useEffect(() => {
        fetchQuotes()
            .then(data => setQuotes(data))
            .catch(err => alert(err.message))
    }, [toggle, visible, visibleQuote]);

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
            <div className="quotes__title">
                <h3>Цитаты:</h3>
                <i className="bi bi-plus-circle quotes__title_icon" onClick={() => setVisibleQuote(true)}></i>
            </div>
            <List 
                items={bookQuotes} 
                renderItem={(quote: IQuote) => 
                    <QuoteItem 
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

export default QuotesList;