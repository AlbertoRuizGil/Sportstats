import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_form: FormGroup;
  isvalidform = true;

  constructor(private fb: FormBuilder,
              private auth: AngularFireAuth,
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
    console.log( this.login_form )
    if(this.login_form.valid){
      this.auth.signInWithEmailAndPassword(this.login_form.value.email, this.login_form.value.password)
        .then(resp => {
          console.log( "TOKEN: ",resp.user.refreshToken, "UID: ", resp.user.uid );
          /* this.router.navigateByUrl("/userTeams") */
        })
        .catch( err => {
          console.log ( err.message );
          this.isvalidform = false;
        })
    }else {
      this.isvalidform = false;
    }
  }

  

}
