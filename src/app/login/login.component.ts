import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;  
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    
   }

  ngOnInit() {
    var passwordPattern = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))'
    this.loginForm = this.formBuilder.group({
      "username": ['', Validators.required, Validators.minLength(4)],
      "password":['', Validators.required, Validators.minLength(6), Validators.max(12), Validators.pattern(passwordPattern)]
    });
  }
  // convenience getter for easy access to form fields
  get lf() { return this.loginForm.controls; }


  isEmptyUserName(){
    return this.lf['username'].invalid && (this.lf['username'].dirty || this.lf['username'].touched);
  }
  isEmptyPassword(){
    return this.lf['password'].invalid && (this.lf['password'].dirty || this.lf['password'].touched);
  }
  submit(){
    this.authService.login(this.lf.username.value, this.lf.password.value);
  }
}
