import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, of, switchMap } from 'rxjs';
import { SearchService } from '../search-service';

@Component({
  selector: 'app-character-search',
  standalone: true,
  templateUrl: './character-search.html',
  styleUrl: './character-search.css',
})
export class CharacterSearch implements AfterViewInit {
  // Inyecta el servicio de búsqueda
  private searchService = inject(SearchService);

  // Estado reactivo que almacena los resultados del búsqueda
  results = signal<any[]>([]);

  // Obtiene referencia al elemento input del template
  @ViewChild('searchInput')
  searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    // Escucha eventos 'input' del campo de búsqueda
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        // Extrae el valor del input
        map((event) => (event.target as HTMLInputElement).value),
        // Espera 300ms sin cambios antes de ejecutar (evita muchas peticiones)
        debounceTime(300),
        // Ignora valores repetidos consecutivos
        distinctUntilChanged(),
        // Cancela búsquedas previas y envía solo la más reciente
        switchMap((term) => {
          if (term.length === 0) {
            return of({ results: [] });
          } else {
            return this.searchService.getSearchResults(term);
          }
        }),
        // Extrae el array 'results' de la respuesta de la API
        map((response: any) => response.results ?? []),
      )
      // Actualiza la signal con los resultados obtenidos
      .subscribe((characters) => {
        this.results.set(characters);
      });
  }
}
