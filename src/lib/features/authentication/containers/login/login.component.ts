import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginFormFactory } from '../../forms/login-form.factory';
import { AuthService } from '../../services/auth.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <app-login-form
      [form]="form"
      [loading]="loading()"
      [errorMessage]="errorMessage()"
      (submitted)="onSubmit()"
    />
  `,
})
export class LoginComponent {
  private formFactory = inject(LoginFormFactory);
  private authService = inject(AuthService);
  private router =  inject(Router);

  form = this.formFactory.create();
  loading = signal(false);
  errorMessage = signal<string | null>(null);
  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.form.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Invalid email or password.');
      },
    });
  }
}
