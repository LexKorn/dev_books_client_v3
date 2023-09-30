import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';

import { updateQuote } from '../../http/quoteAPI';
import { IQuote } from '../../types/types';
import CUQuote from '../CUQuote';

interface ModalQuoteUpdateProps {
    show: boolean;
    onHide: () => void;
    bookId: number;
    quoteInit: IQuote
};


const ModalQuoteUpdate: React.FC<ModalQuoteUpdateProps> = ({show, onHide, bookId, quoteInit}) => {
    const [quote, setQuote] = useState<string>('');

    useEffect(() => {
        setQuote(quoteInit.quote);
    }, [show]);
    
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            >
            <Modal.Body>
                <CUQuote 
                    id={quoteInit.id}
                    quote={quote}                    
                    setQuote={setQuote}
                    bookId={bookId}
                    // @ts-ignore
                    handler={updateQuote}
                    title='Обновить цитату'
                    btnName='Обновить'
                    onHide={onHide}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalQuoteUpdate;