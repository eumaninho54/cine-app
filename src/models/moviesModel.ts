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
}

export interface dataMoviesToBuy extends dataMoviesModel {
  weekSession: string
  dateSession: Date
}

export interface dataMoviesBag {
  id: number;
  title: string;
  banner: string;
  session_date: Date;
}

