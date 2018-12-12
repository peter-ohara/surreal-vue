<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="red"
        :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <q-search inverted
                    color="none"
                    placeholder="Surreal" no-icon
                    @input="$store.commit('tonaton/setSearchPhrase', $event)"
                    clearable />
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
import { mapGetters } from 'vuex'

export default {
  name: 'MyLayout',
  components: {ApartmentCard},
  computed: {
    ...mapGetters({
      newApartments: 'tonaton/newApartments',
      likedApartments: 'tonaton/likedApartments',
      calledApartments: 'tonaton/calledApartments',
      visitedApartments: 'tonaton/visitedApartments',
      rejectedApartments: 'tonaton/rejectedApartments'
    })
  },
  created () {
    this.$store.dispatch('tonaton/setApartmentsRef', { ref: db.ref('apartments').orderByChild('state') })
  }
}
</script>
