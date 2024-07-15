import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientListDto, PatientCreateDto, PatientUpdateDto } from '../models/patient.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientServiceService {

    private URL: string = "https://localhost:7047/Api";

    constructor(private http: HttpClient) { }

    getAll(): Observable<PatientListDto[]> {
        return this.http.get<PatientListDto[]>(`${this.URL}/Patient/GetAll`);
    }

    getById(id: number): Observable<PatientListDto[]> {
        return this.http.get<PatientListDto[]>(`${this.URL}/Patient/GetById/${id}`);
    }

    Add(patientCreateDto: PatientCreateDto): Observable<boolean> {
        return this.http.post<boolean>(`${this.URL}/Patient/Add`, patientCreateDto);
    }

    Update(patientUpdateDto: PatientUpdateDto): Observable<boolean> {
        return this.http.post<boolean>(`${this.URL}/Patient/Update`, patientUpdateDto);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.URL}/Patient/Delete/${id}`);
    }
}
