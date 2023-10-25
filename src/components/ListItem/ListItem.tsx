import React from 'react';
import { Card } from 'react-bootstrap';

import { INote } from '../../types/types';

import './listItem.sass';

interface ListItemProps {
    item: INote;
    onDelete: (item: INote) => void;
    onEdit: (item: INote) => void;
};


const ListItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    return (
        <Card 
            className="list-item shadow"
        >
            <div>{item.name}</div>
            <div>
                <i className="bi bi-pencil-fill list-item__icon" onClick={() => onEdit(item)}></i>
                <i className="bi bi-trash3-fill list-item__icon" onClick={() => onDelete(item)}></i>
            </div>
        </Card>      
    );
};

export default ListItem;