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

    //user
    checkUniqueness(param: string, value: string)
    {
        return this.httpClient.get(this.endpoint + "/user/uniqueness", { params: new HttpParams().set(param, value) });
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


}
