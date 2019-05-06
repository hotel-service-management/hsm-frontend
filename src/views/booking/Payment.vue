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
            <h1>Booking Payment</h1>
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
                        v-model="form.type"
                        light
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md12 v-if="form.type === 'Credit Card'">
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
                    <div class="headline">Booking Summary</div>
                  </v-card-title>
                  <v-list light>
                    <v-list-tile v-for="room in booking.detail" :key="room.id">
                      <v-list-tile-content>
                        <v-list-tile-title>Room {{room.room.room_number}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{booking.night}} Nights</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action>{{room.room.price * booking.night}} THB</v-list-tile-action>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Total</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>{{total}} THB</v-list-tile-action>
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
  data: () => {
    return {
      form: {
        type: 'Cash'
      }
    }
  },
  computed: {
    ...mapState({
      booking: state => state.booking.booking
    }),
    total () {
      let booking = this.booking.detail || []
      return booking.reduce((a, b) => a + (b.room.price * this.booking.night), 0)
    }
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
