import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacterData(url?: string): Observable<Object> {
    if(url){
      return this.http.get<Object>(url);
    }else{
      return this.http.get<Object>(`${this.baseUrl}/people`).pipe(
      catchError((error:any) => {
        console.error('An error occurred:', error);

        return throwError(error.message);
      }));
    }
  }
}
