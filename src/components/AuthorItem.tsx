import React from 'react';
import { Card } from 'react-bootstrap';

import { IAuthor } from '../types/types';

interface AuthorItemProps {
    author: IAuthor;
    onClick: (author: IAuthor) => void;
};


const AuthorItem: React.FC<AuthorItemProps> = ({author, onClick}) => {    
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
            onClick={() => onClick(author)}
        >
            {author.name}
        </Card>
    );
};

export default AuthorItem;