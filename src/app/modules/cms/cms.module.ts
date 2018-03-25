//core
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsRoutingModule} from './cms-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//guards
import {AuthGuardService} from './guards/auth-guard.service';

//services
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {CarersService} from './services/carers.service';

// components
import {CmsComponent} from './cms.component';
import {LoginComponent} from './resources/pages/login/login.component';
import {DashboardComponent} from './resources/pages/dashboard/dashboard.component';
import {HomeComponent} from './resources/pages/home/home.component';
import {CarersComponent} from './resources/pages/carers/carers.component';
import { CarersListComponent } from './resources/pages/carers/carers-list/carers-list.component';
import { CarerDetailsComponent } from './resources/pages/carers/carer-details/carer-details.component';
import {DatesService} from './services/dates.service';
import {TimestampPipe} from './pipes/timestamp.pipe';
import {SharedModule} from '../shared/shared.module';
import { CmsPopupComponent } from './resources/partials/cms-popup/cms-popup.component';
import {FileUploadingComponent} from './resources/pages/carers/carer-details/file-uploading/file-uploading.component';
import { DeleteFileComponent } from './resources/pages/carers/carer-details/file-uploading/delete-file/delete-file.component';
import { AddCarerComponent } from './resources/pages/carers/add-carer/add-carer.component';
import { JobsComponent } from './resources/pages/jobs/jobs.component';
import { JobsListComponent } from './resources/pages/jobs/jobs-list/jobs-list.component';
import {JobsService} from './services/jobs.service';
import {TimestampHourPipe} from './pipes/timestampHour.pipe';
import { JobsDetailsComponent } from './resources/pages/jobs/jobs-details/jobs-details.component';
import { CancelJobComponent } from './resources/pages/jobs/jobs-details/cancel-job/cancel-job.component';

@NgModule({
    imports: [
        CommonModule,
        CmsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        CmsComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        CarersComponent,
        CarersListComponent,
        CarerDetailsComponent,
        TimestampPipe,
        CmsPopupComponent,
        FileUploadingComponent,
        DeleteFileComponent,
        AddCarerComponent,
        JobsComponent,
        JobsListComponent,
        TimestampHourPipe,
        JobsDetailsComponent,
        CancelJobComponent
    ],
    providers: [
        ApiService,
        AuthService,
        UserService,
        AuthGuardService,
        CarersService,
        DatesService,
        JobsService
    ]

})
export class CmsModule {
}
