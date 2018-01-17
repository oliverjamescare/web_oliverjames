//core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { HomeComponent } from './resources/pages/home/home.component';
import { LandingCarerComponent } from './resources/pages/landing-carer/landing-carer.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'carer', component: LandingCarerComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
