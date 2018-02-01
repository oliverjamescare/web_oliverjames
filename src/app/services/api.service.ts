import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ApiService
{
    private endpoint: string;
    constructor(private httpClient: HttpClient)
    {
        this.endpoint = environment.api;
    }

    //contact
    sendContactMessage(body: Object)
    {
        return this.httpClient.post(this.endpoint + "/contact", body);
    }

    //user
    checkUniqueness(param: string, value: string)
    {
        return this.httpClient.get(this.endpoint + "/user/uniqueness", { params: new HttpParams().set(param, value) });
    }
    confirmEmail(body: Object)
    {
        return this.httpClient.put(this.endpoint + "/user/confirm-email", body);
    }

    //auth
    register(form: FormData)
    {
        return this.httpClient.post(this.endpoint + "/register", form);
    }

    login(body: Object)
    {
        return this.httpClient.post(this.endpoint + "/login", body);
    }

    forgotPassword(body: Object)
    {
        return this.httpClient.post(this.endpoint + "/password/remind", body);
    }

    resetPassword(body: Object)
    {
        return this.httpClient.put(this.endpoint + "/password/remind/change", body);
    }

}
