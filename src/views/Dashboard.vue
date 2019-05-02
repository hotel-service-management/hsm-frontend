<template>
  <v-app>
    <nav-bar/>
    <loading/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'
// import authInstance from '@/util/auth'

export default {
  components: {
    NavBar,
    Loading
  }
}
</script>
