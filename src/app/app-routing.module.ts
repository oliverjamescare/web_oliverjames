//core
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TermsComponent} from './terms/terms.component';

const routes: Routes = [
    { path: '', loadChildren: './modules/web/web.module#WebModule' },
    { path: 'admin', loadChildren: './modules/cms/cms.module#CmsModule' },
    { path: 'terms', component: TermsComponent},
    { path: '**', redirectTo: "/"}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
