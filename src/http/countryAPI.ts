import { $authHost } from "./index";

export const createCountry = async (name: string) => {
    const {data} = await $authHost.post('api/country', {name});    
    return data;
};

export const fetchCountries = async () => {
    const {data} = await $authHost.get('api/country');
    return data;
};

export const deleteCountry = async (name: string) => {
    const {data} = await $authHost.delete('api/country/' + name);
    return data;
};