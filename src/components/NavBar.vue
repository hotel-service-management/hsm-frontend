<template>
  <v-app>
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
    >
      <v-list>
        <v-list-tile @click="drawer.mini = !drawer.mini">
          <v-list-tile-action>
            <v-icon>aspect_ratio</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Minimize</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app color="#77C6FF" :fixed="toolbar.fixed" :clipped-left="toolbar.clippedLeft">
      <v-toolbar-side-icon @click.stop="drawer.open = !drawer.open"></v-toolbar-side-icon>
      <v-toolbar-title>Hotel Service Management</v-toolbar-title>
    </v-toolbar>
  </v-app>
</template>

<script>

export default {
  data () {
    return {
      drawer: {
        open: false,
        clipped: true,
        fixed: false,
        mini: false
      },
      toolbar: {
        fixed: true,
        clippedLeft: true
      },
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
