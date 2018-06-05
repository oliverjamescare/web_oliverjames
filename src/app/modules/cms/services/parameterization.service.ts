import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {ApiService} from './api.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ParameterizationService {
    private endpoint: string;
    private webEndpoint: string;

    constructor(private httpClient: HttpClient,
                private authService: AuthService, private apiService: ApiService) {
        this.endpoint = environment.admin;
        this.webEndpoint = environment.api;
    }

    getCommissionParameters(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/commission`,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getGeneralPricingRoles(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/pricing/roles`,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getGeneralPricing(id): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/pricing/roles/` + id,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getNotificationsParameters(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/notifications`,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getSpecialDatePricing(id): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/pricing/special-dates/` + id,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

    getSpecialDates(): Observable<any> {
        return this.httpClient.get(
            `${this.endpoint}/parameters/pricing/special-dates`,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    updateGeneralPricing(carerRoleId, generalPricing): Observable<any> {
        return this.httpClient.put(
            `${this.endpoint}/parameters/pricing/roles/` + carerRoleId,
            generalPricing,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }
    addSpecialDatePricing(customDay): Observable<any> {
        console.log(customDay);
        return this.httpClient.post(
            `${this.endpoint}/parameters/pricing/special-dates`,
            customDay,
            {
                headers: this.apiService.getAuthorizationHeaders()
            }
        );
    }

}