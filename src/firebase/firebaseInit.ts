import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBXewiaSQ59zpbVBp6XLw03k2Il9NqbN44",
  authDomain: "cms-content-generator.firebaseapp.com",
  projectId: "cms-content-generator",
  storageBucket: "cms-content-generator.appspot.com",
  messagingSenderId: "573103441078",
  appId: "1:573103441078:web:2addab2c76e70fcd0c1217",
}

const app = firebase.initializeApp(firebaseConfig)

export default app.firestore()
