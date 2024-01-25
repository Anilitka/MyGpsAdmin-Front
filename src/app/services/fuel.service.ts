import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "./token.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
) { }

 private getHeaders(): HttpHeaders {
  const token = this.tokenService.getToken();;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}



getCarListData(pageindex: number, pagesize: number) {
    const headers = this.getHeaders();
    return this.http.get(`https://` , { headers });
}

getCarDataById(Id: string, page: number, startDate?: string, endDate?: string) {
  const headers = this.getHeaders();
  let url = `https://`;

  if (startDate && endDate) {
    url += `&startDate=${startDate}&endDate=${endDate}`;
  }

  return this.http.get(url, { headers });
}


// getAllLitersById(Id: string){
//   const headers = this.getHeaders();
//   return this.http.get(`https://mygpsadminbe.mygps.ge:4436/api/Wialon/GetFuelLiterById?CardId=${Id}`, {headers})
// }

getRole(){
    const headers = this.getHeaders();
    return this.http.get('https://', {headers})
}


getCount(): Observable<number>{
  const headers = this.getHeaders();
  return this.http.get<number>('https://', {headers})
}
// vkitxo
getCountById(Id:string){
  const headers = this.getHeaders();
  return this.http.get<number>(`https://`, {headers})
}

getAllCars(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get('https://', {headers})
}

 getCompanies(){
  const headers = this.getHeaders();
  return this.http.get('https://', { headers });
}
}
