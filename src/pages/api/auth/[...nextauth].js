import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import {db} from '../../../../service/main'
import * as firestoreFunctions from "firebase/firestore"
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers: [
    CredentialsProvider({
    	name:'Credentials',
    	 credentials: {
		    email: { label: "email", type: "email", placeholder: "Enter you email" },
		    password: {  label: "Password", type: "password" }
		    },
		 async authorize(credentials, req) {
		 	console.log(req)
      // Add logic here to look up the user from the credentials supplied
      const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

      if (user) {
        // Any object returned will be saved in `user` property of the JWT
        return user
      } else {
        // If you return null then an error will be displayed advising the user to check their details.
        return null

     
    }),
  ],
  adapter: FirestoreAdapter({
   apiKey: "AIzaSyD7ZaPfDm932IsXBl8lNXNKpYv0e4jYhrg",
    authDomain: "where2go-942e3.firebaseapp.com",
    projectId: "where2go-942e3",
    storageBucket: "where2go-942e3.appspot.com",
    messagingSenderId: "719983054012",
    appId: "1:719983054012:web:dbc257c6c4af5d3607d4b9",
    measurementId: "G-QW6RSHDEMM"
  }),

});