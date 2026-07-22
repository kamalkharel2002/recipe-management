import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cookTimeFormat',
  standalone: true,
})
export class CookTimeFormatPipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (minutes == null || minutes <= 0) return '0m';

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (hours === 0) return `${remaining}m`;
    if (remaining === 0) return `${hours}h`;
    return `${hours}h ${remaining}m`;
  }
}
