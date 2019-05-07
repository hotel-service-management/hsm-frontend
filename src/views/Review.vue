<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading bookings">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row>
            <h1>Your Reviews</h1>
          </v-layout>
          <v-container fluid grid-list-lg fill-height>
            <v-layout row wrap>
              <fragment v-for="booking in bookings" :key="booking.id">
                <v-flex xs12 md4>
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
                  </v-card>
                </v-flex>
                <v-flex xs12 md6 v-if="booking.review !== null">
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{booking.review.title}}</div>
                        <span>
                          Score : {{booking.review.score}}/10
                          <br>
                          {{booking.review.description}}
                          <br>
                          <v-btn color="success" :to="`/review/edit/${booking.id}`">
                            <v-icon right left>fa-edit</v-icon>Edit a review
                          </v-btn>
                        </span>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6 v-else>
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">We are waiting feedback from you~!</div>
                        <span>
                          <v-btn color="success" :to="`/review/create/${booking.id}`">
                            <v-icon right left>fa-edit</v-icon>Write a review
                          </v-btn>
                        </span>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </fragment>
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
