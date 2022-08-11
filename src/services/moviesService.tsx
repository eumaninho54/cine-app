import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { KEY_THEMOVIEDB } from '@env'
import { dataMoviesModel } from "../models/moviesModel";
import { genreMovie, genreMovieProps } from "../models/enumGenreMovie";
import { userProps } from "../models/authModel";

class MoviesService {
  private baseURL = "https://api.themoviedb.org/3"

  constructor() { }

  async searchMovie(textSearch: string): Promise<dataMoviesModel[] | null>{
    let req: dataMoviesModel[] | null = null

    await axios.request({
      method: "get",
      url: this.baseURL + "/search/movie?api_key=" + KEY_THEMOVIEDB + "&query=" + textSearch + "&page=1"
    }).then(({data}) => { 
      const dataReq = data['results'].filter((item: dataMoviesModel) => {
        return item.backdrop_path != null && item.poster_path != null
      })

      req = dataReq.map((
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
          banner: this.getBanner(backdrop_path),
          genre_ids: genre_ids.map((genre) => genreMovie[genre as keyof genreMovieProps]),
          overview: overview,
          popularity: popularity,
          poster_path: this.getPosterPath(poster_path),
          release_date: release_date,
          title: title,
          vote_average: vote_average
        }
      ))
    }).catch(() => {
      req = null
    })

    return req
  }

  async getMovie(category: "trending" | "nowPlaying" | "popular" | "features"): Promise<dataMoviesModel[] | null> {
    const categorySelected = this.switchCategory(category)
    let req: dataMoviesModel[] | null = null

    await axios.request({
      method: "get",
      url: this.baseURL + categorySelected 
    }).then(({data}) => { 
      const dataReq = data['results'].filter((item: dataMoviesModel) => {
        return item.backdrop_path != null && item.poster_path != null
      })

      req = dataReq.map((
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
          banner: this.getBanner(backdrop_path),
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
  
  private switchCategory(category: string){
    switch (category) {
      case "trending":
          return "/trending/movie/day?api_key=" + KEY_THEMOVIEDB
      case "nowPlaying":
          return "/movie/now_playing?api_key=" + KEY_THEMOVIEDB
      case "popular":
          return "/movie/popular?api_key=" + KEY_THEMOVIEDB
      case "features":
          return "/movie/upcoming?api_key=" + KEY_THEMOVIEDB + "&region=br" + "&page=1"
    }
  }

  private getBackdropPath(path: string){
    return `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`
  }

  private getPosterPath (path: string){
    return `https://image.tmdb.org/t/p/w440_and_h660_face${path}`
  }

  private getBanner (path: string){
    return `https://image.tmdb.org/t/p/w400${path}`
  }
}

const moviesService = new MoviesService()
export default moviesService