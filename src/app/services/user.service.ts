import { Injectable } from "@angular/core";
import { ApiService } from './api.service';

@Injectable()
export class UserService
{
    constructor(private apiService: ApiService) {}

    checkEmailUniqueness(email: string)
    {
        console.log(this);
        return this.apiService.checkUniqueness("email", email);
    }
    checkPhoneNumberUniqueness(phoneNumber: string)
    {
        return this.apiService.checkUniqueness("phone_number", phoneNumber);
    }
}
