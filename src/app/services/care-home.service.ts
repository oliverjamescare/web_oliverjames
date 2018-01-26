import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class CareHomeService
{
    constructor(private apiService: ApiService) {}

    loginCareHome(email: string, password: string)
    {
        let form = new FormData();
        form.append("email", email);
        form.append("password", password);
        form.append("userType", "careHome");

        return this.apiService.login(form);
    }
}
