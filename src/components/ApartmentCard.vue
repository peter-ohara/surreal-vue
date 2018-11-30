<template>
  <q-item :to="`/details/${apartment['.key']}`">
    <q-item-side :image="apartment.images[0]" />
    <q-item-main>
      <q-item-tile label>{{ apartment.title }}</q-item-tile>
      <q-item-tile sublabel>GHC {{ apartment.price }}</q-item-tile>
    </q-item-main>
    <q-item-side right>
      <q-item-tile stamp>{{ apartment.beds }} beds</q-item-tile>
      <q-item-tile stamp>{{ apartment.baths }} baths</q-item-tile>
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: ['apartment'],
  data () {
    return {}
  }
}
</script>

<style>
  .card {
    background: white;
    cursor: pointer;
  }
</style>
