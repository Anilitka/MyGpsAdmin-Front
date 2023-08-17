import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {FuelService} from "../services/fuel.service";
import { Role } from '../role';




@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
regForm: FormGroup;
submitted = false;


rolesList: Role[] = [];

@Output() roleClicked: EventEmitter<any> = new EventEmitter<any>();

constructor(
  private router: Router,
  private rb: FormBuilder,
  private http: HttpClient,
  private fuelService: FuelService,

)
{
this.regForm = this.rb.group({
  email:[null, Validators.required],
  passwrd:[null, Validators.required],
  confPassword:[null, Validators.required],
  role:['', Validators.required]
})

this.fillRole()
}

fillRole(){
  this.fuelService.getRole().subscribe({
    next: (data: any) =>{
      this.rolesList = data;
      console.log('role :', this.rolesList)
      this.regForm.patchValue({ role: '' });

    },
      error: (error) => {
        console.error('Error loading role:', error)
      }


  })
}
register(){
  this.submitted = true;
  console.log('Register method called');

  if (this.regForm.invalid) {
    return;
  } else if (this.regForm.valid) {
    const selectedRole = this.rolesList.find((role) => role.role === this.regForm.value.role);
    if (selectedRole) {
      const regData = {
        userName: this.regForm.value.email,
        password: this.regForm.value.passwrd,
        passwordConfirm: this.regForm.value.confPassword,
        id: selectedRole.id, 
      };

      this.http.post<any>('https://mygpsadminbe.mygps.ge:4436/api/Authorization/UserRegistration', regData).subscribe({
        next: (response) => {
          console.log('I am logging reg response: ', response);
          this.regForm.reset(); 

          sessionStorage.setItem('userRole', selectedRole.role);
          sessionStorage.setItem('userName', regData.userName);
        },
        error: (error) => {
          console.log('Error logging in:', error);
        }
      });
    }

    this.router.navigate(['login']);
    Swal.fire({ title: 'Your registration information is sent successfully', confirmButtonColor: 'rgb(38, 122, 38)' });
  }

}


changeRole(e) {
  console.log('value',e.target.value);
  if(e.target.value == 'User'){
    this.regForm.value.role = 'User'

  }else if(e.target.value == 'Technical department manager'){
    this.regForm.value.role = 'TechnicalDepartmentManager'

  }
}

}
