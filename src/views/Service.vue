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
                  <v-flex xs12 md6 v-for="service in filteredService" :key="service.id">
                    <v-card color="blue" dark>
                      <v-card-title primary-title>
                        <div>
                          <div class="headline">{{service.type}} - {{service.title}}</div>
                          <span>Price : {{service.price}}</span>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn color="success" dark @click="addService(service)">Add to list</v-btn>
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
                    <v-list-tile v-for="(service, index) in cart" :key="service.id">
                      <v-list-tile-content>
                        <v-list-tile-title>{{service.title}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{service.type}}</v-list-tile-sub-title>
                      </v-list-tile-content>

                      <v-list-tile-action>{{service.price}} THB</v-list-tile-action>
                      <v-list-tile-action>
                        <v-btn icon ripple>
                          <v-icon color="grey lighten-1" @click="deleteService(index)">fa-trash</v-icon>
                        </v-btn>
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
                    <v-spacer></v-spacer>
                    <v-btn
                      color="success"
                      :disabled="cart.length === 0"
                      @click="doSubmitOrder(id)"
                    >Order</v-btn>
                  </v-card-actions>
                </v-card>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-bottom-nav :active.sync="type" :value="true" :fixed="true" :app="true">
        <v-btn color="teal" flat value="all">
          <span>All Services</span>
          <v-icon>fa-globe</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="Food">
          <span>Foods</span>
          <v-icon>fa-pizza-slice</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="Service">
          <span>Services</span>
          <v-icon>fa-concierge-bell</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-wait>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'Service',
  props: ['id'],
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      type: 'all'
    }
  },
  computed: {
    ...mapState({
      services: state => state.service.services.sort((a, b) => a.type < b.type),
      cart: state => state.service.cart
    }),
    total () {
      let total = this.cart.reduce((a, b) => a + b.price, 0)
      return total
    },
    filteredService () {
      return this.type === 'all' ? this.services : this.services.filter(s => s.type === this.type)
    }
  },
  methods: {
    ...mapWaitingActions('service', {
      getServices: 'loading services'
    }),
    ...mapActions({
      addService: 'service/addService',
      deleteService: 'service/deleteService',
      doSubmitOrder: 'service/doSubmitOrder'
    })
  },
  beforeMount () {
    this.getServices()
  }
}
</script>
