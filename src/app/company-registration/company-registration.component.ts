import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';
import { FuelService } from '../services/fuel.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})

export class CompanyRegistrationComponent {
  compRegForm: FormGroup;
  submitted = false;

  constructor(
    private _modal: NgbModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private tokenService: TokenService,
    private fuelService: FuelService
  ) {
    this.compRegForm = this.formBuilder.group({
      companyName: ['', Validators.required]
    });
  }

  companyReg() {
    this.submitted = true;

    if (this.compRegForm.invalid) {
      return;
    }

    const companyRegData = {
      companyName: this.compRegForm.value.companyName,
    };

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('https://mygpsadminbe.mygps.ge:4436/api/Company/AddNewCompany', companyRegData, { headers }).subscribe({
      next: (response) => {
        console.log('Added company: ', response);
        this.compRegForm.reset();
      },
      error: (error) => {
        console.log('Error adding company:', error);
      }
    });

    this._modal.dismissAll();
    Swal.fire({ title: 'Company added successfully', confirmButtonColor: 'rgb(38, 122, 38)' });
  }
}
