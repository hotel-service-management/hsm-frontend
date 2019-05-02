<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 md4>
            <v-card color="blue">
              <v-card-title primary-title>
                <div>
                  <div class="headline">Unlimited music now</div>
                  <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from '@/store/index'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  beforeMount () {
    store.dispatch('booking/getBooking')
  }
}
</script>
