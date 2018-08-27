<template>
  <app-navigation></app-navigation>
</template>

<script>
import { StackNavigator } from 'vue-native-router'
import LoginScreen from './src/screens/Login'
import SignUpScreen from './src/screens/SignUp'
import HomeScreen from './src/screens/Home'

const AppNavigation = StackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Login',
  }
);
export default {
    components: { AppNavigation }
}
</script>
