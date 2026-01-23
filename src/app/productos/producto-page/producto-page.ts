import { Component, inject, signal } from '@angular/core';
import { ProductoService } from '../producto-service';
import { ProductoCard } from '../producto-card/producto-card';

@Component({
  selector: 'app-producto-page',
  imports: [ProductoCard],
  templateUrl: './producto-page.html',
  styleUrl: './producto-page.css',
})
export class ProductoPage {
  productService = inject(ProductoService);

  productos = signal<any>([]); //almacenar productos podemos crear una interface para tipar
  loading = signal(true); //estado de carga

  ngOnInit() {
    try {
      //llamar al servicio para obtener los productos

      this.productService.getProductos().subscribe({
        next: (data) => {
          //next para manejar la respuesta exitosa
          console.log('DATOS:', data);
          //almacenar los productos en el signal

          this.productos.set(data);
          //cambiar el estado de carga

          this.loading.set(false);
        },
      });
    } catch (error) {
      console.log('Error al cargar los productos', error);
    }
  }
}
