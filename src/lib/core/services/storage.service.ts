import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser = typeof window !== 'undefined';

  get<T>(key: string): T | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }
}