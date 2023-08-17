import { Component, Input  } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../services/token.service";


@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent {
  @Input() data: any[] = []; // Rename the property to "data"


  constructor(private tokenService: TokenService, private http: HttpClient)
  {

  }

  approveUser(user: any) {
    // Implement the logic to handle user approval here
    console.log('Approved user:', user);


    const token = this.tokenService.getToken();
    // Prepare the authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Prepare the body for the PATCH request
    const body = { 
      id : user.id,
      status: true }; // Replace with your desired boolean value or variable

      console.log(body.status);

    // Make the PATCH request
    this.http.patch(`https://mygpsadminbe.mygps.ge:4436/api/Manager/UpdateByStatus?id=${user.id}`+'&status=true', body, { headers })
      .subscribe({
        next: (response: any) => {
          console.log('User approval successful:', response);

          // Remove the approved user from the data array
          this.data = this.data.filter(u => u.id !== user.id);

        },
        error: (error) => {
          console.log('Error approving user:', error);
          // Handle the error or display an error message
        }
      });

  }


  declineUser(user: any) {
    /// Implement the logic to handle user approval here
    console.log('Declined user:', user);


    // Prepare the authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.tokenService.getToken()}`);

    // Prepare the body for the PATCH request
    const body = { 
      id : user.id,
      status: false }; // Replace with your desired boolean value or variable

    // Make the PATCH request
    this.http.patch(`https://mygpsadminbe.mygps.ge:4436/api/Manager/UpdateByStatus?id=${user.id}`+'&status=false', body, { headers })
    
      .subscribe({
        
        next: (response: any) => {
          console.log('User declining successful:', response);
          // Handle the response or perform any other necessary actions
          
          // Remove the declined user from the data array
          this.data = this.data.filter(u => u.id !== user.id);


        },
        error: (error) => {
          console.log('Error declining user:', error);
          // Handle the error or display an error message
        }
      });
  }



}
