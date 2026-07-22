import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { IngredientFactory } from '../../forms/ingredient.factory';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, InputNumberModule, ButtonModule],
  templateUrl: './ingredient-form.component.html',
})
export class IngredientFormComponent {
  @Input({ required: true }) ingredients!: FormArray;

  constructor(private ingredientFactory: IngredientFactory) {}

  asGroup(control: unknown): FormGroup {
    return control as FormGroup;
  }

  add(): void {
    this.ingredients.push(this.ingredientFactory.create());
  }

  remove(index: number): void {
    this.ingredients.removeAt(index);
  }
}
