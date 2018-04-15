import { Component, OnInit } from '@angular/core';
import { WaitingListService } from '../../../services/waiting-list.service';
import { WaitingUser } from '../../../models/waiting-user.model';
import { DatesService } from '../../../services/dates.service';

@Component({
    selector: 'app-waiting-list',
    templateUrl: './waiting-list.component.html',
    styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit
{
    waitingList: Array<WaitingUser>
    pages: Array<number> = [];
    page: number = 0;

    constructor(private waitingListService: WaitingListService, public datesService: DatesService) {}

    ngOnInit()
    {
        this.loadWaitingList();
    }

    onRemove(event: Event, id: string)
    {
        event.preventDefault();
        this.waitingListService
            .deleteWaitingUser(id)
            .subscribe(() => {
                this.loadWaitingList();
            })
    }

    onPageChange(page: number)
    {
        this.waitingListService.page = page;
        this.loadWaitingList();
    }

    loadWaitingList()
    {
        //getting care homes
        this.waitingListService
            .getWaitingList()
            .subscribe(() => {

                this.pages = Array.from(Array(this.waitingListService.pages).keys());
                this.page = this.waitingListService.page;
                this.waitingList = this.waitingListService.getWaitingUsers()
            })
    }

}
