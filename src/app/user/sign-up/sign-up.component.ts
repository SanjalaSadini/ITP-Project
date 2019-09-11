import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../auth/auth.service';
import { Router, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { SignupService } from 'app/shared/services/signup.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public fb: FormBuilder ,
    public authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private signup : SignupService,
    ) { }

  matcher = new MyErrorStateMatcher();
  public signUpForm: FormGroup;
  public submitted: boolean = false;
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  ngOnInit() {
    this.registerForm();
  }



  resetForm(signUpForm ?: NgForm) {
    if (signUpForm != null)
    signUpForm.resetForm();
      this.signup.formData= {
        id: 'null',
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirmPassword:'',
    
    }
  }
  
  registerForm() {
    this.signUpForm = this.fb.group({
      userRole: ['2'],
      firstName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  static matchPassword(AC: AbstractControl) {
    let pass = AC.get('password').value;
    let confirmPass = AC.get('confirmPassword').value;

    if(pass != confirmPass) {
      AC.get('confirmPassword').setErrors( {matchPassword: true} )
    }
    else {
      return null
    }
  }

  get userRole() {
    return this.signUpForm.get('userRole');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

   onSubmit(signUpForm: NgForm){
    let data = Object.assign({},signUpForm.value);

    console.log("in on submit",signUpForm.value);
    this.authService.doRegister(signUpForm.value)
    .then(res => {
      console.log(res);
      this.router.navigate(['/signIn']);
      // this.errorMessage = "";
      // this.successMessage = "Your account has been created";
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
    })
 

  if(signUpForm.value.id == null){
    this.firestore.collection('Login-Information').add(data).then(
      res => {
        console.log('createdre')
      }
    );
    this.resetForm(signUpForm);
  }
   
  
  else{
    this.firestore.doc('Login-Information/'+ signUpForm.value.id).update(data).then(
      res => {
      }
    );
    this.resetForm(signUpForm);

  }
  }

  // resetForm(form: NgForm) {
  //   this.userService.selectedUser = {
  //     userRole: '2',
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     password: ''
  //   };
  //   form.resetForm();
  //   this.serverErrorMessages = '';
  // }

  // checkPasswords(group: FormGroup {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.confirmPassword.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // })

}

