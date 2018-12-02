<template>
  <q-page class="row now-wrap items-start q-py-lg board">

    <q-list link separator class="width-300  q-mx-sm q-mb-lg">
      <q-list-header>
        New ({{newApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in newApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="width-300  q-mx-sm q-mb-lg">
      <q-list-header>
        Liked ({{likedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in likedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="width-300  q-mx-sm q-mb-lg">
      <q-list-header>
        Called ({{calledApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in calledApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="width-300  q-mx-sm q-mb-lg">
      <q-list-header>
        Visited ({{visitedApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in visitedApartments" :key="apartment['.key']" />
    </q-list>

    <q-list link separator class="width-300  q-mx-sm q-mb-lg">
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
      return this.apartments.filter(apartment => apartment.state === 'liked').sort(this.sortByPoster)
    },
    calledApartments () {
      return this.apartments.filter(apartment => apartment.state === 'called').sort(this.sortByPoster)
    },
    visitedApartments () {
      return this.apartments.filter(apartment => apartment.state === 'visited').sort(this.sortByPoster)
    },
    rejectedApartments () {
      return this.apartments.filter(apartment => apartment.state === 'rejected')
    }
  },
  methods: {
    sortByPoster (apartmentA, apartmentB) {
      if (!apartmentA.poster) return -1
      if (!apartmentB.poster) return -1

      let nameA = apartmentA.poster.toUpperCase() // ignore upper and lowercase
      let nameB = apartmentB.poster.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    }
  }
}
</script>

<style>
  .width-300 {
    width: 450px !important;
  }
</style>
