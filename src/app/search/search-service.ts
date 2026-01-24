import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
// Importamos operadores RxJS para manejar el flujo de datos
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character/?name=';

  getSearchResults(query: string) {
    // Normalizamos la búsqueda a minúsculas antes de enviar
    const normalizedQuery = query.toLowerCase().trim(); //RICKY AND MORTY API es case insensitive, pero es buena práctica normalizar

    return this.http.get<any>(this.apiUrl + normalizedQuery).pipe(
      // pipe() permite encadenar operadores que transforman el flujo

      // catchError captura cualquier error que ocurra en la petición HTTP
      catchError((error) => {
        // Registramos el error en consola para debug (opcional)
        console.error('Error en búsqueda:', error);

        // of() crea un nuevo Observable que emite un valor y se completa
        // Devolvemos un objeto con structure { results: [] }
        // para que el componente reciba un array vacío en vez de romper
        return of({ results: [] });
      }),
    );
  }
}
