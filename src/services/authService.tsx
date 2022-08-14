import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { signInProps, userProps } from "../models/authModel";
import { dataMoviesToBuy, dataMoviesBag, dataMoviesModel } from "../models/moviesModel";

class AuthService {
  private baseURL = "http://192.168.1.106:3333"

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
    const req = await axios.request<signInProps>({
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

  async changeFavorite(movieSelected: { isSelected: boolean, dataMovie: dataMoviesModel }, token: string): Promise<{favorites: dataMoviesModel[]} | null> {
    const req = await axios({
      method: "patch",
      url: this.baseURL + "/user/favorite/change/",
      data: movieSelected,
      headers: { "x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async getFavorites(token: string): Promise<dataMoviesModel[] | null>{
    const req = await axios({
      method: "get",
      url: this.baseURL + `/user/favorite`,
      headers: {"x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }

  async buyTicket(movieBuy: dataMoviesToBuy[], token: string): Promise<userProps | null> {
    let dataMovie: dataMoviesBag[] = []
    movieBuy.forEach((movie) => {
      dataMovie.push({
        id: movie.id,
        banner: movie.banner,
        session_date: new Date(movie.dateSession),
        title: movie.title
      })
    })

    const req = await axios({
      method: "post",
      url: this.baseURL + "/user/ticket/buy",
      data: dataMovie,
      headers: { "x-access-token": token }
    }).then((user) => user.data)
      .catch(() =>  null)

    return req
  }

  async getTickets(token: string): Promise<dataMoviesBag[] | null>{
    const req = await axios({
      method: "get",
      url: this.baseURL + `/user/ticket`,
      headers: {"x-access-token": token }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }
}

const authService = new AuthService()
export default authService