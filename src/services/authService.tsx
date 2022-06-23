import axios from "axios"
import * as SecureStore from 'expo-secure-store';

class AuthService {
  private baseURL = "http://192.168.1.104:3333"

  constructor() { }

  async verifyToken(token: string): Promise<boolean> {
    const req = await axios({
      method: "get",
      url: this.baseURL + "/user",
      headers: { "x-access-token": token }
    }).then(() => true)
      .catch(() => false)

    return req

  }

  async singIn(email: string, password: string) {
    await axios({
      method: "post",
      url: this.baseURL + "/login",
      data: {
        email: email,
        password: password
      }
    }).then(async (res) => {
      await SecureStore.setItemAsync("token", res.data["token"])
    }).catch(async () => {
      await SecureStore.deleteItemAsync("token")
    })
  }

  async singUp(email: string, password: string): Promise<boolean> {
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
}

const authService = new AuthService()
export default authService