import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { KEY_THEMOVIEDB } from '@env'
import { dataMoviesModel } from "../models/moviesModel";
import { genreMovie, genreMovieProps } from "../models/enumGenreMovie";

class MoviesService {
  private baseURL = "https://api.themoviedb.org/3"

  constructor() { }

  async getTrending(): Promise<dataMoviesModel[] | null> {
    let req: dataMoviesModel[] | null = null

    await axios.request({
      method: "get",
      url: this.baseURL + "/trending/movie/day?api_key=" + KEY_THEMOVIEDB
    }).then(({data}) => { 
      req = data['results'].map((
        {
          id,
          original_title,
          backdrop_path,
          genre_ids,
          overview,
          popularity,
          poster_path,
          release_date,
          title,
          vote_average
        } : dataMoviesModel
      ) => (
        {
          id: id,
          original_title: original_title,
          backdrop_path: this.getBackdropPath(backdrop_path),
          genre_ids: genre_ids.map((genre) => genreMovie[genre as keyof genreMovieProps]),
          overview: overview,
          popularity: popularity,
          poster_path: this.getPosterPath(poster_path),
          release_date: release_date,
          title: title,
          vote_average: vote_average
        }
      ))
    })
      .catch((res) => { req = null })

    return req
  }

  private getBackdropPath(path: string){
    return `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`
  }

  private getPosterPath (path: string){
    return `https://image.tmdb.org/t/p/w440_and_h660_face${path}`
  }
}

const moviesService = new MoviesService()
export default moviesService