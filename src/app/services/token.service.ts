import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string;
  private payload: any;
  private userRole: string;
  private userName: string;

  constructor(private jwtHelper: JwtHelperService) {
    this.token = localStorage.getItem('token');
    this.extractPayloadFromToken();
  }

  setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', token);
    this.extractPayloadFromToken();
  }

  private extractPayloadFromToken() {
    const token = sessionStorage.getItem('token');
    this.payload = this.jwtHelper.decodeToken(this.token);
  }
  setUserInformation(userRole: string, userName: string) {
    this.userRole = userRole;
    this.userName = userName;
  }

  getUserRole(): string {

      return this.payload.role;

  }
  getUserName(): string {
    return sessionStorage.getItem('userName') || '';
  }
  getToken(): string {
    return this.token;
  }
}