// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';



// @Injectable()
// export class HttpInterceptor implements HttpInterceptor {

//   constructor(private toastr: ToastrService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req)
//     .pipe(
//       catchError((error: HttpErrorResponse) => {
//       if (error.status === 500) {
//         this.toastr.error('Błąd wewnętrzny serwera' + ' ' + error.statusText + ' ' + error.status);
//       } else if (error.status === 401) {
//         this.toastr.error('Nieprawidłowe hasło, lub nazwa użytkownika' + ' ' + error.statusText + ' ' + error.status );

//       } else if (error.status === 400) {
//         this.toastr.error('Błędne dane' + ' ' + error.statusText + ' ' + error.status);
//       } else {
//         this.toastr.error(error.statusText + ' ' + error.status);
//       }
//       return throwError(error);
//       })
//     );
//   }
// }
