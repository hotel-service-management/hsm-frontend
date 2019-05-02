<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading bookings">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid grid-list-lg fill-height>
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
                  <v-btn color="#77C6FF">Receipt</v-btn>
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
    ...mapWaitingActions('booking', {
      getBookings: 'loading bookings'
    })
  },
  beforeMount () {
    this.getBookings()
  }
}
</script>
