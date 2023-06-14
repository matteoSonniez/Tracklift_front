import styles from "./index.module.scss";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import NavAdmin from '@/components/partials/NavBarAdmin';
import NavUser from '@/components/partials/NavBarUser';
import UserContext from "@/context/UserContext";




const MainLayout = ({ children }) => {

  const { user } = useContext(UserContext);
  console.log(user.isAdmin);

  return (
    <div>
      {user.isAdmin ? 
        <NavAdmin/>
      :
        <NavUser/>
      }
      <div>
        {children}
      </div>
    </div>
  );
}
/* */

export default MainLayout;