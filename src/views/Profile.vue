<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading user">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8 lg6>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Your Profile</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-list light>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="lighten-1">fa-user</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{info.username}}</v-list-tile-title>
                        <v-list-tile-sub-title>Username</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="lighten-1">fa-address-card</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{info.email}}</v-list-tile-title>
                        <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="lighten-1">fa-file-signature</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{info.first_name}} {{info.last_name}}</v-list-tile-title>
                        <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="lighten-1">fa-address-card</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{info.address}}</v-list-tile-title>
                        <v-list-tile-sub-title>Address</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="lighten-1">fa-phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{info.phone_number}}</v-list-tile-title>
                        <v-list-tile-sub-title>Phone Number</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" to="/booking">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="warning" to="/profile/password">
                    Change Password
                    <v-icon right dark>fa-lock</v-icon>
                  </v-btn>
                  <v-btn color="success" to="/profile/edit">
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
  name: 'Profile',
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  },
  methods: {
    ...mapWaitingActions('user', {
      doGetInfo: 'loading user'
    })
  },
  beforeMount () {
    this.doGetInfo()
  }
}
</script>
