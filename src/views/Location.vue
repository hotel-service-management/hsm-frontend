<template>
  <v-app>
    <nav-bar/>
    <v-content>
      <div class="panes">
        <!-- Map -->
        <googlemaps-map class="map" :center.sync="center" :zoom="19" @click="onClick">
          <!-- User Position -->
          <googlemaps-user-position @update:position="setUserPosition"/>

          <googlemaps-marker
            v-if="placeLocation"
            title="Searched location"
            :position="placeLocation"
          />
        </googlemaps-map>

        <!-- Places list -->
        <googlemaps-place-details
          class="results-pane"
          ref="results"
          :request="placeDetailsRequest"
          @results="onResults"
        >
          <template slot-scope="props">
            <div v-if="!placeId" class="tip overlay">
              <v-icon>fa-location-arrow</v-icon>
              <div>Click an icon on the map</div>
            </div>

            <div class="details" v-else-if="props.results">
              <div class="name">{{ props.results.name }}</div>
              <div class="address">{{ props.results.formatted_address }}</div>
              <div class="phone" v-if="props.results.international_phone_number">
                <v-icon>fa-phone</v-icon>&nbsp;
                <a
                  :href="`tel:${props.results.international_phone_number}`"
                >{{ props.results.international_phone_number }}</a>
              </div>
            </div>
          </template>
        </googlemaps-place-details>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data: () => {
    return {
      center: {
        lat: 13.7307794,
        lng: 100.7806505
      },
      placeId: 'ChIJ_Y_pjDBmHTERyjiMA2-nQ8s',
      placeLocation: null,
      userPosition: null
    }
  },
  computed: {
    placeDetailsRequest () {
      return {
        placeId: this.placeId
      }
    }
  },
  methods: {
    centerOnUser () {
      if (this.userPosition) {
        this.center = this.userPosition
      }
    },
    onClick (event) {
      event.stop()
      this.placeLocation = null
      this.placeId = event.placeId
      this.$refs.results.$el.scrollTop = 0
    },
    onResults (results) {
      if (results) {
        this.placeLocation = results.geometry.location
      }
    },
    setUserPosition (position) {
      this.userPosition = position
    }
  }
}
</script>

<style lang="scss" scoped>
.panes {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.map {
  flex: 1;
}
.results-pane {
  overflow: auto;
  width: 400px;
  position: relative;
  .details {
    > div {
      padding: 8px 16px;
    }
    .name {
      font-size: 20px;
      margin-top: 12px;
    }
    .address {
      color: #888;
    }
    .photos {
      padding: 0;
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      align-items: center;
      background: #333;
      .photo {
        flex: auto 0 0;
        overflow: hidden;
      }
    }
    .rating {
      pointer-events: none;
    }
  }
}
</style>
