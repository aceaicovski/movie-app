import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {Movie} from "../../models/movie.interface";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Router, RouterLink} from "@angular/router";
import {MovieService} from "../../services/movie-service.service";

@Component({
  selector: 'app-movie-component',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatTooltipModule, RouterLink],
  templateUrl: './movie-component.component.html',
  styleUrl: './movie-component.component.css'
})
export class MovieComponentComponent {
  @Input({required: true}) movie: Movie = {};
  @Output() movieClicked: EventEmitter<Movie> = new EventEmitter<Movie>();


  constructor(private router: Router, private movieService: MovieService) {}

  navigateToDetails(): void {
    this.movieService.setSelectedMovie(this.movie);

    // Navigate to details page
    this.router.navigate([`/details/${this.movie.id}`]);
  }
}
