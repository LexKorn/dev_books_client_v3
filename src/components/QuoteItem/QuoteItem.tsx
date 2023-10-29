import React, {useState} from 'react';
import { Card } from 'react-bootstrap';

import { IQuote } from '../../types/types';

import './quoteItem.sass';

interface ListItemProps {
    item: IQuote;
    onDelete: (item: IQuote) => void;
    onEdit: (item: IQuote) => void;
};


const QuoteItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    const [hover, setHover] = useState<boolean>(false);

    return (
        <Card 
            className="quote-item shadow"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div>{item.quote}</div>
            <div 
                className="quote-item__icons"
                style={{visibility: hover ? 'visible' : 'hidden'}}
                // style={{display: hover ? 'flex' : 'none'}}
            >
                <div>
                    <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                    <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
                </div>
            </div>
        </Card>      
    );
};

export default QuoteItem;