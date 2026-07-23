import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagBadgeComponent } from '../tag-badge/tag-badge.component';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-list-item',
  standalone: true,
  imports: [RouterLink, ButtonModule, TagBadgeComponent],
  template: `
    <div class="flex items-center justify-between py-3 border-b">
      <app-tag-badge [tag]="tag" />
      <div class="flex gap-2">
        <a [routerLink]="['/tags/edit', tag.id]">
          <p-button icon="pi pi-pencil" [text]="true" />
        </a>
        <p-button icon="pi pi-trash" severity="danger" [text]="true" (onClick)="deleteRequested.emit(tag)" />
      </div>
    </div>
  `,
})
export class TagListItemComponent {
  @Input({ required: true }) tag!: Tag;
  @Output() deleteRequested = new EventEmitter<Tag>();
}
