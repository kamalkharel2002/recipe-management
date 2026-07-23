import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CookTimeFormatPipe } from '@shared/pipes/cook-time-format/cook-time-format.pipe';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink, CardModule, ButtonModule, TagModule, CookTimeFormatPipe],
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;
  @Output() deleteRequested = new EventEmitter<Recipe>();
}
