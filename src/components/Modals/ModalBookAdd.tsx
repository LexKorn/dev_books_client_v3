import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { createBook } from '../../http/bookAPI';
// import { IBook } from '../../types/types';
import CUBook from '../CreateUpdate/CUBook';

interface ModalBookAddProps {
    show: boolean;
    onHide: () => void;
};


const ModalBookAdd: React.FC<ModalBookAddProps> = ({show, onHide}) => {
    const [name, setName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>('');
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
                    id={0}
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
                    // @ts-ignore
                    handler={createBook}
                    title='Добавить книгу'
                    btnName='Добавить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBookAdd;