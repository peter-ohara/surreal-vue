<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="red"
        :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          Surreal
        </q-toolbar-title>

      </q-toolbar>

      <q-toolbar
        color="red"
        :inverted="$q.theme === 'ios'">
        <q-tabs color="red" align="center" animated swipeable>
          <q-route-tab to="/new" slot="title" label="new" :count="newApartments.length"/>
          <q-route-tab to="/liked" slot="title" label="liked" :count="likedApartments.length"/>
          <q-route-tab to="/called" slot="title" label="called" :count="calledApartments.length"/>
          <q-route-tab to="/visited" slot="title" label="visited" :count="visitedApartments.length"/>
          <q-route-tab to="/rejected" slot="title" label="rejected" :count="rejectedApartments.length"/>
        </q-tabs>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import ApartmentCard from '../components/ApartmentCard'

import db from '../plugins/database'

export default {
  name: 'MyLayout',
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
