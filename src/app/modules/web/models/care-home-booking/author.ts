import {CareHome} from './care-home';
import {Address} from './address';

export interface Author {
    _id: string;
    care_home: CareHome;
    email: string;
    phone_number: string;
    address: Address;
    distance?: number;
}