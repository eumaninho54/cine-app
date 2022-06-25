import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { KEY_THEMOVIEDB } from '@env'
import { dataMoviesModel } from "../models/moviesModel";

class MoviesService {
  private baseURL = "https://api.themoviedb.org/3"

  constructor() { }

  async getTrending(): Promise<dataMoviesModel[] | null> {
    let req: dataMoviesModel[] | null = null

    await axios.request({
      method: "get",
      url: this.baseURL + "/trending/movie/day?api_key=" + KEY_THEMOVIEDB
    }).then((res) => { req = res.data["results"] })
      .catch((res) => { req = null })

    return req
  }
}

const moviesService = new MoviesService()
export default moviesService