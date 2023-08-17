import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../services/token.service";
import {UserService} from "../services/user.service";



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;
  token: string;
  payload: any;

  constructor(
    private router: Router,
    private lb: FormBuilder,
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  )
  {
    this.loginForm = this.lb.group({
      email:[null, Validators.required],
      passwrd:[null, Validators.required]
    })
  }


  logIn(){
    this.submitted = true;


    if (this.loginForm.invalid) {
      return;
    }
    // else if(this.loginForm.valid){
    //   this.loginForm.reset();
    //   this.router.navigate(['home'])
    // }
    else if (this.loginForm.valid) {
      const loginData = {
        userName: this.loginForm.value.email,
        password: this.loginForm.value.passwrd
      };

      console.log(loginData);

      this.http.post<any>('https://mygpsadminbe.mygps.ge:4436/api/Authorization/Login', loginData).subscribe({
        next: (response) => {
          console.log(response);

          this.token = response.token;


          localStorage.setItem('token', response.token);

          this.tokenService.setToken(this.token);

          sessionStorage.setItem('userRole', this.tokenService.getUserRole());
          sessionStorage.setItem('userName', loginData.userName);

          this.tokenService.setUserInformation(this.tokenService.getUserRole(), loginData.userName);

          this.loginForm.reset();

          this.router.navigate(['home']);

        },
        error:(error)=>
        {
          console.log('Error logging in:', error);
        }
    }
      );
      this.userService.setUsername(loginData.userName);
    }

  }
  goToregistration(){
    this.router.navigate(['registration'])
  }

}
