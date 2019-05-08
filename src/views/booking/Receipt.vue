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
            <v-flex md6 xs12 v-if="permission">
              <v-card color="blue" dark>
                <v-card-title primary-title>
                  <div class="headline">Booking #{{id}} Receipt ({{booking.night}} Nights)</div>
                </v-card-title>
                <v-list light>
                  <v-list-tile v-for="d in booking.detail" :key="d.id">
                    <v-list-tile-content>
                      <v-list-tile-title>Room {{d.room.room_number}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{d.room.type.title}}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action>{{d.room.price}} THB</v-list-tile-action>
                    </v-list-tile-action>
                  </v-list-tile>

                  <fragment v-for="d in booking.detail" :key="d.id">
                    <fragment v-for="o in d.order_set" :key="o.id">
                      <v-list-tile v-for="s in o.service" :key="s.id">
                        <v-list-tile-content>
                          <v-list-tile-title>{{s.title}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{s.type.title}}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                          <v-list-tile-action>{{s.price}} THB</v-list-tile-action>
                        </v-list-tile-action>
                      </v-list-tile>
                    </fragment>
                  </fragment>

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
            <v-flex v-else>
              <h1 class="red--text">Permission Denied</h1>
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
      booking = booking.reduce((a, b) => a + (b.room.price * this.booking.night), 0)

      let service = this.booking.detail || []
      service = service.reduce((a, b) => a + b.order_set.reduce((a, b) => a + b.total_price, 0), 0)

      return booking + service
    },
    permission () {
      return !(Object.entries(this.booking).length === 0 && this.booking.constructor === Object)
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
