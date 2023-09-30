import React from 'react';

import BookBlock from '../components/BookBlock/BookBlock';
import QuotesList from '../components/QuotesList/QuotesList';


const BookPage: React.FC = () => {
    return (
        <div style={{marginTop: '70px'}}>
            <BookBlock />
            <QuotesList />
        </div>
    );
};

export default BookPage;