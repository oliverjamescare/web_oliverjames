import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {CarersListResponse} from '../models/response/carers-list-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {CarerDetailsResponse} from '../models/response/carer-details-response';

@Injectable()
export class ApiService {
    private endpoint: string;
    private webEndpoint: string;

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {
        this.endpoint = environment.admin;
        this.webEndpoint = environment.api;
    }

    // auth
    login(body: Object) {
        return this.httpClient.post(this.endpoint + '/login', body);
    }

    // carers
    getCarersList(search: string, sort: string, statusFilter: string, page: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/carers`,
            {
                headers: this.getAuthorizationHeaders(),
                params: new HttpParams().set('search', search).set('sort', sort).set('page', `${page}`).set('status_filter', statusFilter)
            }
        );
    }

    getCarerDetails(id: string): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/carers/${id}`,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    addCarer(carerData: any): Observable<any> {
        return this.httpClient.post(
            `${this.endpoint}/carers`,
            carerData,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    updateCarerDetails(carerId: string, carerDetails: CarerDetailsResponse): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/carers/${carerId}`,
            carerDetails,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    uploadCarerResources(carerId: string, resourceName: string, files: FormData): Observable<any> {
        return this.httpClient.post(
            `${this.endpoint}/carers/${carerId}/${resourceName}/upload`,
            files,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    deleteResourceFile(carerId: string, resourceName: string, fileUrl: string): Observable<any> {
        return this.httpClient.delete(
            `${this.endpoint}/carers/${carerId}/${resourceName}/upload`,
            {headers: this.getAuthorizationHeaders(), params: new HttpParams().set('file', fileUrl)}
        );
    }

    // jobs
    getJobs(search: string, jobStatus: string, reviewStatus: string, manualBooking: string, page: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/jobs`,
            {
                headers: this.getAuthorizationHeaders(),
                params: new HttpParams().set('search', search).set('job_status_filter', jobStatus).set('review_status_filter', reviewStatus)
                    .set('manual_booking_filter', manualBooking).set('page', `${page}`)
            }
        );
    }

    getJobDetails(jobId: string): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/jobs/${jobId}`,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    updateJob(jobId: string, body: FormData): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/jobs/${jobId}`,
            body,
            {headers: this.getAuthorizationHeaders()}
        );
    }

    cancelJob(jobId: string, waiveCharges: string): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/jobs/${jobId}/cancel`,
            {waive_charges: waiveCharges},
            {headers: this.getAuthorizationHeaders()}
        );
    }

    resolveChallange(jobId: string, status: string, reason: string): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/jobs/${jobId}/challenge`,
            {status: status, response: reason},
            {headers: this.getAuthorizationHeaders()}
        );
    }


    checkUniqueness(param: string, value: string) {
        return this.httpClient.get(this.webEndpoint + '/user/uniqueness', {params: new HttpParams().set(param, value)});
    }

    private getAuthorizationHeaders(): HttpHeaders {
        return new HttpHeaders({
            'X-access-token': this.authService.getAccessToken()
        });
    }

    approveJobReview(jobId: string, status: string): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/jobs/${jobId}/review`,
            {status},
            {headers: this.getAuthorizationHeaders()}
        );
    }

    //care homes
    getCareHomes(search: string, status: string, sort: string, page: number): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/care-homes`,
            {
                headers: this.getAuthorizationHeaders(),
                params: new HttpParams().set('search', search).set('status_filter', status).set('sort', sort).set('page', `${page}`)
            }
        );
    }

    getCareHomeDetails(id: string): Observable<any> {
        return this.httpClient.get(`${this.endpoint}/care-homes/${id}`, {headers: this.getAuthorizationHeaders()});
    }

    updateCareHome(id: string, body: FormData): Observable<any> {
        return this.httpClient.put(`${this.endpoint}/care-homes/${id}`, body, {headers: this.getAuthorizationHeaders()});
    }
}
