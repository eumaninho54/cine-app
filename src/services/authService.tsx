import axios from "axios"
import { showMessage } from "react-native-flash-message"
import * as SecureStore from 'expo-secure-store';

class AuthService {
  private baseURL = "http://192.168.1.100:3333"

  constructor() { }

  async verifyToken(token: string): Promise<boolean>{
    const req = await axios({
      method: "get",
      url: this.baseURL + "/user",
      headers: { "x-access-token": token}
    }).then(() => {
      console.tron.log!("valido")
      return true
    }).catch((err) => {
      console.tron.log!('err')
      return false
    })

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
    }).then(async(res) => {
      await SecureStore.setItemAsync("token", res.data["token"])
    }).catch(() => {
      showMessage({
        message: "ERRO PORRA",
        icon: 'warning',
        type: "warning"
      })
    })
  }
}

const authService = new AuthService()
export default authService