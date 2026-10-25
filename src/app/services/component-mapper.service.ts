import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentMapperService {
  private readonly componentMap: Record<string, string> = {
    'my-project/components/custom-card': 'content-card'
  };

  getComponentName(resourceType: string): string {
    return this.componentMap[resourceType] ?? 'unsupported';
  }

  isSupported(resourceType: string): boolean {
    return Object.prototype.hasOwnProperty.call(
      this.componentMap,
      resourceType
    );
  }
}
