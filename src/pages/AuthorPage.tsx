import React from 'react';

import AuthorBlock from '../components/AuthorBlock/AuthorBlock';
import BooksList from '../components/BooksList/BooksList';

const AuthorPage: React.FC = () => {
    return (
        <div style={{marginTop: '70px'}}>
            <AuthorBlock />
            {/* <BooksList /> */}
        </div>
    );
};

export default AuthorPage;