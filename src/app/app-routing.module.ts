import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {HistoryComponent} from "./history/history.component";
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';


const routes: Routes = [
  {path: 'home', component: HistoryComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'history', component: HistoryComponent},
  {path: '', component: LoginFormComponent},
  {path: '', component: LoginFormComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'company-registration', component: CompanyRegistrationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
