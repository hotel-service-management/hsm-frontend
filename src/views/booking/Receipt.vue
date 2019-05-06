<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid fill-height>
          <v-layout justify-center align-center>
            <v-flex md6 xs12>
              <v-card color="blue" dark>
                <v-card-title primary-title>
                  <div class="headline">Booking #{{id}} Receipt</div>
                </v-card-title>
                <v-list light>
                  <v-list-tile v-for="d in booking.detail" :key="d.id">
                    <v-list-tile-content>
                      <v-list-tile-title>Room {{d.room.room_number}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{d.room.type}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action>{{d.room.price}} THB</v-list-tile-action>
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
                <v-card-actions>
                  <v-btn color="success" to="/booking">Back</v-btn>
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
  name: 'Receipt',
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState({
      booking: state => state.booking.booking
    }),
    total () {
      let booking = this.booking.detail || []
      return booking.reduce((a, b) => a + b.room.price, 0)
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
