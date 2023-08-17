import {Component, OnInit} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TokenService} from "../services/token.service";
import {UserService} from "../services/user.service";
import { CarRegModalComponent } from '../car-reg-modal/car-reg-modal.component';
import { CarDeleteModalComponent } from '../car-delete-modal/car-delete-modal.component';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { CompanyDeleteModalComponent } from '../company-delete-modal/company-delete-modal.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  // token: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwicm9sZSI6IlRlY2huaWNhbERlcGFydG1lbnRNYW5hZ2VyIiwibmJmIjoxNjg5MjM0MDAwLCJleHAiOjE2ODkzMjA0MDAsImlhdCI6MTY4OTIzNDAwMH0.ytYhKPitP9RCuov4gVvpsZSsgfe1FYcqbBLI5bQyqPo8QPx652Zirdmn-nYOxy_aOvBx43unufDMc4hJ_X6_iw';
  // payload: any;

  isAdmin: boolean;
  userName: string;

  ngOnInit(): void {
      this.checkAdmin();

    this.userService.getUsername().subscribe(username => {
      this.userName = username;
      console.log('Username:', this.userName);
    });
    this.userName = this.tokenService.getUserName();
    console.log('Username:', this.userName);

  }

  constructor(
    private _modal: NgbModal,
    private notificationService: NotificationService,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.getUserRole();
  }

  reloadCurrentPage() {
    window.location.reload();
  }
  
  checkAdmin(){
    if(this.tokenService.getUserRole().includes("Manager")){
      this.isAdmin=true;
    }
  }
  getUserRole(){
    console.log('I return roles',this.tokenService.getUserRole());
    return this.tokenService.getUserRole();
  }

  open() {
    this._modal.open(ModalComponent);
  }
  openModal(){
    this._modal.open(CarRegModalComponent)
  }
  openDeleteModal(){
    this._modal.open(CarDeleteModalComponent)
  }
  openCompanyRegistration(){
    this._modal.open(CompanyRegistrationComponent)
  }
  openCompanyDelete(){
    this._modal.open(CompanyDeleteModalComponent)
  }

  openNotification() {
    this.notificationService.openNotificationModal();
  }

}
