import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData:Employee;
 // formData: { id: any; empID: string; empName: string; empDept: string; empDesignation: string; empAddress: string; empContact: string; empEmail: string; birthday: string; empGender: string; startDate: any; empEdu: string; };

  constructor(private firestore:AngularFirestore) { }
}
