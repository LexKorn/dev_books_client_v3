import {makeAutoObservable} from 'mobx';

import { IBook, IAuthor, ICountry } from '../types/types';

export default class LibraryStore {
    _countries: ICountry[];
    _authors: IAuthor[];
    _books: IBook[];
    _selectedCountry: ICountry;
    _selectedAuthor: IAuthor;
    _visibleAuthors: IAuthor[];
    _visibleBooks: IBook[];

    constructor() {
       this._countries = [];
       this._authors = [];
       this._books = [];
       this._selectedCountry = {
            id: 0,
            name: '',
            userId: 0
        };
       this._selectedAuthor = {
            id: 0,
            name: '',
            description: '',
            photo: '',
            userId: 0,
            countryId: 0,        
        };
       this._visibleAuthors = [];
       this._visibleBooks = [];

       makeAutoObservable(this); 
    };

    setCountries(countries: ICountry[]) {
        this._countries = countries;
    };
    setAuthors(authors: IAuthor[]) {
        this._authors = authors;
    };
    setBooks(books: IBook[]) {
        this._books = books;
    };
    setSelectedCountry(country: ICountry) {
        this._selectedCountry = country;
    };
    setSelectedAuthor(author: IAuthor) {
        this._selectedAuthor = author;
    };
    setVisibleAuthors(visibleAuthors: IAuthor[]) {
        this._visibleAuthors = visibleAuthors;
    };
    setVisibleBooks(visibleBooks: IBook[]) {
        this._visibleBooks = visibleBooks;
    };


    get countries() {
        return this._countries;
    };
    get authors() {
        return this._authors;
    };
    get books() {
        return this._books;
    };
    get selectedCountry() {
        return this._selectedCountry;
    }
    get selectedAuthor() {
        return this._selectedAuthor;
    }
    get visibleAuthors() {
        return this._visibleAuthors;
    };
    get visibleBooks() {
        return this._visibleBooks;
    };
};