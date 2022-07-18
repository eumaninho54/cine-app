import axios from "axios"
import * as SecureStore from 'expo-secure-store';
import { signInProps, userProps } from "../models/authModel";

class AuthService {
  private baseURL = "http://192.168.1.105:3333"

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

  async changeFavorite(movieSelected: { isSelected: boolean, idMovie: number }, idUser: number): Promise<userProps | null> {
    const req = await axios({
      method: "patch",
      url: this.baseURL + `/user/favorite/${idUser}`,
      data: {
        movieSelected: movieSelected
      }
    }).then((res) => res.data)
      .catch(() => null)

    return req
  }
}

const authService = new AuthService()
export default authService