const config = {
  apiKey: "AIzaSyAS8H_DrWZfc3LTFA7duNzIpGiAfhZG3ws",
  authDomain: "mercadodev-885ed.firebaseapp.com",
  databaseURL: "https://mercadodev-885ed.firebaseio.com",
  projectId: "mercadodev-885ed",
  storageBucket: "gs://mercadodev-885ed.appspot.com",
  messagingSenderId: "994144806901"
};

const Rebase = require("re-base");
const firebase = require("firebase/app");
require("firebase/database");
require("firebase/storage");

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());

export const storage = app.storage();
export default base;
