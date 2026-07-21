import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@features/authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    public theme: ThemeService,
    private authService: AuthService,
    private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
