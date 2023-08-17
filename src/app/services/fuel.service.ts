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
    return this.http.get(`https://mygpsadminbe.mygps.ge:4436/api/Wialon/GetAllFuelHistory?Pageindex=${pageindex}&Pagesize=${pagesize}` , { headers });
}

getCarDataById(Id: string, page: number, startDate?: string, endDate?: string) {
  const headers = this.getHeaders();
  let url = `https://mygpsadminbe.mygps.ge:4436/api/WialonFuelHistory/GetWialonById?cardID=${Id}&page=${page}`;

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
    return this.http.get('https://mygpsadminbe.mygps.ge:4436/api/Role/GetAllRoles', {headers})
}


getCount(): Observable<number>{
  const headers = this.getHeaders();
  return this.http.get<number>('https://mygpsadminbe.mygps.ge:4436/api/Wialon/GetAllCount', {headers})
}
// vkitxo
getCountById(Id:string){
  const headers = this.getHeaders();
  return this.http.get<number>(`https://mygpsadminbe.mygps.ge:4436/api/Wialon/GetAllCount?CardId=${Id}`, {headers})
}

getAllCars(): Observable<any>{
  const headers = this.getHeaders();
  return this.http.get('https://mygpsadminbe.mygps.ge:4436/api/CompanyCar/GetAllCars', {headers})
}

 getCompanies(){
  const headers = this.getHeaders();
  return this.http.get('https://mygpsadminbe.mygps.ge:4436/api/CompanyManagmet/GetAllCompanies', { headers });
}
}
