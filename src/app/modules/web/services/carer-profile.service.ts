import { Injectable } from '@angular/core';
import { CarerProfileResponse } from '../models/carer-profile/carer-profile-response';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable()
export class CarerProfileService
{
    carerProfile: CarerProfileResponse;

    constructor(private apiService: ApiService) {}

    getCarerProfile(): Observable<User>
    {
        return this.apiService.getUserProfile().map(result => new User(result));
    }

    updateCarerProfile(formData: any): Observable<any>
    {
        return this.apiService.updateCarerProfile(formData);
    }
}
