import React from 'react';
import { useRouter } from "next/router";

const NavBarAdmin = () => {
    const router = useRouter();
    return (
        <div>
            <p>Chantiers</p>
            <p onClick={()=> (router.push('/users'))}>Ascenseurs</p>
            <p>Déchets</p>
            <p onClick={()=> (router.push('/company'))}>Entreprises</p>
            <p onClick={()=> (router.push('/users'))}>Utilisateurs</p>
        </div>
    );
}

export default NavBarAdmin;
