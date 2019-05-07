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
                  <v-toolbar-title>Edit Profile</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="firstname"
                      label="Firstname"
                      type="text"
                      v-model="form.first_name"
                      :error-messages="error.first_name"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-file-signature"
                      name="lastname"
                      label="Lastname"
                      type="text"
                      v-model="form.last_name"
                      :error-messages="error.last_name"
                    ></v-text-field>
                    <v-text-field
                      prepend-icon="fa-phone"
                      name="phone"
                      mask="phone"
                      label="Phone Number"
                      type="text"
                      v-model="form.phone_number"
                      :error-messages="error.phone_number"
                    ></v-text-field>
                    <v-textarea
                      prepend-icon="fa-address-card"
                      auto-grow
                      name="address"
                      label="Address"
                      rows="2"
                      v-model="form.address"
                      :error-messages="error.address"
                    ></v-textarea>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="error" to="/profile">
                    <v-icon left dark>fa-times</v-icon>Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="doUpdateProfile">
                    Save
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
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Profile',
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      form: {}
    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info,
      error: state => state.user.error
    })
  },
  methods: {
    ...mapWaitingActions('user', {
      doGetInfo: 'loading user'
    }),
    ...mapMutations({
      setUpdateForm: 'user/setUpdateForm'
    }),
    ...mapActions({
      doUpdateProfile: 'user/doUpdateProfile'
    })
  },
  beforeMount () {
    this.doGetInfo().then(() => {
      this.form = this.info

      delete this.form.username
      delete this.form.email
      delete this.form.gender
    })
  },
  watch: {
    form: {
      handler (v) {
        this.setUpdateForm(v)
      },
      deep: true }
  }
}
</script>
