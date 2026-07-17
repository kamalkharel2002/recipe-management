import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationSeverity = 'success' | 'error' | 'info' | 'warn';

export interface AppNotification {
  severity: NotificationSeverity;
  summary: string;
  detail?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notification$ = new BehaviorSubject<AppNotification | null>(null);
  readonly notifications = this.notification$.asObservable();

  success(summary: string, detail?: string): void {
    this.notification$.next({ severity: 'success', summary, detail });
  }

  error(summary: string, detail?: string): void {
    this.notification$.next({ severity: 'error', summary, detail });
  }

  info(summary: string, detail?: string): void {
    this.notification$.next({ severity: 'info', summary, detail });
  }

  warn(summary: string, detail?: string): void {
    this.notification$.next({ severity: 'warn', summary, detail });
  }
}