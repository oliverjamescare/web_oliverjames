import {Component, OnInit} from '@angular/core';
import {CarersService} from '../../../../services/carers.service';
import {CarersListResponse} from '../../../../models/response/carers-list-response';
import {CarerListObject} from '../../../../models/response/carer-list-object';

@Component({
    selector: 'app-carers-list',
    templateUrl: './carers-list.component.html',
    styleUrls: ['./carers-list.component.scss']
})
export class CarersListComponent implements OnInit {

    carers: CarerListObject[] = [];

    searchString: string;
    searchField: string;
    sort: string;
    page = 1;
    pages: number[] = [];

    constructor(private carersService: CarersService) {
    }

    ngOnInit() {
        this.getCarersList();
    }

    onPageChange(page: number): void {
        this.page = page;
        this.getCarersList();
    }

    onSearch(searchField: string, searchString: string): void {
        this.searchField = searchField;
        this.searchString = searchString;
        this.getCarersList();
    }

    private getCarersList(): void {
        this.carersService.getCarersList(this.searchString, this.sort, this.page)
            .subscribe(
                (response: CarersListResponse) => {
                    this.handleCarersListResponse(response);
                },
                error => console.log('Get carers list response', error)
            );
    }

    private handleCarersListResponse(response: CarersListResponse): void {
        console.log('Get carers list response', response);
        this.pages = this.setPaginationArray(response.pages)
        this.carers = response.results;
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

}
