import { Component } from '@angular/core';
import { LoginComponent } from '../../containers/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <div class="flex items-center justify-center h-screen bg-neutral-50 app-dark:bg-neutral-950">
      <div class="bg-white app-dark:bg-neutral-900 p-8 rounded-lg shadow-sm">
        <h1 class="text-xl font-semibold mb-6">Log in to Recipe Manager</h1>
        <app-login />
      </div>
    </div>
  `,
})
export class LoginPageComponent {}
