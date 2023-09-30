import React from 'react';
import {Container, Button, Form } from 'react-bootstrap';

interface CUQuoteProps {
    id: number;
    quote: string;
    setQuote: (quote: string) => void;
    bookId: number;
    handler: (id: number, quote: string, bookId: number) => Promise<unknown>;
    title: string;
    btnName: string;
    onHide: () => void;
};


const CUQuote: React.FC<CUQuoteProps> = ({id, quote, setQuote, bookId, handler, title, btnName, onHide}) => {
    const onClick = () => {
        if (!quote.trim()) {
            return alert('Поле обязательно для заполнения');
        }

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(quote, bookId)
                .then(() => {
                    setQuote('');
                    onHide();
                })
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, quote, bookId)
                .then(() => {
                    setQuote('');
                    onHide();
                })
                .catch(err => alert(err.response.data.message));
        }
    };


    return (
        <Container className="d-flex flex-column justify-content-center">
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <Form>
                <Form.Control as="textarea"
                    className="mt-3"
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    placeholder="Введите цитату"
                    maxLength={700}
                />          
            </Form>
            <Button variant={"outline-dark"} onClick={onClick} className="mt-3" style={{width: 100}}>{btnName}</Button>
        </Container>
    );
};

export default CUQuote;