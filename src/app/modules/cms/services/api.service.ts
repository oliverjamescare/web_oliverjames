import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ApiService {
    private endpoint: string;

    constructor(private httpClient: HttpClient) {
        this.endpoint = environment.admin;
    }

    // auth
    login(body: Object) {
        return this.httpClient.post(this.endpoint + '/login', body);
    }
}
