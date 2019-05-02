<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <AtomSpinner :animation-duration="1000" :size="240" color="#77C6FF"/>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'
export default {
  components: {
    AtomSpinner
  }
}
</script>
