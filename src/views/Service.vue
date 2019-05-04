<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading services">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row>
            <h1>Available Services</h1>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md8>
              <v-container fluid grid-list-lg fill-height>
                <v-layout row wrap>
                  <v-flex xs12 md4 v-for="service in services" :key="service.id">
                    <v-card color="blue" dark>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{service.type}} - {{service.title}}</div>
                          <span>Price : {{service.price}}</span>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn color="success" dark :to="`/booking/detail/${service.id}`">Order</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs12 md4>
              <v-container fluid>
                <v-card color="blue" dark>
                  <v-card-title primary-title>
                    <div class="headline">Order Summary</div>
                  </v-card-title>
                  <v-list light>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>High Speed Wifi</v-list-tile-title>
                        <v-list-tile-sub-title>Service</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>
                        <v-list-tile-action>2000 THB</v-list-tile-action>
                      </v-list-tile-action>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>American Breakfast</v-list-tile-title>
                        <v-list-tile-sub-title>Food</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>240 THB</v-list-tile-action>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>Total</v-list-tile-title>
                      </v-list-tile-content>

                      <v-list-tile-action>2240 THB</v-list-tile-action>
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
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      services: state => state.service.services
    })
  },
  methods: {
    ...mapWaitingActions('service', {
      getServices: 'loading services'
    })
  },
  beforeMount () {
    this.getServices()
  }
}
</script>
