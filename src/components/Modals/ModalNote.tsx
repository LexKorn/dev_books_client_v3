import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

import { updateNote } from '../../http/noteAPI';
import {INote} from '../../types/types';

interface ModalNoteProps {
    show: boolean;
    onHide: () => void;
    note: INote;
};


const ModalNote: React.FC<ModalNoteProps> = ({show, onHide, note}) => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        setName(note.name);
    }, [show]);
    

    const editNote = () => {
        if (!name.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        updateNote(note.id, name)
            .then(() => {
                setName('');
                onHide();
            })
            .catch(err => alert(err.response.data.message)); 
    };

    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            editNote();
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            // @ts-ignore
            size="md"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновите заметку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        // @ts-ignore
                        onKeyPress={e => keyPress(e)}
                        placeholder={"Введите название книги"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-primary"} onClick={() => editNote()}>Обновить</Button>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalNote;