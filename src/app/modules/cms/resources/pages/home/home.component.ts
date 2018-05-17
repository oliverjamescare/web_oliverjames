import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
    data: any;

    constructor(private adminService: AdminService) {}

    ngOnInit()
    {
        this.adminService.home().subscribe(results => this.data = results);
    }
}
