import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap, throwError } from 'rxjs';
import { StorageService } from '@core/services/storage.service';
import { API_BASE_URL } from '@core/config/api-config';
import { User, AuthUser } from '../models/user.model';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<AuthUser | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUser());

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {
    const savedUser = this.storage.get<AuthUser>(USER_KEY);
    if (savedUser && this.getToken()) {
      this.currentUser.set(savedUser);
    }
  }

  login(email: string, password: string): Observable<AuthUser> {
    return this.http
      .get<User[]>(`${API_BASE_URL}/users?email=${email}&password=${password}`)
      .pipe(
        map((matches) => {
          if (!matches.length) {
            throw new Error('Invalid email or password');
          }
          const { password: _pw, ...authUser } = matches[0];
          return authUser as AuthUser;
        }),
        tap((authUser) => {
          const fakeToken = btoa(`${authUser.id}:${Date.now()}`);
          this.storage.set(TOKEN_KEY, fakeToken);
          this.storage.set(USER_KEY, authUser);
          this.currentUser.set(authUser);
        }),
      );
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.storage.remove(USER_KEY);
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.storage.get<string>(TOKEN_KEY);
  }
}