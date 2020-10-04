import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../inteface/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register_form : FormGroup;
  areFieldsEmpty = false;
  
  constructor (private fb: FormBuilder,
               private _as: AuthService,
               private _us: UsersService,
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

  createForm(){
    this.register_form = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2) ] ],
      email: ['',[ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' ) ] ],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    })
  }

  register(){
    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      customClass: {
        popup: 'alert-popup',
        title: 'alert-title',
      }
    });

    Swal.showLoading();
    if(this.register_form.controls.name.pristine &&
      this.register_form.controls.email.pristine &&
      this.register_form.controls.password.pristine){

        this.areFieldsEmpty = true;
        Swal.close();
      
    }else{
      this.areFieldsEmpty = false;
      if(this.register_form.valid){
        this._as.registerUser(this.register_form.value.email, this.register_form.value.password)
          .then(resp => {
            let newUser : User = {
              name: this.register_form.value.name,
              email: this.register_form.value.email,
            };
            this._us.addUser(newUser, resp.user.uid);
            this._as.saveUserId(resp.user.uid);
            Swal.fire({
              icon: 'success',
              text: 'Usuario registrado correctamente',
              showConfirmButton: true,
              customClass: {
                popup: 'alert-popup',
                title: 'alert-title'
              }
            })
            this.router.navigateByUrl(`/userTeams/${resp.user.uid}`);
          })
          .catch(err => {
            Swal.fire({
            icon: 'error',
            title: 'Usuario existente',
            showConfirmButton: true,
            text: err.message,
            customClass: {
              popup: 'alert-popup',
              title: 'alert-title'
            }})
            console.log(err);
          })
      }
    }
    
  }

}
