import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { fetchCountries } from '../http/countryAPI';
import { AUTHORS_ROUTE } from '../utils/consts';
import ModalCountry from './Modals/ModalCountry';

interface CUAuthorProps {
    id: number;
    name: string;
    description: string;
    file: string;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setFile: (file: File) => void;
    handler: (id: number, author: FormData) => Promise<unknown>;
    title: string;
    btnName: string;
};


const CUAuthor: React.FC<CUAuthorProps> = observer(({id, name, description, file, setName, setDescription, setFile, handler, title, btnName}) => {
    const {library} = useContext(Context);
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchCountries().then(data => library.setCountries(data));
    }, [visible]);

    const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => { 
        const files: FileList | null = e.target.files;
        if (files) {
            if (files[0].size > 1048576) {
                return alert('Изображение должно быть менее 1мб')
            }
            // @ts-ignore 
            const fileExtension: string = files[0].name.split(".").at(-1);
            const allowedFileTypes: string[] = ["jpg", "jpeg", "png", "webp"];
            if (!allowedFileTypes.includes(fileExtension)) {
                return alert(`Расширение файла не поддерживается. Допустымые расширения: ${allowedFileTypes.join(", ")}`);
            }

            setFile(files[0]);
        }        
    };

    const onClick = () => {
        if (!name.trim()) {
            return alert('Имя автора обязательно для заполнения');
        } else if (!library.selectedCountry.id) {
            return alert('Страну необходимо указать');        
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('photo', file);
        formData.append('countryId', `${library.selectedCountry.id}`);

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(formData)
                .then(() => {
                    library.setSelectedCountry({
                        id: 0,
                        name: '',
                        userId: 0
                    });
                    navigate(AUTHORS_ROUTE);
                })
                .catch(err => alert(err.response.data.message));
        } else {
            handler(id, formData)
                .then(() => {
                    library.setSelectedCountry({
                        id: 0,
                        name: '',
                        userId: 0
                    });
                    navigate(AUTHORS_ROUTE);
                })
                .catch(err => alert(err.response.data.message));
        }
    };


    return (
        <Container className="d-flex justify-content-center">
            <div>
                <h1>{title}</h1>
                <Form>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите автора"
                    />
                    <Form.Control as="textarea"
                        className="mt-3"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Введите описание"
                        maxLength={700}
                    />              
                    <label htmlFor="file" className="mt-3">Загрузите фото автора</label>       
                    <Form.Control                        
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                    />                    
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle variant={"outline-dark"}>{library.selectedCountry.name || 'Выберите страну'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {library.countries.map(country => 
                                <Dropdown.Item 
                                    onClick={() => library.setSelectedCountry(country)} 
                                    key={country.id} >
                                        {country.name}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => setVisible(true)} >Добавить / удалить страну</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>
                <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>   
            <ModalCountry show={visible} onHide={() => setVisible(false)} />
        </Container>
    );
});

export default CUAuthor;