import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';

const THEME_KEY = 'app-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(false);

  constructor(private storage: StorageService) {
    const saved = this.storage.get<'dark' | 'light'>(THEME_KEY);
    const isDark = saved === 'dark';
    this.isDark.set(isDark);
    this.applyClass(isDark);
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    this.storage.set(THEME_KEY, next ? 'dark' : 'light');
    this.applyClass(next);
  }

  private applyClass(isDark: boolean): void {
    document.documentElement.classList.toggle('app-dark', isDark);
  }
}