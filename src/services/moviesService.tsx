import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { KEY_THEMOVIEDB } from '@env'
import { dataMoviesModel } from "../models/moviesModel";

class MoviesService {
  private baseURL = "https://api.themoviedb.org/3"

  constructor() { }

  async getTrending() {
    const req = await axios({
      method: "get",
      url: this.baseURL + "/trending/movie/day?api_key=" + KEY_THEMOVIEDB
    })

    return req.data["results"]
  }
}

const moviesService = new MoviesService()
export default moviesService