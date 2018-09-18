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

const AppNavigation = StackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
    Account: AccountScreen,
    Bins: BinsScreen
  },
  {
    initialRouteName: 'Login',
  }
);
export default {
    components: { AppNavigation }
}
</script>
