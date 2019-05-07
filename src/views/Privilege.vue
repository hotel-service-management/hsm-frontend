<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading privilege">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row>
            <h1>Privileges</h1>
          </v-layout>
          <v-container fluid grid-list-lg>
            <v-flex xs12 lg12>
              <v-layout row wrap>
                <v-flex xs12 md3 v-for="privilege in privileges" :key="privilege.id">
                  <v-card color="blue" dark>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{privilege.type}} - {{privilege.title}}</div>
                        <span>{{privilege.detail}}</span>
                      </div>
                    </v-card-title>
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
      privileges: state => state.privilege.privileges
    })
  },
  methods: {
    ...mapWaitingActions('privilege', {
      getPrivileges: 'loading privilege'
    })
  },
  beforeMount () {
    this.getPrivileges(this.id)
  }
}
</script>
