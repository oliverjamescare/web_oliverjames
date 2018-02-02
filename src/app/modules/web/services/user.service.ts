import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class UserService
{
    constructor(private apiService: ApiService) {}

    checkEmailUniqueness(email: string)
    {
        return this.apiService.checkUniqueness('email', email);
    }

    confirmEmail(token: string)
    {
        return this.apiService.confirmEmail({ token });
    }

    checkPhoneNumberUniqueness(phoneNumber: string)
    {
        return this.apiService.checkUniqueness('phone_number', phoneNumber);
    }

    forgotPassword(email: string)
    {
        return this.apiService.forgotPassword({ email });
    }

    resetPassword(token: string, password: string)
    {
        return this.apiService.resetPassword({ token, password });
    }
}
