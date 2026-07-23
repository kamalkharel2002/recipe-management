import { Component, OnInit, computed, signal } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { NotificationService } from '@core/services/notification.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeSearchComponent } from '../../components/recipe-search/recipe-search.component';
import { RecipeFilterComponent } from '../../components/recipe-filter/recipe-filter.component';
import { RecipeSortComponent, SortOption } from '../../components/recipe-sort/recipe-sort.component';
import { DeleteRecipeDialogComponent } from '../../components/delete-recipe-dialog/delete-recipe-dialog.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RouterLink,
    RecipeCardComponent,
    RecipeSearchComponent,
    RecipeFilterComponent,
    RecipeSortComponent,
    DeleteRecipeDialogComponent,
    ButtonModule,
  ],
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  allRecipes = signal<Recipe[]>([]);
  loading = signal(true);
  recipeToDelete = signal<Recipe | null>(null);

  searchQuery = signal('');
  selectedTags = signal<string[]>([]);
  sortBy = signal<SortOption>('newest');

  availableTags = computed(() => {
    const tagSet = new Set<string>();
    this.allRecipes().forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  });

  filteredRecipes = computed(() => {
    let result = this.allRecipes();

    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      result = result.filter((r) => r.title.toLowerCase().includes(query));
    }

    const tags = this.selectedTags();
    if (tags.length) {
      result = result.filter((r) => tags.every((tag) => r.tags.includes(tag)));
    }

    const sort = this.sortBy();
    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'cookTime': return a.cookTime - b.cookTime;
        case 'servings': return a.servings - b.servings;
        case 'title': return a.title.localeCompare(b.title);
        default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  });

  constructor(
    private recipeService: RecipeService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.recipeService.getAll().subscribe({
      next: (recipes) => {
        this.allRecipes.set(recipes);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.error('Failed to load recipes');
      },
    });
  }

  confirmDelete(): void {
    const recipe = this.recipeToDelete();
    if (!recipe) return;

    this.recipeService.delete(recipe.id).subscribe({
      next: () => {
        this.allRecipes.update((recipes) => recipes.filter((r) => r.id !== recipe.id));
        this.notificationService.success('Recipe deleted');
        this.recipeToDelete.set(null);
      },
      error: () => {
        this.notificationService.error('Failed to delete recipe');
        this.recipeToDelete.set(null);
      },
    });
  }
}
