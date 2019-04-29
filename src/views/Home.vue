<template>
  <div>
    <nav-bar>Hello</nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import authInstance from '../util/auth'

authInstance.get('/booking/').then(r => (console.log(r.data)))

export default {
  components: {
    NavBar
  }
}
</script>
