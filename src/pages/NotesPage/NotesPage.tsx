import React, { useState, useEffect } from 'react';
import {Form, Container, Spinner} from 'react-bootstrap';
import {Helmet} from "react-helmet";

import List from '../../components/List/List';
import ListItem from '../../components/ListItem/ListItem';
import ModalNote from '../../components/Modals/ModalNote';
import { INote } from '../../types/types';
import {createNote, deleteNote, fetchNotes} from '../../http/noteAPI';

import './notesPage.sass';


const NotesPage: React.FC = () => {
    const [value, setValue] = useState<string>('');
    const [notes, setNotes] = useState<INote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [note, setNote] = useState<INote>({} as INote);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {
        getNotes();
    }, [refresh, visible]);

    async function getNotes() {
        fetchNotes()
            .then(data => setNotes(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const addNote = () => {
        createNote(value)
            .then(() => {
                setValue('');
                setRefresh(!refresh);
            })
            .catch(err => alert(err.message)); 
    };    

    const removeNote = (note: INote) => {
        if (window.confirm('Вы действительно хотите удалить заметку?')) {
            deleteNote(note.id);
            getNotes();
        }
    };

    const editNote = (note: INote) => {
        setNote(note);
        setVisible(true);
    };
      
    const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();           
            if (!value.trim()) {               
                return alert('Поле обязательно для заполнения');
            }
            addNote();
        }
    };

   
    return (
        <Container>
            <Helmet>
                <title>Книги к прочтению</title>
                <meta name="description" content="Добавить книгу к прочтению" />
            </Helmet>

            <h1 className='notes__title'>Список книг, которые планирую прочитать:</h1>
            <Form className="d-flex justify-content-between mt-5 mb-5 notes__form">
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    // @ts-ignore
                    onKeyPress={e => keyPress(e)}
                    placeholder={"Добавить книгу"}
                />
            </Form>            
            {loading ? <Spinner animation={"border"}/> :
                <List 
                    items={notes} 
                    renderItem={(note: INote) => 
                        <ListItem 
                            onDelete={() => removeNote(note)} 
                            onEdit={() => editNote(note)} 
                            item={note} 
                            key={note.id} 
                        />
                    } 
                />}
            <ModalNote show={visible} onHide={() => setVisible(false)} note={note} />            
        </Container>            
    );
};

export default NotesPage;