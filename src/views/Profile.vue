<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading profile">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Your Profile</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="fa-user"
                      name="username"
                      label="Username"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="password"
                      label="Password"
                      type="password"
                    />
                    <v-text-field
                      prepend-icon="fa-lock"
                      name="cpassword"
                      label="Confirm Password"
                      type="password"
                    />
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="firstname"
                      label="Firstname"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="lastname"
                      label="Lastname"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-phone"
                      name="phone"
                      label="Phone Number"
                      type="text"
                    ></v-text-field>
                    <v-textarea
                      prepend-icon="fa-address-card"
                      auto-grow
                      name="address"
                      label="Address"
                      rows="2"
                    ></v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/booking">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success">
                    Edit
                    <v-icon right dark>fa-edit</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      bookings: state => state.booking.bookings
    })
  },
  methods: {
    ...mapWaitingActions('profile', {
      getBookings: 'loading profile'
    })
  },
  beforeMount () {
    this.getBookings()
  }
}
</script>
