import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal, Button, Form} from 'react-bootstrap';

import {createCountry, deleteCountry, fetchCountries} from '../../http/countryAPI';
import { fetchAuthors } from '../../http/authorAPI';
import { ADD_AUTHOR_ROUTE } from '../../utils/consts';
import { IAuthor, ICountry } from '../../types/types';

interface ModalCountryProps {
    show: boolean;
    onHide: () => void;
};


const ModalCountry: React.FC<ModalCountryProps> = ({show, onHide}) => {
    const [value, setValue] = useState<string>('');
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors().then(data => setAuthors(data));
        fetchCountries().then(data => setCountries(data));
    }, []);

    const addCountry = () => {
        if (!value.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        createCountry(value)
            .then(() => {
                setValue('');
                onHide();
                navigate(ADD_AUTHOR_ROUTE);
            })
            .catch(err => alert(err.response.data.message));       
    };

    const removeCountry = () => {
        if (!value.trim()) {
			return alert('Поле обязательно для заполнения');
		}

        const country: ICountry[] = countries.filter(country => country.name == value);
        if (country.length > 0) {
            const authorCountry: IAuthor[] = authors.filter(author => author.countryId == country[0].id);
            if (authorCountry.length > 0) {
                return alert('Страну нельзя удалить, пока на неё ссылается автор');
            }
        }                

        deleteCountry(value).then(() => {
            setValue('');
            onHide();
            navigate(ADD_AUTHOR_ROUTE);
        });
    };

    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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
                    Выберите действие со страной
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        // @ts-ignore
                        onKeyPress={e => keyPress(e)}
                        placeholder={"Введите название страны"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCountry}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={removeCountry}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCountry;