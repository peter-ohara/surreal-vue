/*
export function someGetter (state) {
}
*/
const reducer = (accumulator, currentValue) => accumulator.concat(currentValue)

export function filteredApartments (state) {
  return state.apartments.filter(apartment => {
    let content = Object.values(apartment).reduce(reducer).toLowerCase()
    let searchPhrase = state.searchPhrase.toLowerCase()
    if (content.includes(searchPhrase)) {
      return true
    } else {
      return false
    }
  })
}

export function newApartments (state, getters) {
  return getters.filteredApartments.filter(apartment => !apartment.state)
}

export function likedApartments (state, getters) {
  return getters.filteredApartments.filter(apartment => apartment.state === 'liked')
}

export function calledApartments (state, getters) {
  return getters.filteredApartments.filter(apartment => apartment.state === 'called')
}

export function visitedApartments (state, getters) {
  return getters.filteredApartments.filter(apartment => apartment.state === 'visited')
}

export function rejectedApartments (state, getters) {
  return getters.filteredApartments.filter(apartment => apartment.state === 'rejected')
}
