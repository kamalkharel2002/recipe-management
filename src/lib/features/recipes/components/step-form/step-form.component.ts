import { Component, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StepFactory } from '../../forms/step.factory';

@Component({
  selector: 'app-step-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './step-form.component.html',
})
export class StepFormComponent {
  @Input({ required: true }) steps!: FormArray;

  constructor(private stepFactory: StepFactory) {}

  asControl(control: unknown): FormControl {
    return control as FormControl;
  }

  add(): void {
    this.steps.push(this.stepFactory.create());
  }

  remove(index: number): void {
    this.steps.removeAt(index);
  }

  moveUp(index: number): void {
    this.moveStep(index, -1);
  }

  moveDown(index: number): void {
    this.moveStep(index, 1);
  }
  private moveStep(index: number, direction: number): void {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.steps.length) return;

    const control = this.steps.at(index);
    this.steps.removeAt(index);
    this.steps.insert(newIndex, control);
  }
}
