import { Component, OnInit } from '@angular/core';
import {CarerListObject} from '../../../../models/response/carer-list-object';
import {CarersService} from '../../../../services/carers.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CarersListResponse} from '../../../../models/response/carers-list-response';

@Component({
  selector: 'app-list-of-admins',
  templateUrl: './list-of-admins.component.html',
  styleUrls: ['./list-of-admins.component.scss']
})
export class ListOfAdminsComponent implements OnInit {

    carers: CarerListObject[] = [];

    sort: string;
    page: number = 1;
    pages: number = 0;
    form: FormGroup;
    showDeleteAccountDialog: false;
    adminId;



    constructor(private carersService: CarersService) {}

    ngOnInit()
    {
        //form handle
        this.createForm();
        this.form.get('search').valueChanges.debounceTime(400).subscribe(() => {
            this.page = 1;
            this.getCarersList();
        });
        this.form.get('status_filter').valueChanges.subscribe(() => {
            this.page = 1;
            this.getCarersList();
        });
        this.getCarersList();
    }

    onPageChange(page: number)
    {
        this.page = page;
        this.getCarersList();
    }

    onChangeSort(sort: string)
    {
        this.sort = sort;
        this.getCarersList();
    }

    private getCarersList(): void
    {
        this.carersService.getCarersList(this.form.get("search").value, this.sort, this.form.get("status_filter").value, this.page)
            .subscribe((response: CarersListResponse) => {
                    this.carers = response.results;
                    this.pages = response.pages;
                },
            );
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            'search': new FormControl(''),
            'status_filter': new FormControl('ALL')
        });
    }

}