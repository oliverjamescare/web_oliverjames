//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { MenuComponent } from './resources/partials/menu/menu.component';
import { LandingStaticTopComponent } from './resources/partials/landing-static-top/landing-static-top.component';
import { HomeComponent } from './resources/pages/home/home.component';
import { LandingCarerComponent } from './resources/pages/landing-carer/landing-carer.component';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        LandingStaticTopComponent,
        HomeComponent,
        LandingCarerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
