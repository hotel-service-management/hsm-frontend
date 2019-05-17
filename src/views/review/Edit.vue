<template>
  <v-app>
    <nav-bar/>
    <v-wait for="loading booking">
      <template slot="waiting">
        <loading/>
      </template>
      <v-content>
        <v-container fluid>
          <v-layout row wrap justify-center>
            <v-flex xs12 md5 v-if="permission">
              <v-card class="elevation-12">
                <v-form>
                  <v-toolbar dark color="primary">
                    <v-toolbar-title>Edit Review #{{id}}</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      label="Title"
                      placeholder="Title"
                      v-model="form.title"
                      :error-messages="error.title"
                    />
                    <v-text-field
                      type="number"
                      max="10"
                      min="0"
                      title="Score"
                      label="Score"
                      v-model="form.score"
                      :error-messages="error.score"
                    ></v-text-field>
                    <v-textarea
                      name="input-7-1"
                      label="Detail"
                      hint="Tell us what you think"
                      v-model="form.description"
                      :error-messages="error.description"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-layout justify-center>
                      <v-btn color="success" @click="doEditReview(reviewId)">
                        Edit
                        <v-icon right dark>fa-sign-in-alt</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-flex>
            <v-flex v-else>
              <h1 class="red--text">Permission Denied</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-wait>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'

import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'EditReview',
  props: ['id'],
  data: () => {
    return {
      reviewId: null,
      form: {
        title: '',
        score: '',
        description: ''
      }
    }
  },
  components: {
    NavBar,
    Loading
  },
  computed: {
    ...mapState({
      booking: state => state.booking.booking,
      error: state => state.review.error
    }),
    permission () {
      return !(Object.entries(this.booking).length === 0 && this.booking.constructor === Object)
    }
  },
  methods: {
    ...mapActions({
      doEditReview: 'review/doEditReview'
    }),
    ...mapMutations({
      setReviewForm: 'review/setReviewForm'
    }),
    ...mapWaitingActions('booking', {
      getBooking: 'loading booking'
    })
  },
  watch: {
    form: {
      handler (val) {
        this.setReviewForm(val)
      },
      deep: true
    }
  },
  beforeMount () {
    this.getBooking(this.id).then(() => {
      let review = this.booking.review

      if (review) {
        delete review.created_at
        delete review.updated_at

        this.form = review
        this.reviewId = review.id

        delete review.id
      }
    })
  }
}
</script>
