import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CareHomesService } from '../../../../services/care-homes.service';
import { User } from '../../../../models/user.model';
import { DatesService } from '../../../../services/dates.service';

@Component({
    selector: 'app-care-homes-list',
    templateUrl: './care-homes-list.component.html',
    styleUrls: ['./care-homes-list.component.scss']
})
export class CareHomesListComponent implements OnInit {

    form: FormGroup;
    sort: string;
    careHomes: Array<User>
    pages: Array<number> = [];
    page: number = 0;

    constructor(private careHomesService: CareHomesService, public datesService: DatesService) {}

    ngOnInit()
    {
        //creating form
        this.form = new FormGroup({
            search: new FormControl(""),
            status_filter: new FormControl("ALL")
        })

        this.form
            .valueChanges
            .debounceTime(400)
            .subscribe(() => this.loadCareHomes());

        this.loadCareHomes();
    }

    onPageChange(page: number)
    {
        this.careHomesService.page = page;
        this.loadCareHomes();
    }

    onChangeSort(sort: string)
    {
        this.sort = sort;
        this.loadCareHomes();
    }

    loadCareHomes()
    {
        //getting care homes
        this.careHomesService
            .getCareHomesList(this.form.get('search').value, this.form.get('status_filter').value, this.sort)
            .subscribe(() => {

                this.pages = Array.from(Array(this.careHomesService.pages).keys());
                this.page = this.careHomesService.page;
                this.careHomes = this.careHomesService.getCareHomes()
            })
    }

}
