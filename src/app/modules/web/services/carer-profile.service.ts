import {Injectable} from '@angular/core';
import {CarerProfileResponse} from '../models/carer-profile/carer-profile-response';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service';

@Injectable()
export class CarerProfileService {
    carerProfile: CarerProfileResponse;

    constructor(private apiService: ApiService) {
    }

    getCarerProfile(): Observable<CarerProfileResponse> {
        return this.apiService.getUserProfile();
    }

    updateCarerProfile(formData: any): Observable<any> {
        return this.apiService.updateCarerProfile(formData);
    }
}
