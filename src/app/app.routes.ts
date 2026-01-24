import { Routes } from '@angular/router';
import { ProductoPage } from './productos/producto-page/producto-page';
import { CharacterSearch } from './search/character-search/character-search';

export const routes: Routes = [
  { path: '', component: ProductoPage },
  { path: 'search', component: CharacterSearch },
];
