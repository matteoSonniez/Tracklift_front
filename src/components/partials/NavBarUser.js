import React from 'react';
import { useRouter } from "next/router";

const NavBarUser = () => {
    const router = useRouter();
    return (
        <div>
            <p>Chantiers</p>
            <p>Ascenseurs</p>
            <p onClick={()=> (router.push('/users'))}>Utilisateurs</p>
        </div>
    );
}

export default NavBarUser;