import React from 'react';
import { Card } from 'react-bootstrap';

import { IQuote } from '../../types/types';

import './quoteItem.sass';

interface ListItemProps {
    item: IQuote;
    onDelete: (item: IQuote) => void;
    onEdit: (item: IQuote) => void;
};


const QuoteItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    return (
        <Card 
            className="quote-item shadow"
        >
            <div>{item.quote}</div>
            <div className="quote-item__icons">
                <div>
                    <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                    <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
                </div>
            </div>
        </Card>      
    );
};

export default QuoteItem;