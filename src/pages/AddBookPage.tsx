import React, { useState } from 'react';
import {Helmet} from "react-helmet";

import { createBook } from '../http/bookAPI';
import CUBook from '../components/CreateUpdate/CUBook';


const AddBookPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [rating, setRating] = useState<number>(5);
    const [comment, setComment] = useState<string>('');
    const [file, setFile] = useState<string>('');

    return (
        <div style={{marginTop: '60px'}}>
            <Helmet>
                <title>Добавить книгу</title>
                <meta name="description" content="Добавить книгу" />
            </Helmet>
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
        </div>
    );
};

export default AddBookPage;