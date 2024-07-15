import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientServiceService } from './services/patient-service.service';
import { GenericModelDto, PatientListDto } from './models/patient.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericServiceService } from './services/generic-service.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    patients: PatientListDto[] = [];
    genderList: GenericModelDto[] = [];
    documentTypeList: GenericModelDto[] = [];

    patientForm: FormGroup;

    constructor(
        private patientService: PatientServiceService, 
        private genericService: GenericServiceService, 
        private fb: FormBuilder) {

    }

    ngOnInit(): void {
        this.loadInitData();
        this.initForm();
    }

    initForm(): void {
        this.patientForm = this.fb.group({
            documentTypeId: ['', Validators.required],
            documentNumber: ['', [Validators.required, Validators.maxLength(12)]],
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            birhtDate: ['', Validators.required],
            genderId: ['', Validators.required],
            address: ['', [Validators.required, Validators.maxLength(200)]],
            contactNumber: ['', [Validators.required, Validators.maxLength(15)]]
        });
    }



    loadInitData(): void {
        this.getPatients();

        this.genericService.getGender().subscribe(data => {
            this.genderList = data;
        });

        this.genericService.getDocumentType().subscribe(data => {
            this.documentTypeList = data;
        });
    }

    getPatients(): void {
        this.patientService.getAll().subscribe(data => {
            this.patients = data;
        });
    }


    addPatient(): void {
        var data = this.patientForm.value;
        console.log(data);        
        this.patientService.Add(data).subscribe(data => {
            this.getPatients();
        });
    }

    editPatient(patient: PatientListDto): void {

    }

    deletePatient(id: number): void {
        this.patientService.delete(id).subscribe(() => {
            this.patients = this.patients.filter(p => p.id !== id);
        });
    }
}
