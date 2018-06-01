import {Component, OnInit} from '@angular/core';
import {CarerListObject} from '../../../../models/response/carer-list-object';
import {FormControl, FormGroup} from '@angular/forms';
import {CarersListResponse} from '../../../../models/response/carers-list-response';
import {AdminsManagementService} from '../../../../services/admins-management.service';

@Component({
    selector: 'app-list-of-admins',
    templateUrl: './list-of-admins.component.html',
    styleUrls: ['./list-of-admins.component.scss']
})
export class ListOfAdminsComponent implements OnInit {

    admins: CarerListObject[] = [];
    page: number = 1;
    pages: number = 0;
    showDeleteAccountDialog = false;
    adminId;
    listAdminId: string;

    constructor(private adminsManagementService: AdminsManagementService) {
    }

    ngOnInit() {
        this.getAdminsList();
    }

    onPageChange(page: number) {
        this.page = page;
        this.getAdminsList();
    }

    private getAdminsList(): void {
        this.adminsManagementService.getAdminsList(this.page)
            .subscribe((response) => {
                    this.admins = response.results;
                    this.pages = response.pages;
                },
            );
    }

    private deleteAccountFromList(listAdminId) {
        this.listAdminId = listAdminId;
        this.showDeleteAccountDialog = true;
    }

    onReload(): void {
        this.page = 1;
        this.getAdminsList();
    }


}