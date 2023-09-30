import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateBook } from '../../http/bookAPI';
import { IBook } from '../../types/types';
import CUBook from '../CUBook';

interface ModalBookProps {
    show: boolean;
    onHide: () => void;
    book: IBook;
};


const ModalBook: React.FC<ModalBookProps> = ({show, onHide, book}) => {
    const [name, setName] = useState<string>(book.name);
    const [link, setLink] = useState<string>(book.link);
    const [rating, setRating] = useState<number>(book.rating);
    const [comment, setComment] = useState<string>(book.comment);
    const [file, setFile] = useState<string>('');
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUBook 
                    id={book.id}
                    name={name}
                    link={link}
                    rating={rating}
                    comment={comment}
                    file={file}
                    setName={setName}
                    setLink={setLink}
                    setRating={setRating}
                    setComment={setComment}
                    // @ts-ignore
                    setFile={setFile}
                    handler={updateBook}
                    title='Обновить книгу'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBook;