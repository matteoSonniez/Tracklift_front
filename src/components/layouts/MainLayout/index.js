import styles from "./index.module.scss";
import { useState, useEffect, useContext, cloneElement } from "react";
import { useRouter } from "next/router";
import NavAdmin from '@/components/partials/NavBarAdmin';
import NavUser from '@/components/partials/NavBarUser';
import UserContext from "@/context/UserContext";

const MainLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  console.log(user.isAdmin);
  const [open, setOpen] = useState(true);

  const handleNavAdminValue = () => {
    setOpen(!open);
  };

  const childrenWithProps = cloneElement(children, { handleNavAdminValue , open});

  return (
    <div className="flex bg-thegris3">
      {user.isAdmin != undefined && (
        <NavAdmin isOpen={open} onValueChange={handleNavAdminValue} />
      )}
      <div className="flex-1 h-screen w-full overflow-scroll">
        {childrenWithProps}
      </div>
    </div>
  );
}

export default MainLayout;
