import {CarerListObject} from './carer-list-object';

export interface CarersListResponse {
    results: CarerListObject[];
    pages: number;
    total: number;
}