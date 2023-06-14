import { useState, useEffect, useContext } from "react";
import { Inter } from 'next/font/google'
import UserContext from "@/context/UserContext";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user } = useContext(UserContext);

  useEffect(() => {
    //console.log(user, 'contexttt');
  }, [user]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>home page</p>
      
    </main>
  )
}
