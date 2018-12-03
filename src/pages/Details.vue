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
      <q-card-main>
        <p class="text-faded" v-html="apartment.description"></p>
        <p class="text-faded">Posted on {{apartment.date}}</p>
      </q-card-main>
    </q-card>

    <q-card style="width: 250px;" class="q-ma-sm">
      <q-card-main>
        <p>{{ apartment.beds }} beds</p>
        <p>{{ apartment.baths }} baths</p>
        <p>{{ apartment.size }}</p>
        <p>{{ apartment.street_or_landmark }}</p>
        <strong>Contacts</strong>
        <p>{{apartment.contacts}}</p>
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
    likeApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('liked')
      this.$router.go(-1)
      this.$q.notify(`Liked ${apartment.title} - GHC ${apartment.price}`)
    },
    rejectApartment (apartment) {
      this.$firebaseRefs.apartment.child('state').set('rejected')
      this.$router.go(-1)
      this.$q.notify(`Rejected ${apartment.title} - GHC ${apartment.price}`)
    },
    setApartmentAsCalled (apartment) {
      this.$firebaseRefs.apartment.child('state').set('called')
      this.$q.notify(`Called ${apartment.title} - GHC ${apartment.price}`)
    },
    setApartmentAsVisited (apartment) {
      this.$firebaseRefs.apartment.child('state').set('visited')
      this.$router.go(-1)
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
