<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height id="register-page">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-form ref="form" lazy-validation>
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Register</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                    v-model="register.username"
                    prepend-icon="fa-user"
                    name="username"
                    label="Username"
                    type="text"
                    :error-messages="error.username"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-inbox"
                    name="email"
                    label="Email Address"
                    type="email"
                    v-model="register.email"
                    :error-messages="error.email"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="register.password"
                    :error-messages="error.password || confirmPasswordError"
                  />
                  <v-text-field
                    prepend-icon="fa-lock"
                    name="password"
                    label="Confirm Password"
                    type="password"
                    v-model="register.cpassword"
                    :error-messages="error.cpassword || confirmPasswordError"
                  />
                  <v-text-field
                    prepend-icon="fa-file-signature"
                    name="first_name"
                    label="First name"
                    type="text"
                    v-model="register.first_name"
                    :error-messages="error.first_name"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-file-signature"
                    name="last_name"
                    label="Last name"
                    type="text"
                    v-model="register.last_name"
                    :error-messages="error.last_name"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="fa-phone"
                    name="phone"
                    label="Phone number"
                    type="text"
                    v-model="register.phone"
                    :error-messages="error.phone"
                  ></v-text-field>
                  <v-textarea
                    prepend-icon="fa-address-card"
                    auto-grow
                    name="address"
                    label="Address"
                    v-model="register.address"
                    :error-messages="error.address"
                    rows="2"
                  ></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="doRegister" :disabled="confirmPassword">
                    Register
                    <v-icon right dark>fa-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'

export default {
  data: () => {
    return {
      register: {
        username: '',
        email: '',
        password: '',
        cpassword: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: ''
      }
    }
  },
  computed: {
    ...mapState({
      'error': state => state.user.error
    }),
    confirmPassword () {
      return this.register.password !== this.register.cpassword
    },
    confirmPasswordError () {
      return this.confirmPassword ? ['Password Not Match!'] : []
    }
  },
  methods: {
    ...mapActions({
      doRegister: 'user/doRegister'
    })
  },
  watch: {
    register: {
      handler (val) {
        store.commit('user/setRegisterForm', val)
      },
      deep: true
    }
  },
  beforeMount () {
    store.commit('user/setError', {})
  },
  beforeDestroy () {
    store.commit('user/setError', {})
  }
}
</script>

<style>
#register-page {
  background-image: url("../assets/background.jpg");
}
</style>
