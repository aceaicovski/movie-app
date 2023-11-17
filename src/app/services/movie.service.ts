import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Movie, MoviesData} from "../models/movie.interface";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = new BehaviorSubject<MoviesData | undefined>({});
  public page: string = '1';

  private selectedMovieSource = new BehaviorSubject<any>(null);
  public selectedMovie$ = this.selectedMovieSource.asObservable();

  private searchMovieValueSource = new BehaviorSubject<string>('');
  public searchMovieValue$ = this.searchMovieValueSource.asObservable();

  constructor(public httpClient: HttpClient) { }

  public get moviesList() {
    this.httpClient.get<MoviesData>(`https://api.themoviedb.org/3/discover/movie?api_key=e80ecf7d0b9279c63c9c4d6b7e4e9617&page=${this.page}`,
    ).subscribe((movies) => {
        this._movies.next(movies);
      });

    return this._movies.asObservable();
  }

  public searchMovies(keyword: string) {
    this.httpClient.get<MoviesData>(`https://api.themoviedb.org/3/search/multi?api_key=e80ecf7d0b9279c63c9c4d6b7e4e9617&query=${keyword}&page=${this.page}`,
    ).subscribe((movies) => {

      this._movies.next(movies);
    });

    return this._movies.asObservable();
  }

  // This method was not implemented yet, and can be used on MovieDetailsPage to fetch movie
  // details and keep data persistent on the page even after reload as it will not depend on the data passed from parent component
  public getMovieDetails(movieId: number) {
    return this.httpClient.get<any>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e80ecf7d0b9279c63c9c4d6b7e4e9617`);
  }

  public setSelectedMovie(movie: Movie): void {
    this.selectedMovieSource.next(movie);
  }

  public setSearchMovieValue(movie: string): void {
    this.searchMovieValueSource.next(movie);
  }

  public updatePageNumber(page: string): void {
    this.page = page;
    if (this.searchMovieValueSource.value.length > 0) {
      this.searchMovies(this.searchMovieValueSource.value).subscribe();
    } else {
      this.moviesList.subscribe();
    }
  }

}
