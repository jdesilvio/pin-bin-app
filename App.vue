<template>
  <app-navigation></app-navigation>
</template>

<script>
import { StackNavigator } from 'vue-native-router'
import LoginScreen from './Login'
import SignUpScreen from './SignUp'

const AppNavigation = StackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'Login',
  }
);
export default {
    components: { AppNavigation }
}
</script>
