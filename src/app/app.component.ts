import { Component, OnInit } from '@angular/core';
import { PageContentService, AemCard } from './services/page-content.service';
import { ComponentMapperService } from './services/component-mapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle = 'AEM Angular Portfolio';
  cards: AemCard[] = [];
  loading = true;
  error = '';

  constructor(
    private pageContent: PageContentService,
    private componentMapper: ComponentMapperService
  ) {}

  ngOnInit(): void {
    this.loadContent();
  }

  reloadContent(): void {
    this.loadContent();
  }

  isSupported(resourceType: string): boolean {
    return this.componentMapper.isSupported(resourceType);
  }

  private loadContent(): void {
    this.loading = true;
    this.error = '';

    this.pageContent.getPageModel().subscribe({
      next: (model) => {
        this.pageTitle = model.title;
        this.cards = model.root[':itemsOrder']
          .map(key => model.root[':items'][key])
          .filter((card): card is AemCard => Boolean(card));

        this.loading = false;
      },
      error: (err: unknown) => {
        console.error('Failed to load page content:', err);
        this.cards = [];
        this.error = 'Unable to load the page content. Please try again.';
        this.loading = false;
      }
    });
  }
}
