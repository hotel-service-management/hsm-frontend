<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading room">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-alert
            :value="duplicated"
            color="error"
            icon="warning"
            outline
          >You cannot book duplicated room</v-alert>
          <v-alert
            row
            :value="dateChecker"
            color="error"
            icon="fa-exclamation-triangle"
            outline
          >Check-in date must come before check-out date.</v-alert>
          <v-layout row>
            <h1>Create Booking</h1>
          </v-layout>

          <!-- End Error -->
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 pa-2 v-if="error.error">
              <h2 v-for="e in error.error" :key="e" color="red">{{e}}</h2>
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
                v-model="startDateMenu"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    title="Check-in Date"
                    label="Check-in Date"
                    prepend-icon="fa-calendar-alt"
                    readonly
                    v-on="on"
                    v-model="form.start_date"
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="startDateMenu = false"
                  v-model="form.start_date"
                  @change="dateChange"
                  :allowed-dates="allowedDates"
                ></v-date-picker>
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
                v-model="endDateMenu"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    title="Check-out Date"
                    label="Check-out Date"
                    prepend-icon="fa-calendar-alt"
                    readonly
                    v-on="on"
                    v-model="form.end_date"
                  ></v-text-field>
                </template>
                <v-date-picker
                  @input="endDateMenu = false"
                  v-model="form.end_date"
                  @change="dateChange"
                  :allowed-dates="allowedDates"
                ></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6 v-for="(i,index) in form.room" :key="index">
              <v-layout row>
                <v-flex pa-1>
                  <h2>
                    Room #{{index + 1}}
                    <v-btn icon ripple>
                      <v-icon color="red lighten-1" @click="deleteRoom(index)">fa-trash</v-icon>
                    </v-btn>
                  </h2>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 md12 pa-1>
                  <v-select
                    :items="availableRoom"
                    item-text="title"
                    item-value="id"
                    label="Available Room"
                    title="Available Room"
                    v-model="form.room[index]"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row justify-center>
            <v-btn color="success" @click="addRoom">Add Room</v-btn>
            <v-btn color="success" @click="doCreateBooking" :disabled="disabled">Book</v-btn>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  components: {
    NavBar,
    Loading
  },
  data: () => {
    return {
      startDateMenu: false,
      endDateMenu: false,
      form: {
        room: [null],
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10)
      }
    }
  },
  computed: {
    ...mapState({
      availableRoom: state => state.booking.availableRoom,
      error: state => state.booking.error
    }),
    duplicated () {
      return (new Set(this.form.room)).size !== this.form.room.length
    },
    dateChecker () {
      return new Date(this.form.start_date).toISOString().substr(0, 10) >= new Date(this.form.end_date).toISOString().substr(0, 10)
    },
    disabled () {
      return !this.form.room.every(r => r !== null) || this.form.room.length === 0 || this.dateChecker || this.duplicated
    }
  },
  methods: {
    ...mapWaitingActions('booking', {
      getAvailableRoom: 'loading room'
    }),
    ...mapMutations({
      setCreateForm: 'booking/setCreateForm'
    }),
    ...mapActions({
      doCreateBooking: 'booking/doCreateBooking'
    }),
    addRoom () {
      this.form.room.push(null)
    },
    dateChange () {
      this.getAvailableRoom({ startDate: this.form.start_date, endDate: this.form.end_date })
    },
    allowedDates (value) {
      return new Date(value).toISOString().substr(0, 10) >= new Date().toISOString().substr(0, 10)
    },
    deleteRoom (index) {
      this.form.room.splice(index, 1)
    }
  },
  watch: {
    form: {
      handler (v) {
        this.setCreateForm(v)
      },
      deep: true
    }
  },
  beforeMount () {
    this.getAvailableRoom({ startDate: this.form.start_date, endDate: this.form.end_date })
  }
}
</script>
