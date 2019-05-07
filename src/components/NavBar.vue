<template>
  <fragment>
    <left-menu/>

    <v-toolbar app color="#77C6FF" :fixed="fixed" :clipped-left="clippedLeft">
      <v-toolbar-side-icon @click.stop="drawerOpen(!open)"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/booking" id="nav-head">Hotel Service Management</router-link>
      </v-toolbar-title>
    </v-toolbar>
  </fragment>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import LeftMenu from '@/components/LeftMenu.vue'

export default {
  components: { LeftMenu },
  computed: mapState({
    fixed: state => state.navigation.toolbar.fixed,
    clippedLeft: state => state.navigation.toolbar.clippedLeft,
    open: state => state.navigation.drawer.open
  }),
  methods: {
    ...mapMutations({
      drawerOpen: 'navigation/drawerOpen'
    })
  }
}
</script>

<style scoped>
#nav-head {
  color: #000;
  text-decoration: none;
}
</style>
