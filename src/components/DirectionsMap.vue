<template>
  <div>

    <q-card style="width: 700px" class="q-ma-sm">
      <q-card-main>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </q-card-main>
      <q-card-media>
        <gmap-map
          ref="map"
          :center="center"
          :zoom="12"
          style="width:100%;  height: 87vh;">
        </gmap-map>
      </q-card-media>
    </q-card>

  </div>
</template>

<style>
</style>

<script>

import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDrfsTrJth16HlK52S1GKLyIONH8RueRfc',
    libraries: 'places' // necessary for places input
  }
})
export default {
  name: 'PageIndex',
  props: ['apartment'],
  data () {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 5.6448163, lng: -0.1537508 },
      destination: { lat: 5.64, lng: -0.15 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    // this.geolocate()
    this.$gmapApiPromiseLazy().then(() => {
      this.geolocate()
    })
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.getRoute()
      })
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    getRoute: function () {
      console.log('Getting the route-------------------')
      // eslint-disable-next-line no-use-before-vars, no-undef, no-unused-vars
      this.directionsService = new google.maps.DirectionsService()

      // eslint-disable-next-line no-use-before-vars, no-undef, no-unused-vars
      this.directionsDisplay = new google.maps.DirectionsRenderer()
      this.directionsDisplay.setMap(this.$refs.map.$mapObject)
      var vm = this
      vm.directionsService.route({
        origin: this.center,
        destination: this.destination,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          vm.directionsDisplay.setDirections(response)
        } else {
          console.error('Directions request failed due to ' + status)
        }
      })
      console.log('Finished getting the route')
    }
  }
}
</script>

<style scoped>
</style>
