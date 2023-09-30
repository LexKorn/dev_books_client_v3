import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { createQuote } from '../../http/quoteAPI';
import CUQuote from '../CUQuote';

interface ModalQuoteAddProps {
    show: boolean;
    onHide: () => void;
    bookId: number;
};


const ModalQuoteAdd: React.FC<ModalQuoteAddProps> = ({show, onHide, bookId}) => {
    const [quote, setQuote] = useState<string>('');
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUQuote 
                    id={0}
                    quote={quote}                    
                    setQuote={setQuote}
                    bookId={bookId}
                    // @ts-ignore
                    handler={createQuote}
                    title='Добавить цитату'
                    btnName='Добавить'
                    onHide={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalQuoteAdd;