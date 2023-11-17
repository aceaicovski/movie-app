import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Movie} from "../../models/movie.interface";
import {MovieService} from "../../services/movie.service";

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  public movie: Movie | undefined;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.movieService.selectedMovie$.subscribe((selectedMovie) => {
      this.movie = selectedMovie;
    });
  }
}
