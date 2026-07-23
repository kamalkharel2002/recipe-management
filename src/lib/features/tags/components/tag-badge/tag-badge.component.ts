import { Component, Input } from '@angular/core';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tag-badge',
  standalone: true,
  template: `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border">
      <span class="w-2 h-2 rounded-full" [style.background-color]="tag.color"></span>
      {{ tag.name }}
    </span>
  `,
})
export class TagBadgeComponent {
  @Input({ required: true }) tag!: Tag;
}
