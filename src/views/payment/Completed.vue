<template>
  <v-app>
    <nav-bar/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Payment Completed, Thank You!</v-toolbar-title>
              </v-toolbar>
              <v-container
                text-xs-center
                style="color:red; font-size: 2em"
              >Please Check-in before 14:00</v-container>
              <v-container
                text-xs-center
              >Bring Your indentication documentation when check in otherwise check-in will be void</v-container>
              <v-card-actions>
                <v-layout justify-center>
                  <v-btn color="success" to="/booking">
                    <v-icon left dark>fa-long-arrow-alt-left</v-icon>Back
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>
