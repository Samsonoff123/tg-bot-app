import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDgJ0v4TnvPIpgIJDznGJI4IFKCTLD-I0g",
    authDomain: "tg-bot-image.firebaseapp.com",
    projectId: "tg-bot-image",
    storageBucket: "tg-bot-image.appspot.com",
    messagingSenderId: "940222844147",
    appId: "1:940222844147:web:7f596affd79509cc6d3b86",
    measurementId: "G-B4WZMT5FW7"
  };

  const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app)