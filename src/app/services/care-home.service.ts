import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable()
export class CareHomeService
{
    public address;

    constructor(private apiService: ApiService, private authService: AuthService) {}

    loginCareHome(email: string, password: string)
    {
        const body = { email, password, "userType": "care_home"};
        return this.apiService
            .login(body)
            .map(result => {

                //care home login handle
                const user = new User(result["user"]);
                this.authService.login(user);
                return result;
            });;
    }
}
