<template>
  <v-navigation-drawer
    :clipped="clipped"
    :fixed="fixed"
    :mini-variant="mini"
    v-model="drawerOpen"
    app
  >
    <v-list>
      <v-list-tile @click="drawerMini(!mini)">
        <v-list-tile-action>
          <v-icon>fa-expand-arrows-alt</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Minimize</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      open: state => state.navigation.drawer.open,
      clipped: state => state.navigation.drawer.clipped,
      fixed: state => state.navigation.drawer.fixed,
      mini: state => state.navigation.drawer.mini,
      items: state => state.navigation.items
    }),
    drawerOpen: {
      get () { return this.open },
      set (v) {}
    }
  },
  methods: {
    ...mapMutations([
      'drawerMini'
    ])
  }
}
</script>

<style>
</style>
