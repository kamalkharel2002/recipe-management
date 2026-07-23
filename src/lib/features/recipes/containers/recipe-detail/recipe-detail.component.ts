import { Component, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RecipeService } from '../../services/recipe.service';
import { CookTimeFormatPipe } from '@shared/pipes/cook-time-format/cook-time-format.pipe';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink, ButtonModule, TagModule, CookTimeFormatPipe],
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  @Input() id!: string; 

  recipe = signal<Recipe | null>(null);
  loading = signal(true);

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getById(Number(this.id)).subscribe({
      next: (recipe) => {
        this.recipe.set(recipe);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
