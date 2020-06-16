import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStudentService } from '../_services/authStudent.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  CurrentUser = '';
  jwtHelper = new JwtHelperService();
  token: any;
  decodedToken: any;

canActivate(next: ActivatedRouteSnapshot): boolean {
  if (this.isloggedIn()) {
    this.decodeToken();
    this.CurrentUser = this.decodedToken.UserRole;
  } else {
    this.router.navigate(['']);
  }
  if (next.data.roles.includes(this.CurrentUser)) {
    return true;
  } else {
    this.router.navigate(['']);
    return false;
  }
}

isloggedIn() {
  const token = localStorage.getItem('token');
  return!!token;
}

decodeToken() {
  this.token = localStorage.getItem('token');
  this.decodedToken = this.jwtHelper.decodeToken(this.token);
}

}
