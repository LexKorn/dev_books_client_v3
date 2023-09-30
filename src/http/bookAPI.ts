import { $authHost } from "./index";

export const createBook = async (book: FormData) => {
    const {data} = await $authHost.post('api/book', book);    
    return data;
};

export const fetchBooks = async () => {
    const {data} = await $authHost.get('api/book');
    return data;
};

export const fetchOneBook = async (id: string | undefined) => {
    const {data} = await $authHost.get('api/book/' + id);
    return data;
};

export const deleteBook = async (id: number) => {
    const {data} = await $authHost.delete('api/book/' + id);
    return data;
};

export const updateBook = async (id: number, book: FormData) => {
    const {data} = await $authHost.put('api/book/' + id, book);
    return data;
};