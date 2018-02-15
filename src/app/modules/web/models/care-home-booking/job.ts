import {Author} from './author';

export interface Job {
    _id: string;
    start_date: number;
    end_date: number;
    role: string;
    author: Author;
}