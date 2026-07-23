import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_BASE_URL } from "@core/config/api-config";
import { Recipe, RecipeDraft } from "../models/recipe.model";

@Injectable({ providedIn: 'root'})
export class RecipeService{
  private readonly baseurl = `${API_BASE_URL}/recipes`;

  constructor(private http: HttpClient){}

  getAll(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseurl);
  }

  getById(id: number): Observable<Recipe>{
    return this.http.get<Recipe>(`${this.baseurl}/${id}`);
  }

  create(draft: RecipeDraft): Observable<Recipe>{
    const playload = { ...draft, createdAt: new Date().toISOString()};
    return this.http.post<Recipe>(this.baseurl, playload);
  }

  update(id: number, draft: RecipeDraft): Observable<Recipe>{
    return this.http.put<Recipe>(`${this.baseurl}/${id}`, draft);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseurl}/${id}`);
  }
}
