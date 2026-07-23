import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-delete-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, MessageModule],
  template: `
    <p-dialog
      [visible]="tag !== null"
      (visibleChange)="!$event && cancelled.emit()"
      [modal]="true"
      header="Delete tag?"
      [style]="{ width: '420px' }"
    >
      @if (tag) {
        @if (checking) {
          <p class="text-sm text-neutral-500">Checking if this tag is in use...</p>
        } @else if (blocked) {
          <p-message
            severity="warn"
            text="This tag is used by one or more recipes and can't be deleted. Remove it from those recipes first."
          />
        } @else {
          <p>
            Are you sure you want to delete <strong>{{ tag.name }}</strong>?
            This cannot be undone.
          </p>
        }
      }

      <div class="flex justify-end gap-2 mt-4">
        <p-button label="Cancel" [text]="true" (onClick)="cancelled.emit()" />
        @if (!blocked) {
          <p-button label="Delete" severity="danger" [loading]="checking" (onClick)="confirmed.emit()" />
        }
      </div>
    </p-dialog>
  `,
})
export class TagDeleteDialogComponent {
  @Input() tag: Tag | null = null;
  @Input() checking = false;
  @Input() blocked = false;
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}
