/*
export function someAction (context) {
}
*/

import { firebaseAction } from 'vuexfire'

// export const setApartmentsRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
//   bindFirebaseRef('apartments', ref)
// })

export const setApartmentsRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  // this will unbind any previously bound ref to 'todos'
  bindFirebaseRef('apartments', ref)
  // // you can unbind any ref easily
  // unbindFirebaseRef('user')
})
