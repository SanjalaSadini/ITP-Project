import { Injectable } from '@angular/core';
import { Signup } from './signup.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  formData:Signup;
  public signUpForm: FormGroup;
  public control : FormControl;

  constructor() { }

  form :FormGroup = new FormGroup({
    id :new FormControl(null),
    firstName: new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z]+$')]),
    lastName:  new FormControl('',[Validators.required,Validators.pattern('^[a-z A-Z]+$')]),
    email:new FormControl('',[Validators.required, Validators.minLength(10)]), 
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),

  });

}
