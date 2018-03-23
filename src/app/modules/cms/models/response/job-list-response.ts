import {JobListObject} from './job-list-object';

export interface JobListResponse {
    results: JobListObject[];
    pages: number;
    total: number;
}