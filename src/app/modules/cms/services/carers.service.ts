import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {CarersListResponse} from '../models/response/carers-list-response';
import {CarerDetailsResponse} from '../models/response/carer-details-response';

@Injectable()
export class CarersService {
    constructor(private apiService: ApiService) {
    }

    getCarersList(search: string = '', sort: string, statusFilter: string, page: number): Observable<CarersListResponse> {
        return this.apiService.getCarersList(search, sort, statusFilter, page);
    }

    getCarerDetails(id: string): Observable<CarerDetailsResponse> {
        return this.apiService.getCarerDetails(id);
    }

    addCarer(carerData: any): Observable<any> {
        return this.apiService.addCarer(carerData);
    }

    updateCarerDetails(id: string, details: CarerDetailsResponse): Observable<any> {
        return this.apiService.updateCarerDetails(id, details);
    }

    uploadCarerResources(carerId: string, resourceName: string, files: FormData): Observable<any> {
        return this.apiService.uploadCarerResources(carerId, resourceName, files);
    }

    deleteResourceFile(carerId: string, resourceName: string, fileUrl: string): Observable<any> {
        return this.apiService.deleteResourceFile(carerId, resourceName, fileUrl);
    }

    checkPhoneNumberUniqueness(phoneNumber: string) {
        return this.apiService.checkUniqueness('phone_number', phoneNumber);
    }

    checkEmailUniqueness(email: string) {
        return this.apiService.checkUniqueness('email', email);
    }

}
