import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from "../../services/movie.service";
import { MovieComponent } from "../movie-component/movie.component";
import {Movie} from "../../models/movie.interface";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieComponent, PaginationComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  public movies: Movie[] = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private movieService: MovieService) {
    this.movieService.searchMovieValue$.subscribe((value) => {
      this.onPageChanged(1);

      if (value.length > 0) {
        this.movieService.searchMovies(value).subscribe((movies) => {
          this.movies = movies?.results!;
          this.totalPages = movies?.total_pages!;
        });
      } else {
        this.loadMovies();
      }
    });
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
}
