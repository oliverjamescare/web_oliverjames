import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

import { User } from '../../cms/models/user.model';
import { CarerDetailsResponse } from '../models/response/carer-details-response';
import { FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

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

    updateCareHomeDetails(id: string, form: FormGroup, floorPlan: File): Observable<any>
    {
        //data serialisation
        const formData: FormData = new FormData();

        Object.keys(form.value).forEach(key => {
            if(key == "banned_until")
            {
                if(form.get(key).value !== '')
                {
                    const date = new Date(form.get(key).value);
                    date.setHours(23,59,59,999);
                    formData.append(key, date.getTime().toString());
                }
            }
            else if(key != "floor_plan")
                formData.append(key, form.get(key).value);
        });

        if(floorPlan)
            formData.append("floor_plan", floorPlan);

        return this.apiService.updateCareHome(id, formData);
    }

    addCareHome(form: FormGroup, floorPlan: File)
    {
        //data serialisation
        const formData: FormData = new FormData();

        Object.keys(form.value).forEach(key => {
            if(key != "floor_plan")
                formData.append(key, form.get(key).value);
        });

        if(floorPlan)
            formData.append("floor_plan", floorPlan);

        return this.apiService.addCareHome(formData);
    }

    addCredits(id: string, params: HttpParams): Observable<any>
    {
        return this.apiService.addCredits(id, params);
    }

    checkPhoneNumberUniqueness(phoneNumber: string) {
        return this.apiService.checkUniqueness('phone_number', phoneNumber);
    }

    checkEmailUniqueness(email: string) {
        return this.apiService.checkUniqueness('email', email);
    }


}
