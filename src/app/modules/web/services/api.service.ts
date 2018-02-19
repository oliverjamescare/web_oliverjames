import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class ApiService {
    private endpoint: string;

    constructor(private httpClient: HttpClient, private authService: AuthService) {
        this.endpoint = environment.api;
    }

    // auth
    register(form: FormData | Object) {
        return this.httpClient.post(this.endpoint + '/register', form);
    }

    login(body: Object) {
        return this.httpClient.post(this.endpoint + '/login', body);
    }

    forgotPassword(body: Object) {
        return this.httpClient.post(this.endpoint + '/password/remind', body);
    }

    resetPassword(body: Object) {
        return this.httpClient.put(this.endpoint + '/password/remind/change', body);
    }

    addCareHomeToWaitingList(body: Object) {
        return this.httpClient.post(this.endpoint + '/care-home/waiting-list', body);
    }

    // contact
    sendContactMessage(body: Object) {
        return this.httpClient.post(this.endpoint + '/contact', body);
    }

    // user
    checkUniqueness(param: string, value: string) {
        return this.httpClient.get(this.endpoint + '/user/uniqueness', {params: new HttpParams().set(param, value)});
    }

    confirmEmail(body: Object) {
        return this.httpClient.put(this.endpoint + '/user/confirm-email', body);
    }

    // carer
    checkCarersNearPoint(params: HttpParams) {
        return this.httpClient.get(this.endpoint + '/carers/nearby', {params: params});
    }

    // care home
    getCalendarData(): Observable<any> {
        return this.httpClient.get(this.endpoint + '/care-home/calendar', {headers: this.getAuthorizationHeaders()});
    }

    private getAuthorizationHeaders(): HttpHeaders {
        return new HttpHeaders({
            'X-access-token': this.authService.getAccessToken().token
        });
    }
}
