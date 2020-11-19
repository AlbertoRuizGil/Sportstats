import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() status: string;
  @Input() route: string;

  @Input() showBack: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  exit(): void {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
