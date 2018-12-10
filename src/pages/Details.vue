<template>
  <q-page class="row gutter-sm" padding>
    <div class="col-md-8 col-lg-6 col-xl-4">
      <q-card class="no-margin">
        <q-card-media>
          <q-carousel
            color="white"
            arrows
            handle-arrow-keys
            height="460px"
            :thumbnails="apartment.images">
            <q-carousel-slide v-for="image in apartment.images"
                              :key="image"
                              :img-src="image" />

            <q-carousel-control
              slot="control-button"
              slot-scope="carousel"
              position="bottom-right"
              :offset="[18, 22]">
              <q-btn
                round dense push
                color="amber"
                :icon="carousel.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="carousel.toggleFullscreen()"
              />
            </q-carousel-control>
          </q-carousel>
        </q-card-media>
        <q-card-title>
          {{ apartment.title }}
          <q-rating slot="subtitle"
                    v-model="apartment.stars"
                    :max="5"
                    @input="setStars(apartment)"/>

          <div slot="subtitle">
            <strong>{{ timeAgo(apartment.date) }}</strong>
            by
            {{ apartment.poster }}
          </div>

          <div slot="right" class="row items-center">
            GHC {{ apartment.price }}
          </div>
        </q-card-title>
        <q-card-main>
          <p class="text-faded" v-html="apartment.description"></p>
          <p class="text-faded">Posted on {{apartment.date}}</p>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-xs-12 col-md-4 col-lg-3 col-xl-2">
      <q-card class="no-margin">
        <q-card-main>
          <p>{{ apartment.beds }} beds</p>
          <p>{{ apartment.baths }} baths</p>
          <p>{{ apartment.size }}</p>
          <p>{{ apartment.location }}</p>
          <p>
            <q-input v-model="apartment.street_or_landmark"
                     float-label="Street or landmark"
                     placeholder="Street or landmark"
                     @input="setStreetOrLandMark(apartment)"/>
          </p>
          <p>
            <q-input v-model="apartment.distance"
                     float-label="Distance"
                     placeholder="Distance"
                     suffix="km"
                     @input="setDistance(apartment)"/>
          </p>

          <p><strong>Contacts</strong></p>
          <p>
            <a :href="`tel:${apartment.contacts}`">
              {{apartment.contacts}}
            </a>
          </p>
          <q-btn
            color="primary"
            outline
            @click="openURL(apartment.url)"
            class="full-width"
            label="Open in Tonaton" />

          <div class="q-mt-lg">{{ apartment.state }}</div>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn flat
                 color="negative"
                 label="Reject"
                 class="q-mr-auto"
                 @click="rejectApartment(apartment)"/>

          <q-btn v-if="!apartment.state || apartment.state === 'rejected'"
                 flat
                 color="primary"
                 label="Like"
                 @click="likeApartment(apartment)"/>

          <q-btn v-if="apartment.state === 'liked'"
                 flat
                 color="primary"
                 label="Set as called"
                 @click="setApartmentAsCalled(apartment)"/>

          <q-btn v-if="apartment.state === 'called'"
                 flat
                 color="primary"
                 label="Set as visited"
                 @click="setApartmentAsVisited(apartment)"/>
        </q-card-actions>
      </q-card>
    </div>

    <div class="col-xs-12 col-md-4 col-lg-3 col-xl-2">
      <q-card class="no-margin">
        <q-card-main>
          <q-input
            v-model="apartment.notes"
            type="textarea"
            float-label="Notes"
            @input="setNotes(apartment)"
            rows="7"
          />
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import db from '../plugins/database'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

import DirectionsMap from '../components/DirectionsMap'
import { date, openURL } from 'quasar'

export default {
  name: 'PageIndex',

  components: {DirectionsMap},

  firebase: function () {
    return {
      apartment: {
        source: db.ref(`/apartments/${this.$route.params.id}`),
        // optionally bind as an object
        asObject: true,
        // optionally provide the cancelCallback
        cancelCallback: function () {},
        // this is called once the data has been retrieved from firebase
        readyCallback: function () {

        }
      }
    }
  },

  methods: {
    setStars (apartment) {
      this.$firebaseRefs.apartment.child('stars').set(apartment.stars)
    },
    setStreetOrLandMark (apartment) {
      this.$firebaseRefs.apartment.child('street_or_landmark').set(apartment.street_or_landmark)
    },
    setDistance (apartment) {
      this.$firebaseRefs.apartment.child('distance').set(apartment.distance)
    },
    setNotes (apartment) {
      this.$firebaseRefs.apartment.child('notes').set(apartment.notes)
    },
    likeApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('liked')
      this.$router.go(-1)
      this.$q.notify(`Liked "${apartment.title}" - GHC ${apartment.price}`)
    },
    rejectApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('rejected')
      this.$router.go(-1)
      this.$q.notify(`Rejected "${apartment.title}" - GHC ${apartment.price}`)
    },
    setApartmentAsCalled (apartment) {
      this.$firebaseRefs.apartment.child('state').set('called')
      this.$router.go(-1)
      this.$q.notify(`Called "${apartment.title}" - GHC ${apartment.price}`)
    },
    setApartmentAsVisited (apartment) {
      this.$firebaseRefs.apartment.child('state').set('visited')
      this.$router.go(-1)
      this.$q.notify(`Visited "${apartment.title}" - GHC ${apartment.price}`)
    },
    timeAgo (dateString) {
      let newDate = new Date(dateString)
      newDate = date.addToDate(newDate, { year: 17 })
      return timeAgo.format(newDate)
    },
    openURL
  }
}
</script>

<style>
  .width-100 {
    width: 100%;
    background: green;
  }
</style>
