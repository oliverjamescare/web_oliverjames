// core
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './guards/auth-guard.service';

// components
import {CmsComponent} from './cms.component';
import {LoginComponent} from './resources/pages/login/login.component';
import {DashboardComponent} from './resources/pages/dashboard/dashboard.component';
import {HomeComponent} from './resources/pages/home/home.component';
import {CarersComponent} from './resources/pages/carers/carers.component';
import {CarersListComponent} from './resources/pages/carers/carers-list/carers-list.component';
import {CarerDetailsComponent} from './resources/pages/carers/carer-details/carer-details.component';
import {AddCarerComponent} from './resources/pages/carers/add-carer/add-carer.component';
import {JobsComponent} from './resources/pages/jobs/jobs.component';
import {JobsListComponent} from './resources/pages/jobs/jobs-list/jobs-list.component';
import {JobsDetailsComponent} from './resources/pages/jobs/jobs-details/jobs-details.component';
import { CareHomesComponent } from './resources/pages/care-homes/care-homes.component';
import { CareHomesListComponent } from './resources/pages/care-homes/care-homes-list/care-homes-list.component';
import { CareHomeDetailsComponent } from './resources/pages/care-homes/care-home-details/care-home-details.component';
import { WaitingListComponent } from './resources/pages/waiting-list/waiting-list.component';
import { AddCareHomeComponent } from './resources/pages/care-homes/add-care-home/add-care-home.component';
import {AddJobComponent} from './resources/pages/jobs/add-job/add-job.component';
import {AdminsManagementComponent} from './resources/pages/admins-management/admins-management.component';
import {ListOfAdminsComponent} from './resources/pages/admins-management/list-of-admins/list-of-admins.component';
import {ChangeMyAdminPasswordComponent} from './resources/pages/admins-management/change-my-admin-password/change-my-admin-password.component';
import {ChangeAdminPasswordComponent} from './resources/pages/admins-management/change-admin-password/change-admin-password.component';

import {EditAdminAccountComponent} from './resources/pages/admins-management/edit-admin-account/edit-admin-account.component';
import {CreateAdminAccountComponent} from './resources/pages/admins-management/create-admin-account/create-admin-account.component';
import {EditMyAdminAccountComponent} from './resources/pages/admins-management/edit-my-admin-account/edit-my-admin-account.component';

const routes: Routes = [
    {
        path: '', component: CmsComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuardService],
                children: [
                    { path: '', component: HomeComponent },
                    { path: 'waiting-list', component: WaitingListComponent },
                    {
                        path: 'carers', component: CarersComponent, children: [
                            {path: '', component: CarersListComponent},
                            {path: 'add', component: AddCarerComponent},
                            {path: ':id', component: CarerDetailsComponent},
                        ]
                    },
                    {
                        path: 'jobs', component: JobsComponent, children: [
                            {path: '', component: JobsListComponent},
                            {path: ':id', component: JobsDetailsComponent},
                        ]
                    },
                    {
                        path: 'care-homes', component: CareHomesComponent, children: [
                            { path: '', component: CareHomesListComponent },
                            { path: 'add', component: AddCareHomeComponent },
                            { path: ':id/book-jobs', component: AddJobComponent},
                            { path: ':id', component: CareHomeDetailsComponent },
                        ]
                    },
                    {
                        path: 'admins-management', component: AdminsManagementComponent, children: [
                            { path: '', component: ListOfAdminsComponent },
                            { path: 'change-my-admin-password', component: ChangeMyAdminPasswordComponent },
                            { path: 'change-admin-password/:id', component: ChangeAdminPasswordComponent },
                            { path: 'create-admin-account', component: CreateAdminAccountComponent},
                            { path: 'edit-admin-account/:id', component: EditAdminAccountComponent},
                            { path: 'edit-my-admin-account', component: EditMyAdminAccountComponent},
                        ]
                    },
                ]
            },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CmsRoutingModule {
}
