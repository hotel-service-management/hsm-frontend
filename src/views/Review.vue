<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading bookings">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>

        <v-container fill-height v-if="bookings.length == 0">
          <v-container fill-height>
            <v-layout align-center>
              <v-flex>
                <h3 class style="font-size: 8em; color:#43A3F5">Sorry</h3>
                <span
                  class="subheading"
                  v-show="bookings.length == 0"
                >Bookings are required to write a review.</span>
                <div class="title mb-3">Create your first booking now!</div>
                <v-btn color="info" to="/booking/create">New Booking</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-container>
          <v-container fluid v-show="bookings.length > 0">
          <v-container fill-height>
            <v-container fill-height>
              <v-layout align-center>
                <v-flex>
                  <h3 class style="color: #43A3F5;font-size : 7em; ">Tell Us</h3>
                  <!-- <v-divider class="my-3"></v-divider> -->
                  <div
                    class="title mb-2"
                    style="font-size : 10em; color :rgb(132, 124, 136)"
                  >What do you think? You can provide us your feedback.</div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-container>
          </v-container>
        <v-container fluid v-show="bookings.length > 0">
          <v-layout row>
            <h1>Your Reviews</h1>
          </v-layout>
          <v-container fluid grid-list-lg fill-height v-show="bookings.length > 0">
            <v-layout row wrap>
              <fragment v-for="booking in bookings" :key="booking.id">
                <v-flex xs12 md4>
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">Booking #{{ booking.id }}</div>
                        <span>
                          Date : {{ booking.start_date }} to {{ booking.end_date }}
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
                            <v-icon right left>fa-edit</v-icon>Edit review
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
                        <div class="headline">We are waiting a feedback from you!</div>
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
