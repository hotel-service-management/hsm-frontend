<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <v-container fluid>
        <v-layout row>
          <h1>Create Booking</h1>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm12 md6 pa-2>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  title="Check-in Date"
                  label="Check-in Date"
                  prepend-icon="fa-calendar-alt"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm12 md6 pa-2>
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  title="Check-out Date"
                  label="Check-out Date"
                  prepend-icon="fa-calendar-alt"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md6 v-for="i in room" :key="i">
            <v-layout row>
              <v-flex pa-1>
                <h2>Room #{{i}}</h2>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 md6 pa-1>
                <v-select :items="items" label="Room Type" title="Room Type" prepend-icon></v-select>
              </v-flex>
              <v-flex xs12 md6 pa-1>
                <v-select :items="items" label="Available Room" title="Available Room"></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import { mapState } from 'vuex'
// import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
// import Loading from '@/components/Loading.vue'

export default {
  components: {
    NavBar
  },
  data: () => {
    return {
      room: 2,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
