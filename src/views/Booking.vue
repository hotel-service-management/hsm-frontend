<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 md4 v-for="booking in bookings" :key="booking.id">
            <v-card color="blue" dark>
              <v-card-title primary-title>
                <div>
                  <div class="headline">Booking #{{ booking.id }}</div>
                  <span>
                    Date {{ booking.start_date }} to {{ booking.end_date }}
                    <br>
                    Total Room : {{ booking.detail.length }}
                  </span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn color="success" dark :to="`/booking/detail/${booking.id}`">Detail</v-btn>
                <v-btn color="info" dark>Receipt</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import store from '@/store/index'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      bookings: state => state.booking.bookings
    })
  },
  beforeMount () {
    store.dispatch('booking/getBooking')
  }
}
</script>
