// core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

// components
import { CmsComponent } from './cms.component';
import { LoginComponent } from './resources/pages/login/login.component';
import { DashboardComponent } from './resources/pages/dashboard/dashboard.component';
import { HomeComponent } from './resources/pages/home/home.component';
import {CarersComponent} from './resources/pages/carers/carers.component';

const routes: Routes = [
    {
        path: '', component: CmsComponent,
        children: [
            { path: 'login', component: LoginComponent },
            {
                path: '',
                component: DashboardComponent,
                canActivate: [ AuthGuardService ],
                children: [
                    { path: '', component: HomeComponent },
                    { path: 'carers', component: CarersComponent }
                ]
            },
        ]
    },

];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class CmsRoutingModule {}
