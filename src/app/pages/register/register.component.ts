import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register_form : FormGroup;
  loading: boolean;
  
  constructor (private fb: FormBuilder,
               private auth: AngularFireAuth,
               private router: Router ){
    this.createForm();
  }

  ngOnInit(): void {
  }


  get not_valid_name(): boolean{
    return this.register_form.get('name').invalid && this.register_form.get('name').touched
  }

  get not_valid_email(): boolean{
    return this.register_form.get('email').invalid && this.register_form.get('email').touched
  }

  get not_valid_password(): boolean{
    return this.register_form.get('password').invalid && this.register_form.get('password').touched
  }

  get empty_fields(): boolean{
    return !(this.register_form.controls.name.pristine &&
           this.register_form.controls.email.pristine &&
           this.register_form.controls.password.pristine)
  }

  createForm(){
    this.register_form = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2) ] ],
      email: ['',[ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' ) ] ],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    })
  }

  register(){
    console.log( this.register_form );
    if(this.register_form.valid){
      this.auth.createUserWithEmailAndPassword(this.register_form.value.email, this.register_form.value.password)
        .then(resp => {
          console.log( resp );
          /* UID: resp.user.uid */
          /* TOKEN: resp.user.refreshToken */
          this.router.navigateByUrl("/userTeams");
        })
        .catch( err => {
          console.log ( err.message );
          
        })
    }
  }

}
