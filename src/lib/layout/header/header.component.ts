import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public theme: ThemeService) {}
}