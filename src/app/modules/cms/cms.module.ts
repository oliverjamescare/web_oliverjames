//core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//guards
import { AuthGuardService } from './guards/auth-guard.service';

//services
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

//components
import { CmsComponent } from './cms.component';
import { LoginComponent } from './resources/pages/login/login.component';
import { DashboardComponent } from './resources/pages/dashboard/dashboard.component';
import { HomeComponent } from './resources/pages/home/home.component';
import { CarersComponent } from './resources/pages/carers/carers.component';

@NgModule({
    imports: [
        CommonModule,
        CmsRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        CmsComponent,
        LoginComponent,
        DashboardComponent,
        HomeComponent,
        CarersComponent
    ],
    providers: [
        ApiService,
        AuthService,
        UserService,
        AuthGuardService
    ]

})
export class CmsModule {}
