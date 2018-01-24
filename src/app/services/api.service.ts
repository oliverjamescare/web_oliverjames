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


}
