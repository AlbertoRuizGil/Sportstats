import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  isvalidform = true;

  constructor(private fb: FormBuilder,
              public _as: AuthService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void { }

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

    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      customClass: {
        popup: 'alert-popup',
        title: 'alert-title'
      }
    });
    
    if(this.login_form.valid){

        Swal.showLoading();
        this._as.tryLogin(this.login_form.value.email, this.login_form.value.password)
        .then(resp => {
          this._as.saveToken(resp.user.refreshToken);
          Swal.close();  
          this.router.navigateByUrl(`/userTeams/${resp.user.uid}`);
        })
        .catch(() => {
          this.isvalidform = false;
          Swal.close();
        })
    }else {
      this.isvalidform = false;
    }

  }

  

}
