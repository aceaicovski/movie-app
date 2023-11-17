import { Routes } from '@angular/router';
import {MovieDetailComponent} from "./components/movie-detail/movie-detail.component";
import {MovieListComponent} from "./components/movie-list-component/movie-list.component";

export const routes: Routes = [
  {path: '', component: MovieListComponent},
  {path: 'details/:id', component: MovieDetailComponent},
];
