import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { HistoryComponent} from './history/history.component';
import {TabsModule} from "ngx-bootstrap/tabs";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CommonModule, DatePipe} from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FilterPipe } from './filter.pipe';
import { ModalComponent } from './modal/modal.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {TokenService} from "./services/token.service";
import {defineLocale, enGbLocale} from "ngx-bootstrap/chronos";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { CarRegModalComponent } from './car-reg-modal/car-reg-modal.component';
import { CarDeleteModalComponent } from './car-delete-modal/car-delete-modal.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { CompanyDeleteModalComponent } from './company-delete-modal/company-delete-modal.component';


export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust this to retrieve the token from the desired source
}

defineLocale('enGb', enGbLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginFormComponent,
    HomeComponent,
    HistoryComponent,
    RegistrationFormComponent,
    FilterPipe,
    ModalComponent,
    NotificationModalComponent,
    CarRegModalComponent,
    CarDeleteModalComponent,
    CompanyRegistrationComponent,
    CompanyDeleteModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TabsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['example.com'], // Adjust this to match your domain
        disallowedRoutes: ['example.com/auth/'], // Adjust this to match your authentication routes
      },
    }),

  ],
  providers: [JwtHelperService, TokenService,DatePipe],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule, ]
})
export class AppModule { }
