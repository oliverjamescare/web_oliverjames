import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class CareHomeService
{
    constructor(private apiService: ApiService) {}

    loginCareHome(email: string, password: string)
    {
        const body = { email, password, "userType": "careHome"};
        return this.apiService.login(body);
    }
}
