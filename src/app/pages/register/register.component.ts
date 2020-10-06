import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

import { User } from '../../inteface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.name = this.fb.control('', [Validators.required, Validators.minLength(2)]);
    this.email = this.fb.control('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
    this.password = this.fb.control('', [Validators.required, Validators.minLength(6)]);
    this.registerForm = this.fb.group({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }

  register(): void {
    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      customClass: {
        popup: 'alert-popup',
        title: 'alert-title',
      }
    });

    Swal.showLoading();
    if (this.registerForm.valid) {
      const newUser: User = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
      };
      this.userService.addUser(newUser, this.registerForm.value.password)
        .then(() => {
          Swal.fire({
            icon: 'success',
            text: 'Usuario registrado correctamente',
            showConfirmButton: true,
            customClass: {
              popup: 'alert-popup',
              title: 'alert-title'
            }
          });
          this.router.navigate(['/userTeams']);
        })
        .catch((err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Imposible crear usuario',
            showConfirmButton: true,
            text: err.message,
            customClass: {
              popup: 'alert-popup',
              title: 'alert-title'
            }
          });
          console.log(err);
        });
    }
  }
}
