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
            <v-flex xs12 md12>
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
                      <v-card-actions>Order Available in Booking Detail</v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
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
  name: 'Service',
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
      services: state => state.service.services.sort((a, b) => a.type < b.type)
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
