import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

import { User } from '../../cms/models/user.model';
import { FormGroup } from '@angular/forms';
import { WaitingUser } from '../models/waiting-user.model';

@Injectable()
export class WaitingListService
{
    private waitingUsers: Array<WaitingUser> = [];
    page: number = 1;
    pages: number = 1;

    constructor(private apiService: ApiService) {}
    getWaitingUsers(): Array<WaitingUser>
    {
        return this.waitingUsers.slice()
    }

    getWaitingList(page: number = this.page): Observable<any>
    {
        return this.apiService
            .getWaitingList(page)
            .map(results => {

                if(Array.isArray(results.results))
                    this.waitingUsers = results.results.map(user => new WaitingUser(user));

                if(results.pages)
                    this.pages = results.pages;

                return results;
            });
    }

    deleteWaitingUser(id: string): Observable<any>
    {
        return this.apiService.deleteWaitingUser(id);
    }
}
