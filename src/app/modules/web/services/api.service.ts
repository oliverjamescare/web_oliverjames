import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Availability} from '../models/carer-availability/carer-availability';
import {AvailableJobsResponse} from '../models/available-jobs/available-jobs-response';

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

    getUpcomingJobs(page: number): Observable<any> {
        return this.httpClient.get(`${this.endpoint}/carer/my-jobs?page=${page}`, {headers: this.getAuthorizationHeaders()});
    }

    getAvailabilityCalendar(week: number): Observable<Availability> {
        return this.httpClient.get<Availability>(
            `${this.endpoint}/carer/availability?week=${week}`,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    updateAvailabilityCalendar(week: number, availability: Availability): Observable<Availability> {
        return this.httpClient.put<Availability>(
            `${this.endpoint}/carer/availability?week=${week}`,
            availability,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    getAvailableJobs(params: HttpParams): Observable<AvailableJobsResponse> {
        return this.httpClient.get<AvailableJobsResponse>(
            `${this.endpoint}/carer/jobs`,
            {headers: this.getAuthorizationHeaders(), params: params}
        );
    }

    updateCarerProfile(body: any): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/user/carer`,
            body,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    // care home
    getCalendarData(): Observable<any> {
        return this.httpClient.get(this.endpoint + '/care-home/calendar', {headers: this.getAuthorizationHeaders()});
    }

    searchForPriorityUsers(searchString: string): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/care-home/carers/search`,
            {headers: this.getAuthorizationHeaders(), params: new HttpParams().set('search', searchString)});
    }

    checkCarersToContact(jobs: string, gender: string = 'no preference'): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/jobs/carers`,
            {headers: this.getAuthorizationHeaders(), params: new HttpParams().set('jobs', jobs).set('gender', gender)}
        );
    }

    bookJobs(data: any): Observable<any> {
        return this.httpClient.post(
            `${this.endpoint}/jobs`,
            data,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    // care home & carer

    getUserProfile(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/user/profile`,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    changeEmail(email: string): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/user/email`,
            {email},
            {headers: this.getAuthorizationHeaders()}
        );
    }

    resendEmail(): Observable<any> {
        return this.httpClient.post(
            `${this.endpoint}/user/email/verification`,
            {},
            {headers: this.getAuthorizationHeaders()}
        )
    }

    changeProfileImage(formData: FormData): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/user/profile-image`,
            formData,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    changePassword(oldPassword: string, newPassword: string): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/user/password`,
            {old_password: oldPassword, new_password: newPassword},
            {headers: this.getAuthorizationHeaders()}
        );
    }

    private getAuthorizationHeaders(): HttpHeaders {
        return new HttpHeaders({
            'X-access-token': this.authService.getAccessToken().token
        });
    }
}
