import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericModelDto } from '../models/patient.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {

    private URL: string = "https://localhost:7047/Api";

    constructor(private http: HttpClient) { }

    getGender(): Observable<GenericModelDto[]> {
        return this.http.get<GenericModelDto[]>(`${this.URL}/Generic/GetGender`);
    }

    getDocumentType(): Observable<GenericModelDto[]> {
        return this.http.get<GenericModelDto[]>(`${this.URL}/Generic/GetDocumentType`);
    }
}
