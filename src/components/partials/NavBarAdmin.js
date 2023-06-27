import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Track from '@/img/menu_track.jpg';
import Deco from '@/img/deco.png';
import UserContext from "@/context/UserContext";

const NavBarAdmin = () => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    return (
        <div className="sidebar bg-white text-black w-56 absolute 
            inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 my-5 ml-5 rounded-md shadow-lg">
            <div className="w-full flex p-8 border-b-2">
                <img src={Track.src}/>
            </div>
            {user != undefined &&
            <div className="border-b-2 flex pl-8 py-2">
                <div className="rounded-full bg-blue-400 p-3 text-white h-11 w-11 flex justify-center items-center" style={{ backgroundColor: "#0B8A95" }}>
                    <text className="uppercase">{user.firstName[0]}{user.lastName[0]}</text>
                </div>
                <div className="flex flex-col ml-2 leading-tight justify-center" style={{ color: "#0B8A95" }}>
                    <text>{user.firstName} <span className="uppercase">{user.lastName}</span></text>
                    {user.isAdmin ?
                        <text>(admin)</text>
                    :
                        <text>(user)</text>
                    }
                </div>
            </div>
            }
            <div className="space-y-5 p-8 flex flex-col text-[21px] font-normal">
                <text>Chantiers</text>
                <a className="cursor-pointer" onClick={()=> (router.push('/users'))}>Ascenseurs</a>
                <a className={`cursor-pointer ease-in duration-100 ${router.asPath.includes("/wastes") ? "text-theblue text-[22px]" : "text-black"}`} onClick={()=> (router.push('/wastes'))}>Déchets</a>
                <a className={`cursor-pointer ease-in duration-100 ${router.asPath.includes("/company") ? "text-theblue text-[22px]" : "text-black"}`} onClick={()=> (router.push('/company'))}>Entreprises</a>
                <a className={`cursor-pointer ease-in duration-100 ${router.asPath.includes("/users") ? "text-theblue text-[22px]" : "text-black"}`} onClick={()=> (router.push('/users'))}>Utilisateurs</a>
            </div>
            <div className="bottom-0 absolute py-8 w-full flex flex-col items-center space-y-2 text-thegris font-normal text-[18px]">
                <button
                    onClick={()=> (router.push('/auth/register'))}
                    className="border-2 border-thegris mb-2 py-1.5 rounded-md w-8/12 hover:border-theblue hover:text-theblue"
                    type="submit"
                    >
                    Mon compte
                </button>
                <div className="flex cursor-pointer" onClick={()=>(router.push('/auth/login'), logout())}>
                    <img src={Deco.src} className="w-6"></img>
                    <text className="ml-2 hover:text-thered">Se déconnecter</text>
                </div>
            </div>
        </div>
    );
}

export default NavBarAdmin;
