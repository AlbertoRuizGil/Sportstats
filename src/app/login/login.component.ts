import { AuthService } from '@/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  isValidForm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.email = this.fb.control('', Validators.required);
    this.password = this.fb.control('', Validators.required);
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password,
    });
  }

  login(): void {
    Swal.fire({
      title: 'Cargando...',
      icon: 'question',
      customClass: {
        popup: 'alert-popup',
        title: 'alert-title',
      },
    });

    if (this.loginForm.valid) {
      Swal.showLoading();
      this.authService
        .tryLogin(this.loginForm.value.email, this.loginForm.value.password)
        .then(() => {
          Swal.close();
          this.router.navigate(['/userTeams']);
        })
        .catch(() => {
          this.isValidForm = false;
          Swal.close();
        });
    }
  }
}
