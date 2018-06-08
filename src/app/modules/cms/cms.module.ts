//core
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CmsRoutingModule} from './cms-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputTrimModule } from 'ng2-trim-directive';

//guards
import {AuthGuardService} from './guards/auth-guard.service';

//services
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {AdminService} from './services/admin.service';
import {CarersService} from './services/carers.service';
import { CareHomesService } from './services/care-homes.service';
import { WaitingListService } from './services/waiting-list.service';
import { ParameterizationService } from './services/parameterization.service';

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
import { ResolveChallengeComponent } from './resources/pages/jobs/jobs-details/resolve-challenge/resolve-challenge.component';
import { CareHomesComponent } from './resources/pages/care-homes/care-homes.component';
import { CareHomesListComponent } from './resources/pages/care-homes/care-homes-list/care-homes-list.component';
import { CareHomeDetailsComponent } from './resources/pages/care-homes/care-home-details/care-home-details.component';
import { WaitingListComponent } from './resources/pages/waiting-list/waiting-list.component';
import { AddCareHomeComponent } from './resources/pages/care-homes/add-care-home/add-care-home.component';

import { SeeProfilePictrueComponent } from './resources/pages/carers/carer-details/see-profile-pictrue/see-profile-pictrue.component';
import { AddJobComponent } from './resources/pages/jobs/add-job/add-job.component';
import { SeeReviewComponent } from './resources/pages/jobs/jobs-details/see-review/see-review.component';
import { StatusPipe } from './pipes/status.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DatePatternPipe } from './pipes/date-pattern.pipe';

import { CalendarModule } from 'primeng/calendar';
import { AddressLookupComponent } from './resources/partials/address-lookup/address-lookup.component';
import { PaginationComponent } from './resources/partials/pagination/pagination.component';
import { RetryPaymentComponent } from './resources/pages/jobs/jobs-details/retry-payment/retry-payment.component';
import { AbsolutePipe } from './pipes/absolute.pipe';
import { AdminsManagementComponent } from './resources/pages/admins-management/admins-management.component';
import { ListOfAdminsComponent } from './resources/pages/admins-management/list-of-admins/list-of-admins.component';
import { CreateAdminAccountComponent } from './resources/pages/admins-management/create-admin-account/create-admin-account.component';
import { EditAdminAccountComponent } from './resources/pages/admins-management/edit-admin-account/edit-admin-account.component';
import { ChangeMyAdminPasswordComponent } from './resources/pages/admins-management/change-my-admin-password/change-my-admin-password.component';
import { ChangeAdminPasswordComponent } from './resources/pages/admins-management/change-admin-password/change-admin-password.component';
import {DeleteAccountComponent} from './resources/pages/admins-management/list-of-admins/delete-account/delete-account.component';
import {AdminsManagementService} from './services/admins-management.service';
import { EditMyAdminAccountComponent } from './resources/pages/admins-management/edit-my-admin-account/edit-my-admin-account.component';
import { ParameterizationComponent } from './resources/pages/parameterization/parameterization.component';
import { ExportsComponent } from './resources/pages/exports/exports.component';
import {AddNewDayComponent} from './resources/pages/parameterization/add-new-day/add-new-day.component';
import {DeleteDayComponent} from './resources/pages/parameterization/delete-day/delete-day.component';
import {DeleteWaitingComponent} from './resources/pages/waiting-list/delete-waiting/delete-waiting.component';


@NgModule({
    imports: [
        CommonModule,
        CmsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        InputTrimModule
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
        CancelJobComponent,
        ResolveChallengeComponent,
        CareHomesComponent,
        CareHomesListComponent,
        CareHomeDetailsComponent,
        SeeProfilePictrueComponent,
        WaitingListComponent,
        AddCareHomeComponent,
        AddJobComponent,
        SeeReviewComponent,
        StatusPipe,
        CapitalizePipe,
        DatePatternPipe,
        AddressLookupComponent,
        PaginationComponent,
        RetryPaymentComponent,
        AbsolutePipe,
        AdminsManagementComponent,
        ListOfAdminsComponent,
        CreateAdminAccountComponent,
        EditAdminAccountComponent,
        ChangeMyAdminPasswordComponent,
        ChangeAdminPasswordComponent,
        DeleteAccountComponent,
        AddNewDayComponent,
        DeleteDayComponent,
        EditMyAdminAccountComponent,
        ParameterizationComponent,
        ExportsComponent,
        DeleteWaitingComponent
    ],
    providers: [
        ApiService,
        AuthService,
        AdminService,
        AuthGuardService,
        CarersService,
        DatesService,
        JobsService,
        WaitingListService,
        AdminsManagementService,
        ParameterizationService
    ]

})
export class CmsModule {
}
