<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <v-container fluid>
        <v-layout row>
          <h1>Write Review</h1>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md12>
            <v-text-field label="Title" placeholder="Title"></v-text-field>
          </v-flex>
          <v-flex xs12 md12>
            <v-text-field type="number" max="10" min="0" title="Score" label="Score"></v-text-field>
          </v-flex>
          <v-flex xs12 md12>
            <v-textarea name="input-7-1" label="Detail" hint="Tell us what you think"/>
          </v-flex>
        </v-layout>
        <v-layout justify-center>
          <v-btn color="success">Create</v-btn>
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
  computed: {
  },
  methods: {
  }
}
</script>
