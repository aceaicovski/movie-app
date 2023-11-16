import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from "../../services/movie-service.service";
import { MovieComponentComponent } from "../movie-component/movie-component.component";
import {Movie} from "../../models/movie.interface";
import { NgxPaginationModule } from "ngx-pagination";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-movie-list-component',
  standalone: true,
  imports: [CommonModule, MovieComponentComponent, NgxPaginationModule, MatPaginatorModule, PaginationComponent],
  templateUrl: './movie-list-component.component.html',
  styleUrl: './movie-list-component.component.css'
})
export class MovieListComponent implements OnInit {
  public movies: Movie[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  public loadMovies(): void {
    this.movieService.moviesList.subscribe((movies) => {
      this.movies = movies?.results!;
      this.totalPages = movies?.total_pages!;
    });
  }

  public onPageChanged(page: number): void {
    this.currentPage = page;
    this.movieService.updatePageNumber(page.toString());
  }

  // ngOnDestroy() {
  //   subscription.unsubscribe();
  // }
}
