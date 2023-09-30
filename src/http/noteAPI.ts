import { $authHost } from "./index";

export const createNote = async (name: string) => {
    const {data} = await $authHost.post('api/note', {name}); 
    return data;
};

export const deleteNote = async (id: number) => {
    const {data} = await $authHost.delete('api/note/' + id);
    return data;
};

export const updateNote = async (id: number, name: string) => {
    const {data} = await $authHost.put('api/note/' + id, {name});
    return data;
};

export const fetchNotes = async () => {
    const {data} = await $authHost.get('api/note');
    return data;
};