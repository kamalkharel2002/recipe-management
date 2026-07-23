import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MultiSelect } from 'primeng/multiselect';
import { RecipeFormFactory } from '../../forms/recipe-form.factory';
import { RecipeService } from '../../services/recipe.service';
import { IngredientFormComponent } from '../../components/ingredient-form/ingredient-form.component';
import { StepFormComponent } from '../../components/step-form/step-form.component';
import { NotificationService } from '@core/services/notification.service';
import { TagService } from '@features/tags/services/tag.service';
import { Tag } from '@features/tags/models/tag.model';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    MultiSelect,
    IngredientFormComponent,
    StepFormComponent,
  ],
  templateUrl: './recipe-form.component.html',
})
export class RecipeFormComponent implements OnInit {
  @Input() recipeId: number | null = null;

  private recipeFormFactory = inject(RecipeFormFactory);
  private recipeService = inject(RecipeService);
  private tagService = inject(TagService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  form: FormGroup = this.recipeFormFactory.create();
  saving = signal(false);
  availableTags = signal<Tag[]>([]);

  ngOnInit(): void {
    this.tagService.getAll().subscribe((tags) => this.availableTags.set(tags));
    if (this.recipeId != null) {
      this.recipeService.getById(this.recipeId).subscribe((recipe) => {
        this.recipeFormFactory.patchWithRecipe(this.form, recipe);
      });
    }
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  get tagOptions(): string[] {
    return this.availableTags().map((tag) => tag.name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const draft = this.form.value;

    const request =
      this.recipeId != null
        ? this.recipeService.update(this.recipeId, draft)
        : this.recipeService.create(draft);

    request.subscribe({
      next: (recipe) => {
        this.saving.set(false);
        this.notificationService.success(
          this.recipeId != null ? 'Recipe updated' : 'Recipe created',
        );
        this.router.navigate(['/recipes', recipe.id]);
      },
      error: () => {
        this.saving.set(false);
        this.notificationService.error(
          'Something went wrong',
          'Please try again.',
        );
      },
    });
  }
}
