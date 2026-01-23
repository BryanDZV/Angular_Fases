import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private dato = 'https://rickandmortyapi.com/api/character/?name=';

  getSearchResults(query: string) {
    return this.http.get<any>(this.dato + query);
  }
}
