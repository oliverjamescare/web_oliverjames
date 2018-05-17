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
