import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import 'rxjs/Rx';

import {AuthService} from './auth.service';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable()
export class CareHomeService {
    public address;
    public addressForm: FormGroup;

    constructor(private apiService: ApiService, private authService: AuthService) {
    }

    registerCareHome(careHomeFormObject: Object) {
        this.addressForm = null;
        return this.apiService.register(careHomeFormObject);
    }

    loginCareHome(email: string, password: string) {
        const body = {email, password, 'userType': 'care_home'};
        return this.apiService
            .login(body)
            .map(result => {

                // care home login handle
                const user = new User(result['user']);
                this.authService.login(user);
                return result;
            });
    }

    checkCarersNearby(addressObject: Object) {
        const params = new HttpParams()
            .set('postal_code', addressObject['postal_code'])
            .set('address_line_1', addressObject['address_line_1'])
            .set('address_line_2', addressObject['address_line_2'])
            .set('city', addressObject['city']);

        return this.apiService.checkCarersNearPoint(params);
    }

    addCareHomeToWaitingList(waitingFormObject: Object) {
        return this.apiService.addCareHomeToWaitingList(waitingFormObject);
    }

}
