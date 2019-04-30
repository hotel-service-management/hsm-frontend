<template>
  <fragment>
    <left-menu/>

    <v-toolbar app color="#77C6FF" :fixed="fixed" :clipped-left="clippedLeft">
      <v-toolbar-side-icon @click.stop="drawerOpen(!open)"></v-toolbar-side-icon>
      <v-toolbar-title>Hotel Service Management</v-toolbar-title>
    </v-toolbar>
  </fragment>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import LeftMenu from '@/components/LeftMenu.vue'

export default {
  components: { LeftMenu },
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
  computed: mapState({
    fixed: state => state.navigation.toolbar.fixed,
    clippedLeft: state => state.navigation.toolbar.clippedLeft,
    open: state => state.navigation.drawer.open
  }),
  methods: {
    ...mapMutations([
      'drawerOpen'
    ])
  }
}
</script>

<style>
</style>
