import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(private http: HttpClient) { }

  getCarListData(startDate: Date, endDate: Date, pageindex: number, pageSize: number) {
    return this.http.get(`https://`);
  }


}
