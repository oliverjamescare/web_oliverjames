import {Job} from '../care-home-booking/job';

export interface AvailableJobsResponse {
    results: Job[];
    pages: number;
    total: number;
}
