export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  imageUrl?: string;
  createdAt: string;
}

export type RecipeDraft = Omit<Recipe, 'id' | 'createdAt'>;
