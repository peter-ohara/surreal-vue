<template>
  <q-page class="flex row items-start q-pa-lg board">

    <q-list link separator class="col q-mx-sm">
      <q-list-header>
        New ({{newApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in newApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="col q-mx-sm">
      <q-list-header>
        Liked ({{likedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in likedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="col q-mx-sm">
      <q-list-header>
        Called ({{calledApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in calledApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="col q-mx-sm">
      <q-list-header>
        Visited ({{visitedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in visitedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="col q-mx-sm">
      <q-list-header>
        Rejected ({{rejectedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in rejectedApartments" :key="apartment['.key']" />
    </q-list>

  </q-page>
</template>

<script>

import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import ApartmentCard from '../components/ApartmentCard'

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

export default {
  name: 'PageIndex',
  components: {ApartmentCard},
  firebase: function () {
    return {
      apartments: db.ref('/apartments')
    }
  },
  computed: {
    newApartments () {
      return this.apartments.filter(apartment => !apartment.state)
    },
    likedApartments () {
      return this.apartments.filter(apartment => apartment.state === 'liked')
    },
    calledApartments () {
      return this.apartments.filter(apartment => apartment.state === 'called')
    },
    visitedApartments () {
      return this.apartments.filter(apartment => apartment.state === 'visited')
    },
    rejectedApartments () {
      return this.apartments.filter(apartment => apartment.state === 'rejected')
    }
  }
}
</script>

<style>
  /*.board {*/
    /*background: #f46b5a;*/
  /*}*/

  /*.list {*/
    /*width: 400px;*/
    /*margin: 0.5rem;*/
    /*background: #dfe3e6;*/
    /*border-radius: 4px;*/
  /*}*/
</style>
