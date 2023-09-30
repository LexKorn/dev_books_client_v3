import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateAuthor } from '../../http/authorAPI';
import { IAuthor } from '../../types/types';
import CUAuthor from '../CUAuthor';

interface ModalAuthorProps {
    show: boolean;
    onHide: () => void;
    author: IAuthor;
};


const ModalAuthor: React.FC<ModalAuthorProps> = ({show, onHide, author}) => {
    const [name, setName] = useState<string>(author.name);
    const [description, setDescription] = useState<string>(author.description);
    const [file, setFile] = useState<string>('');
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUAuthor 
                    id={author.id}
                    name={name}
                    description={description}
                    file={file}
                    setName={setName}
                    setDescription={setDescription}
                    // @ts-ignore
                    setFile={setFile}
                    handler={updateAuthor}
                    title='Обновить автора'
                    btnName='Обновить'
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAuthor;