<template>
  <q-page padding class="row justify-center">
    <q-list link separator>
      <q-list-header>
        {{ $route.params.state }} ({{filteredApartments.length }})
      </q-list-header>
      <apartment-card :apartment="apartment" v-for="apartment in filteredApartments" :key="apartment['.key']" />
    </q-list>
  </q-page>
</template>
<script>

import ApartmentCard from '../components/ApartmentCard'

import db from '../plugins/database'

export default {
  name: 'New',
  components: {ApartmentCard},
  firebase: function () {
    return {
      apartments: db.ref('/apartments')
    }
  },
  computed: {
    filteredApartments () {
      return this.apartments.filter(apartment => {
        if (this.$route.params.state === 'new' && !apartment.state) {
          return true
        } else {
          return apartment.state === this.$route.params.state
        }
      })// .sort(this.sortByBaths)
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
    },
    sortByBaths (apartmentA, apartmentB) {
      return apartmentA.baths - apartmentB.baths
    }
  }
}
</script>

<style>
  .width-300 {
    width: 100% !important;
  }
</style>
