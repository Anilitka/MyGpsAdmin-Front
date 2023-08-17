import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from "../notification-modal/notification-modal.component";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient, private modalService: NgbModal, private tokenService: TokenService) {}

openNotificationModal() {
  const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const timestamp = new Date().getTime();
    const url = `https://mygpsadminbe.mygps.ge:4436/api/Manager/GetFilteredUsers?timestamp=${timestamp}`;

    this.http.get(url, { headers, responseType: "json" }).subscribe({
      next: (data: any) => {
        const modalRef = this.modalService.open(NotificationModalComponent);
        modalRef.componentInstance.data = data;
        console.log(data);
      },
      error: (error) => {
        console.log('Error fetching JSON file:', error);
      }
    });
  }
}