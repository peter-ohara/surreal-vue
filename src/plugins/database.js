import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'

// explicit installation required in module environments
Vue.use(VueFire)

let config = {
  apiKey: 'AIzaSyAnFB3HxZlxwCVwPn0br2Gb0JqDYR7OnjU',
  authDomain: 'surreal-159622.firebaseapp.com',
  databaseURL: 'https://surreal-159622.firebaseio.com',
  projectId: 'surreal-159622',
  storageBucket: 'surreal-159622.appspot.com',
  messagingSenderId: '213701187584'
}

let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()

export default db
