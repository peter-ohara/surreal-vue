/*
export function someMutation (state) {
}
*/

export function setApartments (state, apartments) {
  state.apartments = apartments
}

export function setSearchPhrase (state, searchPhrase) {
  state.searchPhrase = searchPhrase
}

export function setStars (state, apartment) {
  this.$firebaseRefs.apartment.child('stars').set(apartment.stars)
}

export function setStreetOrLandMark (state, apartment) {
  this.$firebaseRefs.apartment.child('street_or_landmark').set(apartment.street_or_landmark)
}

export function setDistance (state, apartment) {
  this.$firebaseRefs.apartment.child('distance').set(apartment.distance)
}
export function setNotes (state, apartment) {
  this.$firebaseRefs.apartment.child('notes').set(apartment.notes)
}

export function likeApartment (state, apartment) {
  this.$firebaseRefs.apartment.child('state').set('liked')
}

export function rejectApartment (state, apartment) {
  this.$firebaseRefs.apartment.child('state').set('rejected')
}

export function setApartmentAsCalled (state, apartment) {
  this.$firebaseRefs.apartment.child('state').set('called')
}

export function setApartmentAsVisited (state, apartment) {
  this.$firebaseRefs.apartment.child('state').set('visited')
}
