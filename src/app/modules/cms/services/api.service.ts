import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {CarersListResponse} from '../models/response/carers-list-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class ApiService {
    private endpoint: string;

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
        this.endpoint = environment.admin;
    }

    // auth
    login(body: Object) {
        return this.httpClient.post(this.endpoint + '/login', body);
    }

    // carers
    getCarersList(search: string, sort: string, page: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/carers`,
            {
                headers: this.getAuthorizationHeaders(),
                params: new HttpParams().set('search', search).set('sort', sort).set('page', `${page}`)
            }
        );
    }

    getCarerDetails(id: string): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/carers/${id}`,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    private getAuthorizationHeaders(): HttpHeaders {
        return new HttpHeaders({
            'X-access-token': this.authService.getAccessToken()
        });
    }
}
