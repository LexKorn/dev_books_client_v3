import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button, Form, Dropdown} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';
import { fetchAuthors } from '../http/authorAPI';
import { ADD_AUTHOR_ROUTE, MAIN_ROUTE, AUTHOR_ROUTE } from '../utils/consts';
import { IAuthor } from '../types/types';

interface CUBookProps {
    id: number;
    name: string;
    link: string;
    rating: number;
    comment: string;
    file: string;
    setName: (name: string) => void;
    setLink: (link: string) => void;
    setRating: (rating: number) => void;
    setComment: (comment: string) => void;
    setFile: (file: File) => void;
    handler: (id: number, book: FormData) => Promise<any>;
    title: string;
    btnName: string;
};


const CUBook: React.FC<CUBookProps> = observer(({id, name, link, rating, comment, file, setName, setLink, setRating, setComment, setFile, handler, title, btnName}) => {
    const {library} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
    }, []);    

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
            return alert('Название книги обязательно для заполнения');
        } else if (!library.selectedAuthor.id) {
            return alert('Автора необходимо указать');
        } else if (rating < 1 || rating > 10) {
            return alert ('Оценка книги должна быть от 1 до 10');
        // } else if (!isValidUrl(link)) {
        //     return alert ('Неверный формат ссылки');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('link', link);
        formData.append('rating', `${rating}`);
        formData.append('comment', comment);
        formData.append('cover', file);
        formData.append('authorId', `${library.selectedAuthor.id}`);
        formData.append('countryId', `${library.selectedAuthor.countryId}`);

        if (btnName === 'Добавить') {
            // @ts-ignore 
            handler(formData).then(() => {
                navigate(AUTHOR_ROUTE + '/' + library.selectedAuthor.id);
                library.setSelectedAuthor({} as IAuthor);
            });
        } else {
            handler(id, formData).then(() => {
                navigate(AUTHOR_ROUTE + '/' + library.selectedAuthor.id);
                library.setSelectedAuthor({} as IAuthor);
            });
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
                        placeholder="Введите название книги"
                    />
                    <Form.Control
                        className="mt-3"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        placeholder="Введите ссылку на книгу"
                    />
                    <label htmlFor="rating" className="mt-3">Поставьте оценку книги от 1 до 10</label> 
                    <Form.Control
                        value={rating}
                        type="number"
                        onChange={e => setRating(+e.target.value)}
                    />
                    <Form.Control as="textarea"
                        className="mt-3"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Введите коментарий"
                        maxLength={700}
                    />              
                    <label htmlFor="file" className="mt-3">Загрузите обложку книги</label>       
                    <Form.Control                        
                        type="file"
                        accept="image/*"
                        onChange={selectFile}
                    />                    
                    <Dropdown className="mt-3 mb-3">
                        <Dropdown.Toggle variant={"outline-dark"}>{library.selectedAuthor.name || 'Выберите автора'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {library.authors.map(author => 
                                <Dropdown.Item 
                                    onClick={() => library.setSelectedAuthor(author)} 
                                    key={author.id} >
                                        {author.name}
                                </Dropdown.Item>                                
                            )}
                            <Dropdown.Item onClick={() => navigate(ADD_AUTHOR_ROUTE)} >Добавить автора</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>            
                </Form>
                <Button variant={"outline-dark"} onClick={onClick} className="mt-3">{btnName}</Button>           
            </div>
        </Container>
    );
});

export default CUBook;