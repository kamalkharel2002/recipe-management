import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule],
  template: `<p-toast />`,
})
export class ToastComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(
    private notificationService: NotificationService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.sub = this.notificationService.notifications.subscribe((notification) => {
      if (!notification) return;
      this.messageService.add({
        severity: notification.severity,
        summary: notification.summary,
        detail: notification.detail,
        life: 4000,
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}