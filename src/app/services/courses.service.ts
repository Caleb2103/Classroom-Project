import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  basePath = environment.apiUrl + 'classroom'
  //basePath = 'http://127.0.0.1:8000/main/classroom'; // URL del backend

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

  // Método para obtener los cursos
  // getCourses(): Observable<any> {
  //   return this.http
  //     .get<any[]>(`${this.basePath}/list-courses/`)
  //     .pipe(catchError(this.handleError));
  // }

  // getCourses(): Observable<Blob> {
  //   return this.http.get(`${this.basePath}/list-courses/`, {
  //     responseType: 'blob' // Asegura que Angular interprete la respuesta como un archivo
  //   });
  // }

  getCourses(pageToken?: string, pageSize: number = 20): Observable<any> {
    let url = `${this.basePath}/list-courses/?page_size=${pageSize}`;
  
    if (pageToken) {
      url += `&page_token=${pageToken}`;
    }
  
    return this.http.get(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
  
  getStudents(classId: string): Observable<any> {
    return this.http
      .get<any>(`${this.basePath}/student-class/${classId}/`)
      .pipe(retry(2), catchError(this.handleError));
  }

  importCourses(file: File): Observable<any> {
    const url = `${this.basePath}/create-courses/`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }

  enrollStudents(file: File): Observable<any> {
    const url = `${this.basePath}/enroll-students/`;
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(url, formData).pipe(catchError(this.handleError));
  }
}
