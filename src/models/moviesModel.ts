export interface dataMoviesModel {
  id: number;
  vote_average: number;
  overview: string;
  release_date: string;
  backdrop_path: string;
  banner: string;
  poster_path: string;
  title: string;
  original_title: string;
  popularity: number;
  genre_ids: number[];
  isFavorite: boolean;
}

export interface dataMoviesToBuy extends dataMoviesModel {
  session_date: Date
}

export interface dataMoviesBag {
  id: number;
  title: string;
  banner: string;
  session_date: Date;
}

