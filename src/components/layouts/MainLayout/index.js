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
    <div className="flex" style={{ backgroundColor: "#E6E7E9" }}>
      {user.isAdmin != undefined &&
        <NavAdmin/>
      }
      <div className="flex-1 h-screen  p-5 ">
        <div className="bg-white h-full w-full rounded-md shadow-xl overflow-y-scroll scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
/* */

export default MainLayout;