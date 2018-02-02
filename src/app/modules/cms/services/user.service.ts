import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable()
export class UserService
{
    constructor(private apiService: ApiService, private authService: AuthService) {}

    login(email: string, password: string)
    {
        return this.apiService
            .login({ email, password })
            .map(result => {

                //admin login handle
                const user = new User(result["user"]);
                this.authService.login(user);
                return result;
            });
    }

}
