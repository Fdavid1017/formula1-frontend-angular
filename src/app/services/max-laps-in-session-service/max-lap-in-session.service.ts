import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Session} from "../../enums/session";

@Injectable({
  providedIn: 'root'
})
export class MaxLapInSessionService {

  constructor(private http: HttpClient) {
  }

  getMaxLapInSession(gp: number | string, session: Session): Observable<number> {
    return this.http.get<any>(`${environment.apiUrl}/max-laps-in-session/${gp}/${session}/2022`).pipe(
      map((response: any) => {
        return response.largestLapNumber;
      }),
      catchError(this.handleError.bind(this))
    )
  }

  public handleError(
    err: HttpErrorResponse,
    caught: Observable<any>
  ): Observable<any> {
    return throwError(err);
  }
}