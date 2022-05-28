import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactotronModule, { ReactotronReactNative } from 'reactotron-react-native';
import { Reactotron } from 'reactotron-core-client';

declare global {
  interface Console {
    tron: Reactotron<ReactotronReactNative> & ReactotronReactNative
  }
}

//adb reverse tcp:9090 tcp:9090

export const reactotron = ReactotronModule
.setAsyncStorageHandler!(AsyncStorage)
  .configure()
  .useReactNative()
  .connect();