<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading bookings">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content id="booking">
        <v-container fluid>
          <v-container fill-height>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class style="color: #43A3F5;font-size : 6em; ">Welcome</h3>
                  <span
                    class="subheading"
                    v-show="bookings.length == 0"
                  >Seems like you do not have any booking yet.</span>
                  <!-- <v-divider class="my-3"></v-divider> -->
                  <div
                    class="title mb-3"
                    style="font-size : 10em;"
                    v-if="bookings.length == 0"
                  >Create your first booking now!</div>
                  <div class="title mb-3" style="font-size : 10em;" v-else>Create your booking now!</div>
                  <v-btn color="info" to="/booking/create">New Booking</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-container>
          <v-container fluid grid-list-lg fill-height>
            <v-layout row wrap>
              <v-flex xs12 sm6 md4 v-for="booking in bookings" :key="booking.id">
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Booking #{{ booking.id }}</div>
                      <span>
                        Date : {{ booking.start_date }} to {{ booking.end_date }}
                        <br>
                        Total Room : {{ booking.detail.length }}
                        <br>
                        Status : {{booking.status}}
                      </span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="success" dark :to="`/booking/detail/${booking.id}`">Detail</v-btn>
                    <v-btn color="#77C6FF" :to="`/booking/receipt/${booking.id}`">Receipt</v-btn>
                    <v-btn
                      color="error"
                      :to="`/booking/checkout/${booking.id}`"
                      v-if="booking.status === 'Checked In'"
                    >Check out</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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

<style scope>
#booking {
  background-image: url("../assets/background.jpg");
  height: 100vh;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: center;
}
.subheading {
  font-size: 3em;
}
</style>
