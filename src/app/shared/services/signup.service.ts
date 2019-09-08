import { Injectable } from '@angular/core';
import { Signup } from './signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  formData:Signup;

  constructor() { }
}
