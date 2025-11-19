import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// TODO: Замените эти значения на ваши из Firebase Console
// Инструкция ниже в файле FIREBASE_SETUP.md
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)

// Получение ссылки на базу данных
export const database = getDatabase(app)
