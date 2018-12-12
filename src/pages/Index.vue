<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6">
      <q-list link separator v-if="filteredApartments.length > 0">
        <q-list-header>
          <q-field
            icon="sort">
            <q-select
              v-model="sortMethod"
              :options="sortOptions" />
          </q-field>
        </q-list-header>
        <q-item-separator />
        <apartment-card :apartment="apartment" v-for="apartment in filteredApartments" :key="apartment['.key']" />
      </q-list>
      <div v-else class="fixed-center text-center">
        <p>
          <img
            src="~assets/white-balance-sunny.svg"
            style="width:30vw;max-width:150px;"
          >
        </p>
        <p class="text-faded">No apartments in {{$route.params.state}}</p>
      </div>
    </div>
  </q-page>
</template>
<script>

import ApartmentCard from '../components/ApartmentCard'

export default {
  name: 'New',
  components: {ApartmentCard},
  data () {
    return {
      sortMethod: 'sortByStars',
      sortOptions: [
        { label: 'Poster', value: 'sortByPoster' },
        { label: 'Stars', value: 'sortByStars' },
        { label: 'Baths', value: 'sortByBaths' },
        { label: 'Distance', value: 'sortByDistance' }
      ]
    }
  },
  computed: {
    filteredApartments () {
      let hash = {
        'new': this.$store.getters['tonaton/newApartments'],
        'liked': this.$store.getters['tonaton/likedApartments'],
        'called': this.$store.getters['tonaton/calledApartments'],
        'visited': this.$store.getters['tonaton/visitedApartments'],
        'rejected': this.$store.getters['tonaton/rejectedApartments']
      }

      return hash[this.$route.params.state]
        .sort(this[this.sortMethod])
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
    sortByStars (apartmentA, apartmentB) {
      if (!apartmentA.stars) apartmentA.stars = 0
      if (!apartmentB.stars) apartmentB.stars = 0
      return apartmentB.stars - apartmentA.stars
    },
    sortByBaths (apartmentA, apartmentB) {
      return apartmentA.baths - apartmentB.baths
    },
    sortByDistance (apartmentA, apartmentB) {
      return apartmentA.distance - apartmentB.distance
    }
  }
}
</script>

<style>
  .width-300 {
    width: 100% !important;
  }
</style>
