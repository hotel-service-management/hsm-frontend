<template>
  <v-app>
    <nav-bar/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Payment completed. Thank you!</v-toolbar-title>
              </v-toolbar>
              <v-container>
                <h2
                  style="color:red; font-size: 2em; text-align:center;"
                >Please check-in before 2 PM.</h2>Note:
                <ol>
                  <li>Identification documents are required in the check-in process; otherwise this booking will be void.</li>
                  <li>If you've selected Cash method please pay at Check-in counter</li>
                </ol>
              </v-container>
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
