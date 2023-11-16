import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map} from "rxjs";
import {Movie, MoviesData} from "../models/movie.interface";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _movies = new BehaviorSubject<MoviesData | undefined>({});
  public page: string = '1';

  private selectedMovieSource = new BehaviorSubject<any>(null);
  selectedMovie$ = this.selectedMovieSource.asObservable();

  constructor(public httpClient: HttpClient) { }

  public get moviesList() {
    this.httpClient.get<MoviesData>(`https://api.themoviedb.org/3/discover/movie?api_key=e80ecf7d0b9279c63c9c4d6b7e4e9617&page=${this.page}`,
    ).subscribe((movies) => {
        console.log(movies);
        this._movies.next(movies);
      });

    return this._movies.asObservable();
  }

  public searchMovie(keyword: string) {
    this.httpClient.get<MoviesData>(`https://api.themoviedb.org/3/search/${keyword}?api_key=e80ecf7d0b9279c63c9c4d6b7e4e9617&page=${this.page}`,
    ).subscribe((movies) => {

      this._movies.next(movies);
    });

    return this._movies.asObservable();
  }

  public setSelectedMovie(movie: any): void {
    this.selectedMovieSource.next(movie);
  }

  public updatePageNumber(page: string): void {
    this.page = page;
    this.moviesList.subscribe();
  }

}
