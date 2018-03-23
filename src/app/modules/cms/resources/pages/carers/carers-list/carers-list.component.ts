import {Component, OnInit} from '@angular/core';
import {CarersService} from '../../../../services/carers.service';
import {CarersListResponse} from '../../../../models/response/carers-list-response';
import {CarerListObject} from '../../../../models/response/carer-list-object';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-carers-list',
    templateUrl: './carers-list.component.html',
    styleUrls: ['./carers-list.component.scss']
})
export class CarersListComponent implements OnInit {

    carers: CarerListObject[] = [];

    searchString: string;
    statusFilter = 'ALL';
    sort: string;
    page = 1;
    pages: number[] = [];
    form: FormGroup;

    constructor(private carersService: CarersService) {
    }

    ngOnInit() {
        this.createForm();
        this.getCarersList();
        this.onSearch();
    }

    onPageChange(page: number): void {
        this.page = page;
        this.getCarersList();
    }

    onSearch(): void {
        // this.searchString = this.form.get('search').value;
        // this.getCarersList();
        this.form.get('search').valueChanges
            .debounceTime(400)
            .subscribe(data => {
                this.searchString = data;
                this.getCarersList();
            });
    }

    onFilter(): void {
        this.statusFilter = this.form.get('status_filter').value;
        this.getCarersList();
    }

    private getCarersList(): void {
        this.carersService.getCarersList(this.searchString, this.sort, this.statusFilter, this.page)
            .subscribe(
                (response: CarersListResponse) => {
                    this.handleCarersListResponse(response);
                },
                error => console.log('Get carers list response', error)
            );
    }

    private handleCarersListResponse(response: CarersListResponse): void {
        console.log('Get carers list response', response);
        this.pages = this.setPaginationArray(response.pages);
        this.carers = response.results;
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

    private createForm(): void {
        this.form = new FormGroup({
            'search': new FormControl(''),
            'status_filter': new FormControl('ALL')
        });
    }

}
