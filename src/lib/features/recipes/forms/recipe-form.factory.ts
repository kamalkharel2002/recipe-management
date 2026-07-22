import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientFactory } from './ingredient.factory';
import { StepFactory } from './step.factory';
import { minArrayLength } from '../validators/min-array-length.validator';
import { Recipe } from '../models/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeFormFactory {
  constructor(
    private fb: FormBuilder,
    private ingredientFactory: IngredientFactory,
    private stepFactory: StepFactory,
  ) {}

  create(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      cookTime: [30, [Validators.required, Validators.min(1)]],
      servings: [2, [Validators.required, Validators.min(1)]],
      imageUrl: [''],
      tags: [[] as string[]],
      ingredients: this.fb.array(
        [this.ingredientFactory.create()],
        minArrayLength(1),
      ),
      steps: this.fb.array([this.stepFactory.create()], minArrayLength(1)),
    });
  }

  patchWithRecipe(form: FormGroup, recipe: Recipe): void {
    const ingredientsArray = form.get('ingredients') as FormArray;
    const stepsArray = form.get('steps') as FormArray;

    ingredientsArray.clear();
    recipe.ingredients.forEach((ingredient) =>
      ingredientsArray.push(this.ingredientFactory.create(ingredient)),
    );

    (stepsArray.clear(),
      recipe.steps.forEach((step) =>
        stepsArray.push(this.stepFactory.create(step)),
      ));

    form.patchValue({
      title: recipe.title,
      description: recipe.description,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      imageUrl: recipe.imageUrl,
      tags: recipe.tags,
    });
  }
}
