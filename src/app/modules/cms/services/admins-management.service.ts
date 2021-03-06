import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AdminsManagementService {

    private endpoint: string;
    private webEndpoint: string;

    constructor(private httpClient: HttpClient,
                private authService: AuthService, private apiService: ApiService) {
        this.endpoint = environment.admin;
        this.webEndpoint = environment.api;
    }

    getAdminsList(page: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/admins`,
            {
                headers: this.apiService.getAuthorizationHeaders(),
                params: new HttpParams().set('page', `${page}`)
            }
        );
    }

    deleteAdminAccount(listAdminId: string): Observable<any> {
        return this.httpClient.delete(
            `${this.endpoint}/admins/` + listAdminId,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    changeAdminPassword(old_password, new_password): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/password`,
            {old_password: old_password, new_password: new_password}
            ,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    changeListAdminPassword(id, new_password): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/admins/` + id + '/password',
            {id: id, password: new_password}
            ,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    getAdminProfile(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/profile`,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    updateAdminProfile(email, first_name, surname): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/profile`,
            {email: email, first_name: first_name, surname: surname}
            ,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getAdminDetails(page: number, results: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/admins`,
            {
                headers: this.apiService.getAuthorizationHeaders(),
                params: new HttpParams().set('page', `${page}`).set('results', `${results}`)
            }
        );
    }
    updateAdminProfileList(id, email, first_name, surname, role): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/admins/` + id,
            {email: email, first_name: first_name, surname: surname, role: role}
            ,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    addNewAdminAccount(email, first_name, surname, password): Observable<any> {
        return this.httpClient.post(
            `${this.endpoint}/admins/`,
            {email: email, first_name: first_name, surname: surname, password: password}
            ,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

}
