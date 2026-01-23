import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  Signal,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { SearchService } from '../search-service';
import { debounceTime, distinctUntilChanged, fromEvent, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-character-search',
  imports: [],
  templateUrl: './character-search.html',
  styleUrl: './character-search.css',
})
export class CharacterSearch implements AfterViewInit {
  private SearchService = inject(SearchService);
  private injector = inject(Injector);
  results!: Signal<any[]>;

  //viewChild sirve para capturar elementos del DOM
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    //fromEvent sirve para escuchar eventos de un elemento del DOM
    const search$ = fromEvent(this.searchInput.nativeElement, 'input')
      //pipe es para encadenar operadores de RxJS
      .pipe(
        //map es para transformar el valor del evento
        map((event) => (event.target as HTMLInputElement).value),
        //debounceTime es para esperar un tiempo antes de emitir el valor
        debounceTime(300),
        // Evita buscar lo mismo dos veces seguidas
        distinctUntilChanged(),
        //switchMap es para cancelar la petición anterior si llega una nueva
        switchMap((term) => this.SearchService.getSearchResults(term)),
      );

    // Convierte el observable a Signal con valor inicial vacío
    //this.results = toSignal(search$, { initialValue: [] });

    // Alternativamente, usando runInInjectionContext evita el erro de contexto
    this.results = runInInjectionContext(this.injector, () =>
      toSignal(search$.pipe(map((response: any) => response.results ?? [])), { initialValue: [] }),
    );
  }
}
