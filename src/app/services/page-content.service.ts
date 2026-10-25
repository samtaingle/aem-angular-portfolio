import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AemCard {
  ':type': string;
  cardTitle: string;
  cardDesc: string;
}

export interface AemPageModel {
  title: string;
  root: {
    ':items': Record<string, AemCard>;
    ':itemsOrder': string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class PageContentService {
  private readonly mockUrl = '/api/page-model';

  constructor(private http: HttpClient) {}

  getPageModel(): Observable<AemPageModel> {
    if (environment.contentSource === 'aem') {
      const baseUrl = environment.aemBaseUrl.trim();

      if (!baseUrl) {
        return throwError(
          () => new Error(
            'AEM is selected, but aemBaseUrl is not configured.'
          )
        );
      }

      const aemUrl =
        `${baseUrl.replace(/\/+$/, '')}/content/my-project/en.model.json`;

      return this.http.get<unknown>(aemUrl).pipe(
        map(data => this.validatePageModel(data))
      );
    }

    return this.http.get<unknown>(this.mockUrl).pipe(
      map(data => this.validatePageModel(data))
    );
  }

  private validatePageModel(data: unknown): AemPageModel {
    if (!data || typeof data !== 'object') {
      throw new Error('The page model must be an object.');
    }

    const model = data as Partial<AemPageModel>;
    const root = model.root;

    if (
      typeof model.title !== 'string' ||
      !root ||
      typeof root !== 'object' ||
      !root[':items'] ||
      typeof root[':items'] !== 'object' ||
      !Array.isArray(root[':itemsOrder'])
    ) {
      throw new Error('The page model has an invalid structure.');
    }

    const cards: Record<string, AemCard> = {};

    for (const key of root[':itemsOrder']) {
      if (typeof key !== 'string') {
        continue;
      }

      const card = root[':items'][key];

      if (
        card &&
        typeof card[':type'] === 'string' &&
        typeof card.cardTitle === 'string' &&
        typeof card.cardDesc === 'string'
      ) {
        cards[key] = card;
      }
    }

    return {
      title: model.title,
      root: {
        ':items': cards,
        ':itemsOrder': root[':itemsOrder'].filter(
          key => typeof key === 'string' && Boolean(cards[key])
        )
      }
    };
  }
}
