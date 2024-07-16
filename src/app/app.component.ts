import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientServiceService } from './services/patient-service.service';
import { GenericModelDto, PatientCreateDto, PatientListDto, PatientUpdateDto } from './models/patient.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericServiceService } from './services/generic-service.service';
import { CommonModule, formatDate } from '@angular/common';

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

    isEdit: boolean = false;

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
            id: [''],
            documentTypeId: ['', Validators.required],
            documentNumber: ['', [Validators.required, Validators.maxLength(12)]],
            firstName: ['', [Validators.required, Validators.maxLength(50)]],
            lastName: ['', [Validators.required, Validators.maxLength(50)]],
            birhtDate: [formatDate(new Date(),'yyyy-MM-dd','en'), Validators.required],
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

    addOrUpdatePatient(): void {
        if(this.isEdit){
            this.editPatient();
        }else{
            this.addPatient();
        }
    }

    cancelPatient(): void {
        this.patientForm.reset();
    }

    addPatient(): void {

        if(!this.patientForm.valid) {
            alert("Form not valid");
            return;
        }

        var data: PatientCreateDto = {...this.patientForm.value}; 
        console.log(data);          
        this.patientService.Add(data).subscribe(data => {
            this.getPatients();
            this.patientForm.reset();
        });        
    }

    setDataFormPatient(patient: PatientListDto): void {
        console.log(patient);        
        this.isEdit = true;
        this.patientForm.patchValue(
            {
                ...patient, 
                birhtDate: formatDate(patient.birhtDate,'yyyy-MM-dd','en')
            });                
    }

    editPatient(): void {
        if(!this.patientForm.valid) {
            alert("Form not valid");
            return;
        }
        var data: PatientUpdateDto = {...this.patientForm.value}; 
        this.patientService.Add(data).subscribe(data => {
            this.getPatients();
            this.patientForm.reset();
        });  
    }

    deletePatient(id: number): void {
        this.patientService.delete(id).subscribe(() => {
            this.patients = this.patients.filter(p => p.id !== id);
        });
    }
}
