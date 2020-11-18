import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCcmf-q5rVnKN2B0LptzfBQ-l71W0NE09c",
  authDomain: "todo-app-9cc3c.firebaseapp.com",
  databaseURL: "https://todo-app-9cc3c.firebaseio.com",
  projectId: "todo-app-9cc3c",
  storageBucket: "todo-app-9cc3c.appspot.com",
  messagingSenderId: "619127175359",
  appId: "1:619127175359:web:2a2fd17fd85fe977242e0a",
});

export const db = firebaseApp.firestore();
