import React from 'react';
import { Card } from 'react-bootstrap';

import { INote, IQuote } from '../../types/types';

import './listItem.sass';

interface ListItemProps {
    item: IQuote | INote;
    onDelete: (item: IQuote | INote) => void;
    onEdit: (item: IQuote | INote) => void;
};


const ListItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    return (
        <Card 
            className="list-item shadow"
        >
            {/* @ts-ignore */}
            <div>{item.name ? item.name : item.quote}</div>
            <div>
                <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
            </div>
        </Card>      
    );
};

export default ListItem;