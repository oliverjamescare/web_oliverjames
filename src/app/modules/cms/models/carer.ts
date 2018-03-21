import {Review} from './review';

export interface Carer {
    first_name: string;
    surname: string;
    date_of_birth: string;
    reviews: Review;
}
