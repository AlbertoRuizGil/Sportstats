import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  isvalidform = true;
  isloading = false;

  constructor(private fb: FormBuilder,
              public auth: AuthService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    
  }

  createForm(){
    this.login_form = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    })
  }

  get not_valid_email(){
    return this.login_form.get('email').invalid && this.login_form.get('email').touched
  }

  login(){

    this.isloading = true;
    if(this.login_form.valid){
        this.auth.tryLogin(this.login_form.value.email, this.login_form.value.password)
        .then(resp => {
          this.auth.saveToken(resp.user.refreshToken);
          this.isloading = false;
          this.router.navigateByUrl("/userTeams");
        })
        .catch(() => this.isvalidform = false)
    }else {
      this.isvalidform = false;
    }

  }

  

}
