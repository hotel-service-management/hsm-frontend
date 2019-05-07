<template>
  <v-app>
    <v-content id="login-page">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="fa-user"
                    name="email"
                    v-model="email"
                    label="Email Address"
                    type="text"
                    :error-messages="error.email"
                  />
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    :error-messages="error.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/register">
                  Register
                  <v-icon right dark>fa-user-plus</v-icon>
                </v-btn>
                <v-btn color="success" @click="doLogin">
                  Login
                  <v-icon right dark>fa-sign-in-alt</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapActions, mapState } from 'vuex'
import store from '@/store/index'

const instance = axios.create()

instance.interceptors.response.use(response => {
  return { error: false, ...response.data }
}, error => {
  return { error: true, ...error.response.data }
})

export default {
  data: function () {
    return {

    }
  },
  computed: {
    email: {
      get () {
        return this.$store.state.user.email
      },
      set (value) {
        store.commit('user/setEmail', value)
      }
    },
    password: {
      get () {
        return this.$store.state.user.password
      },
      set (value) {
        store.commit('user/setPassword', value)
      }
    },
    ...mapState({
      'error': state => state.user.error
    })
  },
  methods: {
    ...mapMutations({
      setToken: 'setToken'
    }),
    ...mapActions({
      doLogin: 'user/doLogin'
    })
  },
  beforeMount () {
    store.commit('user/setError', {})
  },
  beforeDestroy () {
    store.commit('user/setError', {})
  }
}
</script>

<style scoped>
#login-page {
  background-image: url("../assets/background.jpg");
}
</style>
