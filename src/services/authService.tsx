import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { dataMoviesToBuy, dataMoviesBag, dataMoviesModel } from "../models/moviesModel";
import { userProps } from "../models/storeModel";

class AuthService {
  private baseURL = "http://192.168.1.108:3333"

  constructor() { }

  async verifyToken(token: string): Promise<userProps | null> {
    const req = await axios.request<userProps>({
      method: "get",
      url: this.baseURL + "/user",
      headers: { "x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async signIn(email: string, password: string) {
    const req = await axios.request<userProps>({
      method: "post",
      url: this.baseURL + "/login",
      data: {
        email: email,
        password: password
      }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async signUp(email: string, password: string): Promise<boolean> {
    const req = await axios({
      method: "post",
      url: this.baseURL + "/user/new",
      data: {
        email: email,
        password: password,
        username: email.split("@")[0]
      }
    }).then(() => true)
      .catch(() => false)

    return req
  }

  async changeFavorite(movieSelected: dataMoviesModel, token: string): Promise<dataMoviesModel[] | null> {
    const req = await axios({
      method: "patch",
      url: this.baseURL + "/user/favorite/change/",
      data: {
        dataMovie: {
          id: movieSelected.id,
          title: movieSelected.title,
          backdrop_path: movieSelected.backdrop_path,
          genre_ids: movieSelected.genre_ids,
          original_title: movieSelected.original_title,
          overview: movieSelected.overview,
          popularity: movieSelected.popularity,
          poster_path: movieSelected.poster_path,
          release_date: movieSelected.release_date,
          vote_average: movieSelected.vote_average
        },
        isSelected: movieSelected.isFavorite
      },
      headers: { "x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async getFavorites(token: string): Promise<dataMoviesModel[] | null> {
    let req: dataMoviesModel[] | null = null

    await axios({
      method: "get",
      url: this.baseURL + `/user/favorite`,
      headers: { "x-access-token": token }
    }).then((res) => {
      req = res.data.map(
        (
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
          }: dataMoviesModel
        ) => (
          {
            id: id,
            original_title: original_title,
            backdrop_path: backdrop_path,
            banner: backdrop_path,
            genre_ids: genre_ids,
            overview: overview,
            popularity: popularity,
            poster_path: poster_path,
            release_date: release_date,
            title: title,
            vote_average: vote_average,
            isFavorite: true
          }
        )
      )
    })
      .catch(() => req = null)

    return req
  }

  async buyTicket(movieBuy: dataMoviesToBuy[], token: string): Promise<userProps | null> {
    let dataMovie: dataMoviesBag[] = []
    movieBuy.forEach((movie) => {
      dataMovie.push({
        id: movie.id,
        banner: movie.banner,
        session_date: new Date(movie.session_date),
        title: movie.title
      })
    })

    const req = await axios({
      method: "post",
      url: this.baseURL + "/user/ticket/buy",
      data: dataMovie,
      headers: { "x-access-token": token }
    }).then((user) => user.data)
      .catch(() => null)

    return req
  }

  async getTickets(token: string): Promise<dataMoviesBag[] | null> {
    const req = await axios({
      method: "get",
      url: this.baseURL + `/user/ticket`,
      headers: { "x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async changeUser(token: string, userData: userProps): Promise<userProps | null> {
    const req = await axios({
      method: "put",
      url: this.baseURL + `/user/change`,
      data: userData,
      headers: { "x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }
}

const authService = new AuthService()
export default authService