<template>
  <app-navigation></app-navigation>
</template>

<script>
import { StackNavigator } from 'vue-native-router'
import LoginScreen from './src/screens/Login'
import SignUpScreen from './src/screens/SignUp'
import HomeScreen from './src/screens/Home'
import AccountScreen from './src/screens/Account'
import BinsScreen from './src/screens/Bins'
import PinsScreen from './src/screens/Pins'
import BinViewerScreen from './src/screens/BinViewer'

import api from './src/api'
import store from './src/store'

const initialRouteName = store.state.jwt ? 'Home' : 'Login'
const AppNavigation = StackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    Account: AccountScreen,
    Bins: BinsScreen,
    Pins: PinsScreen,
    BinViewer: BinViewerScreen
  },
  {
    initialRouteName: initialRouteName
  }
)

export default {
  components: { AppNavigation }
}
</script>
