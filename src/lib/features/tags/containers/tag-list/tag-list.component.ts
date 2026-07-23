import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagService } from '../../services/tag.service';
import { TagInUseGuard } from '../../validators/tag-in-use.guard';
import { NotificationService } from '@core/services/notification.service';
import { Tag } from '../../models/tag.model';
import { TagListItemComponent } from '../../components/tag-list-item/tag-list-item.component';
import { TagDeleteDialogComponent } from '../../components/tag-delete-dialog/tag-delete-dialog.component';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [RouterLink, ButtonModule, TagListItemComponent, TagDeleteDialogComponent],
  templateUrl: './tag-list.component.html',
})
export class TagListComponent implements OnInit {
  tags = signal<Tag[]>([]);
  loading = signal(true);

  tagToDelete = signal<Tag | null>(null);
  checkingUsage = signal(false);
  deleteBlocked = signal(false);

  constructor(
    private tagService: TagService,
    private tagInUseGuard: TagInUseGuard,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.tagService.getAll().subscribe({
      next: (tags) => {
        this.tags.set(tags);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.error('Failed to load tags');
      },
    });
  }

  requestDelete(tag: Tag): void {
    this.tagToDelete.set(tag);
    this.deleteBlocked.set(false);
    this.checkingUsage.set(true);

    this.tagInUseGuard.isTagInUse(tag.name).subscribe((inUse) => {
      this.checkingUsage.set(false);
      this.deleteBlocked.set(inUse);
    });
  }

  confirmDelete(): void {
    const tag = this.tagToDelete();
    if (!tag) return;

    this.tagService.delete(tag.id).subscribe({
      next: () => {
        this.tags.update((tags) => tags.filter((t) => t.id !== tag.id));
        this.notificationService.success('Tag deleted');
        this.tagToDelete.set(null);
      },
      error: () => {
        this.notificationService.error('Failed to delete tag');
        this.tagToDelete.set(null);
      },
    });
  }

  cancelDelete(): void {
    this.tagToDelete.set(null);
  }
}
