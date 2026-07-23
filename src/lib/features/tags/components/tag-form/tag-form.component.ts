import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ColorPickerModule, ButtonModule],
  templateUrl: './tag-form.component.html',
})
export class TagFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() saving = false;
  @Output() submitted = new EventEmitter<void>();
}
