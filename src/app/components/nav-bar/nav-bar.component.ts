import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MovieService} from "../../services/movie.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  public inputValue: string = '';
  @Output() searchValueChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private movieService: MovieService) {
  }

  public searchFilm(): void {
    const currentPathname = this.router.url;

    if (currentPathname !== "/") {
      this.router.navigate([`/`]);
    }

    this.movieService.setSearchMovieValue(this.inputValue);
  }
}
