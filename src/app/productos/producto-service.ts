import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', //disponible en toda la aplicacion
})
export class ProductoService {
  private productos = inject(HttpClient);
  private url = 'https://fakestoreapi.com/products';

  getProductos() {
    return this.productos.get(this.url);
  }
}
