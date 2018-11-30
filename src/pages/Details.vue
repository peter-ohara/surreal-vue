<template>
  <q-page class="row items-start q-py-lg q-px-sm">

    <q-card style="width: 612px" class="q-ma-sm">
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
        <div slot="subtitle">
          <strong>{{ timeAgo(apartment.date) }}</strong>
          by
          {{ apartment.poster }}
        </div>

        <div slot="right" class="row items-center">
          GHC {{ apartment.price }}
        </div>
      </q-card-title>
    </q-card>

    <directions-map :apartment="apartment"></directions-map>

    <q-card style="width: 400px;" class="q-ma-sm">
      <q-card-main>
        <p>{{ apartment.beds }} beds</p>
        <p>{{ apartment.baths }} baths</p>
        <p>{{ apartment.size }}</p>
        <p>Street or landmark: <br> <span class="text-faded">{{ apartment.street_or_landmark }}</span></p>
        <p class="text-faded" v-html="apartment.description"></p>
        <strong>Contacts</strong>
        <p>{{apartment.contacts}}</p>
        <p class="text-faded">{{apartment.date}}</p>
        <q-btn
          color="primary"
          outline
          @click="openURL(apartment.url)"
          label="Open in Tonaton" />
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat
               color="negative"
               label="Reject"
               class="q-mr-auto"
               @click="rejectApartment(apartment)"/>
        <!--<q-btn flat color="primary" label="Been there" :to="`/details/${apartment['.key']}`" />-->
        <!--<q-btn flat color="primary" label="Called" :to="`/details/${apartment['.key']}`" />-->
        <q-btn flat
               color="primary"
               label="Like"
               @click="likeApartment(apartment)"/>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<style>
</style>

<script>

import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

// explicit installation required in module environments
Vue.use(VueFire)

let config = {
  apiKey: 'AIzaSyAnFB3HxZlxwCVwPn0br2Gb0JqDYR7OnjU',
  authDomain: 'surreal-159622.firebaseapp.com',
  databaseURL: 'https://surreal-159622.firebaseio.com',
  projectId: 'surreal-159622',
  storageBucket: 'surreal-159622.appspot.com',
  messagingSenderId: '213701187584'
}

let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()

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
        asObject: true
      }
    }
  },

  methods: {
    likeApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('liked')
      this.$router.push('/')
    },
    rejectApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('rejected')
      this.$router.push('/')
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

<style scoped>
</style>
