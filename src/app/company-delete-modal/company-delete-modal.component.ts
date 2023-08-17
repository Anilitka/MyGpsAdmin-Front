import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuelService } from '../services/fuel.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-company-delete-modal',
  templateUrl: './company-delete-modal.component.html',
  styleUrls: ['./company-delete-modal.component.css']
})
export class CompanyDeleteModalComponent {

  @Input() allCompanies: any[] = [];
  chosenId: string;

  constructor(
    private fuelService: FuelService,
    private http: HttpClient,
    private tokenService: TokenService,
    ){

    }

    ngOnInit(): void {
      this.fillAllCompanies();
    }

    returnCompanyId(Id: string){
      this.chosenId = Id;
      console.log('Chosen Company ID:', this.chosenId)
      }

    fillAllCompanies(){
      this.fuelService.getCompanies().subscribe({
        next: (data: any[]) => {
          this.allCompanies = data;
          console.log('all data company ', this.allCompanies)
    
        },
        error: (error) => {
          console.error('Error loading company data by id:', error)
        }
      })
    }

    deleteCompanyById(id: string){
      const token = this.tokenService.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      id = this.chosenId
      console.log(id)
      this.http.delete(`https://mygpsadminbe.mygps.ge:4436/api/Company/DeleteCompanyById?id=${id}`, { headers }).subscribe({
    next: (response) => {
      
      console.log('all data company', response);

  },
    error: (error) => {
      console.error('Error loading company data by id:', error)
    }
  })


    }

    deleteByCompanyVisualId(){
      if (!this.chosenId) {
        console.error('No company ID selected for deletion');
        return;
      }
    
      console.log('Deleting company with ID:', this.chosenId);
    
      const indexOfCompany = this.allCompanies.findIndex((company) => company.companyId === parseInt(this.chosenId));
      if (indexOfCompany !== -1) {
        this.allCompanies.splice(indexOfCompany, 1);
      }
    
      this.chosenId = null;
    }
}
