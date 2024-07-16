export interface PatientListDto {
    id:                      number;
    documentTypeId:          number;
    documentTypeDescription: string;
    genderId:                number;
    genderDescription:       string;
    documentNumber:               string;
    firstName:               string;
    lastName:                string;
    birhtDate:               Date;
    address:                 string;
    contactNumber:           string;
    active:                  boolean;
}

export interface PatientCreateDto {
    documentTypeId: number;
    genderId:       number;
    firstName:      string;
    lastName:       string;
    birhtDate:      Date;
    address:        string;
    contactNumber:  string;
}

export interface PatientUpdateDto extends PatientListDto {
    id:             number;
}


export interface GenericModelDto{
    id: string;
    description: string;
}