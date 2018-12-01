<template>
  <q-page class="flex row items-start q-pa-lg board">

    <q-list link separator class="list q-mx-sm q-mb-lg">
      <q-list-header>
        New ({{newApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in newApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="list q-mx-sm q-mb-lg">
      <q-list-header>
        Liked ({{likedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in likedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="list q-mx-sm q-mb-lg">
      <q-list-header>
        Called ({{calledApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in calledApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="list q-mx-sm q-mb-lg">
      <q-list-header>
        Visited ({{visitedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in visitedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="list q-mx-sm q-mb-lg">
      <q-list-header>
        Rejected ({{rejectedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in rejectedApartments" :key="apartment['.key']" />
    </q-list>

  </q-page>
</template>

<script>

import ApartmentCard from '../components/ApartmentCard'

import db from '../plugins/database'

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

  .list {
    width: 400px;
  }
</style>
