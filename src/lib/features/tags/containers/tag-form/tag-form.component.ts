import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TagFormFactory } from '../../forms/tag-form.factory';
import { TagService } from '../../services/tag.service';
import { NotificationService } from '@core/services/notification.service';
import { TagFormComponent } from '../../components/tag-form/tag-form.component';

@Component({
  selector: 'app-tag-form-container',
  standalone: true,
  imports: [TagFormComponent],
  template: `
    <app-tag-form [form]="form" [saving]="saving()" (submitted)="onSubmit()" />
  `,
})
export class TagFormContainerComponent implements OnInit {
  @Input() tagId: number | null = null;

  private tagFormFactory = inject(TagFormFactory);
  private tagService = inject(TagService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  form: FormGroup = this.tagFormFactory.create();
  saving = signal(false);

  ngOnInit(): void {
    if (this.tagId != null) {
      this.tagService.getById(this.tagId).subscribe((tag) => {
        this.tagFormFactory.patchWithTag(this.form, tag);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const draft = this.form.value;

    const request = this.tagId != null
      ? this.tagService.update(this.tagId, draft)
      : this.tagService.create(draft);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.tagId != null ? 'Tag updated' : 'Tag created');
        this.router.navigate(['/tags']);
      },
      error: () => {
        this.saving.set(false);
        this.notificationService.error('Something went wrong', 'Please try again.');
      },
    });
  }
}
