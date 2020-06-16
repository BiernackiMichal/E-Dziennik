import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Navigation {
  constructor(private router: Router) {}

  navigateTo(path: string) {
this.router.navigate([path]);
  }

navigateToWithTimeOut(path: string) {
  setTimeout(() => { this.router.navigate([path]) ; }, 1500);
}

}
