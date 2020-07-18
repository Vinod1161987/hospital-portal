import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Constants from 'src/app/helpers/constants';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  invalidUser: boolean = false;
  loginForm: FormGroup;
  returnUrl: string;
  isSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.returnUrl = param[Constants.returnUrl] || Constants.dashboard_routePath
    }

    );
    this.loginForm = this.formBuilder.group({
      "username": ['', [Validators.required, Validators.minLength(4)]],
      "password": ['', [Validators.required, Validators.minLength(6), Validators.max(12), Validators.pattern(Constants.passwordRegxPattern)]]
    });
  }
  // convenience getter for easy access to form fields
  get lf() { return this.loginForm.controls; }

  isEmptyUserName() {
    let isValidUsername = this.isSubmitted && (this.lf['username'].invalid && (this.lf['username'].dirty || this.lf['username'].touched));
    return isValidUsername;
  }
  isEmptyPassword() {  
    let isValidPassword =  this.isSubmitted && (this.lf['password'].invalid && (this.lf['password'].dirty || this.lf['password'].touched)); 
    return isValidPassword;
  }
  submit() {
    this.isSubmitted = true;
    // if(this.loginForm.invalid){
    //   return;
    // }
    this.authService.login(this.lf.username.value, this.lf.password.value).subscribe(data => {
      console.log(data);
      if (data.statusCode == 200) {
        this.router.navigateByUrl(this.returnUrl);
      }
      else {
        this.invalidUser = true;
      }
    })
  }
}
