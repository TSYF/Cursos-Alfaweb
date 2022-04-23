import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqDExkQg5cd7ZEp3O0mMcrFlOTObE14n0",
  authDomain: "vue-fb-desafio-latam.firebaseapp.com",
  projectId: "vue-fb-desafio-latam",
  storageBucket: "vue-fb-desafio-latam.appspot.com",
  messagingSenderId: "502171232128",
  appId: "1:502171232128:web:84f0969f4a94836b144365",
  measurementId: "G-CGV08K7SL1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
