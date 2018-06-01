import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { AuthService } from './auth.service';
import { Admin } from '../models/admin.model';

@Injectable()
export class AdminService
{
    constructor(private apiService: ApiService, private authService: AuthService) {}

    login(email: string, password: string)
    {
        return this.apiService
            .login({ email, password })
            .map(result => {

                //admin login handle
                // const admin = new Admin(result["user"]);
                let admin = result["user"];
                admin.id = admin._id;
                delete admin._id;
                this.authService.login(admin);
                return result;
            });
    }

    home()
    {
        return this.apiService.home();
    }

}
