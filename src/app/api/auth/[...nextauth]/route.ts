import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"
// import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/libs/firebase";
import { collection, addDoc , getDocs, query, where } from "firebase/firestore";


const usersRef = collection(db, "users");
        
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials) {

    //   }
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    async signIn({ user}) {
      if(!user?.email){
        throw new Error('No profile')
      }

      const q = query(usersRef, where("email", "==", user.email))

      try {
        const querySnapshot = await getDocs(q)
  
        if(querySnapshot.empty){
            await addDoc(collection(db, "users"), {
              name: user.name,
              email: user.email
            })
        }
    
        return true
      }
      catch (err) {
        console.error(err)
        return false
      }
    }
  }
}

const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}

