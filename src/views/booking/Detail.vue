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
            <h1>Booking Detail #{{booking.id}}</h1>
          </v-layout>
          <v-layout row>
            <h2>{{booking.start_date}} to {{booking.end_date}}</h2>
          </v-layout>
          <v-container fluid grid-list-lg>
            <v-flex xs12 lg12>
              <v-layout row wrap>
                <v-flex xs12 md4 v-for="room in booking.detail" :key="room.id">
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Room #{{ room.room.room_number }}</div>
                        <span>
                          Floor : {{room.room.floor}}
                          <br>
                          Price : {{room.room.price}}
                          <br>
                          Type : {{room.room.type.title}}
                        </span>
                      </div>
                    </v-card-title>
                    <v-card-actions v-if="booking.status === 'Checked In'">
                      <v-btn color="success" dark :to="`/booking/privilege/${room.id}`">Privileges</v-btn>
                      <v-btn color="success" dark :to="`/service/${room.id}`">Services</v-btn>
                    </v-card-actions>
                    <v-card-actions v-else>
                      <p>Check-in is required to use our services.</p>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
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
