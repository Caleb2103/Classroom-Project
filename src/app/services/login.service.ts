import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  basePath = environment.apiUrl + 'login'
  //basePath = 'http://127.0.0.1:8000/main/login'; // URL del backend

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something happened with request, please try again later')
    );
  }

  importCredentials(file: File): Observable<any> {
    const url = `${this.basePath}/upload-credentials/`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  loginAccount(): Observable<any> {
    const url = `${this.basePath}/sign-in/`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
}
