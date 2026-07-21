import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, MessageModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() loading = false;
  @Input() errorMessage: string | null = null;
  @Output() submitted = new EventEmitter<void>();
}
