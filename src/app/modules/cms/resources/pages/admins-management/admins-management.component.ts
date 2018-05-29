import { Component, OnInit } from '@angular/core';
import {CareHomesService} from '../../../services/care-homes.service';

@Component({
  selector: 'app-admins-management',
  templateUrl: './admins-management.component.html',
  styleUrls: ['./admins-management.component.scss'],
    providers: [ CareHomesService ]
})
export class AdminsManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
