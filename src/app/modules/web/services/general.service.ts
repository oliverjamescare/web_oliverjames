import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';

@Injectable()
export class GeneralService
{
    public address;

    constructor(private apiService: ApiService) {}

    sendContactMessage(email: string, name: string, subject: string, message: string)
    {
        const body = { email, name, subject, message};
        return this.apiService.sendContactMessage(body);
    }
}
