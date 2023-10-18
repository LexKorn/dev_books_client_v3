import React, { useState } from 'react';
import {Helmet} from "react-helmet";

import CUAuthor from '../components/CreateUpdate/CUAuthor';
import { createAuthor } from '../http/authorAPI';


const AddAuthorPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [file, setFile] = useState<string>('');
    
    return (
        <div style={{marginTop: '60px'}}>
            <Helmet>
                <title>Добавить автора</title>
                <meta name="description" content="Добавить автора" />
            </Helmet>
            <CUAuthor 
                id={0}
                name={name}
                description={description}
                file={file}
                setName={setName}
                setDescription={setDescription}
                // @ts-ignore
                setFile={setFile}
                // @ts-ignore
                handler={createAuthor}
                title='Добавить автора'
                btnName='Добавить'
            />
        </div>
    );
};

export default AddAuthorPage;