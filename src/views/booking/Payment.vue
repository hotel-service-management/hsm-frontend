<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row>
            <h1>Pay Booking</h1>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Payment Detail</div>
                  </v-card-title>

                  <v-container fluid style="background-color: white;">
                    <v-flex xs12 md12>
                      <v-select
                        :items="['Cash', 'Credit Card']"
                        label="Payment Method"
                        title="Payment Method"
                        light
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md12>
                      <v-text-field
                        mask="credit-card"
                        label="Credit Card"
                        title="Credit Card"
                        light
                      />
                    </v-flex>
                  </v-container>

                  <v-layout row justify-center>
                    <v-btn color="success">Pay</v-btn>
                  </v-layout>
                </v-card>
              </v-container>
            </v-flex>
            <v-flex xs12 sm12 md6 pa-2>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Order Summary</div>
                  </v-card-title>
                  <v-list light>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Room 3001</v-list-tile-title>
                        <v-list-tile-sub-title>3 Nights</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action>6000 THB</v-list-tile-action>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Room 2001</v-list-tile-title>
                        <v-list-tile-sub-title>3 Nights</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>2400 THB</v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Total</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>8400 THB</v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-container>
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
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      booking: state => state.booking.booking
    })
  },
  methods: {
    ...mapWaitingActions('booking', {
      getBooking: 'loading booking'
    })
  },
  beforeMount () {
    this.getBooking(this.id)
  }
}
</script>
