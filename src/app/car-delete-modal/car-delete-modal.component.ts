import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuelService } from '../services/fuel.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-car-delete-modal',
  templateUrl: './car-delete-modal.component.html',
  styleUrls: ['./car-delete-modal.component.css'],
})
export class CarDeleteModalComponent {

  @Input() allCars: any[] = [];
  chosenId: string;
 
 
  
constructor(
  private fuelService: FuelService,
  private http: HttpClient,
  private tokenService: TokenService,
  )
{

}

ngOnInit(): void {
this.fillAllCars()

}
returnCarId(Id: string){
this.chosenId = Id;
console.log('Chosen car ID:', this.chosenId)
}

fillAllCars(){
  this.fuelService.getAllCars().subscribe({
    next: (data: any[]) => {
      this.allCars = data;
      console.log('all data car reg', this.allCars)

    },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}

deleteCarById(id: string){

  const token = this.tokenService.getToken();
  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  id = this.chosenId
  console.log(id)
  this.http.delete(`https://mygpsadminbe.mygps.ge:4436/api/UserCar/DeleteCarById?id=${id}`, { headers }).subscribe({
    next: (response) => {
      
      console.log('all data car reg', response);

  },
    error: (error) => {
      console.error('Error loading cars data by id:', error)
    }
  })
}

deleteById(){
  if (!this.chosenId) {
    console.error('No car ID selected for deletion');
    return;
  }

  console.log('Deleting car with ID:', this.chosenId);

  const carIndex = this.allCars.findIndex((car) => car.id === parseInt(this.chosenId));
  if (carIndex !== -1) {
    this.allCars.splice(carIndex, 1);
  }

  this.chosenId = null;
}



}
