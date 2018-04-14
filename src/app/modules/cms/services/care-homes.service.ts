import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

import { User } from '../../cms/models/user.model';

@Injectable()
export class CareHomesService
{
    private careHomes: Array<User> = [];
    page: number = 1;
    pages: number = 1;

    constructor(private apiService: ApiService) {}
    getCareHomes(): Array<User>
    {
        return this.careHomes.slice()
    }

    getCareHomesList(search: string = '', status: string, sort: string,  page: number = this.page): Observable<any>
    {
        return this.apiService
            .getCareHomes(search, status, sort, page)
            .map(results => {

                if(Array.isArray(results.results))
                    this.careHomes = results.results.map(user => new User(user));

                if(results.pages)
                    this.pages = results.pages;

                return results;
            });
    }
    getCareHome(id: string): Observable<any>
    {
        return this.apiService.getCareHomeDetails(id).map(result => new User(result));
    }

    // getCarerDetails(id: string): Observable<CarerDetailsResponse> {
    //     return this.apiService.getCarerDetails(id);
    // }


}
