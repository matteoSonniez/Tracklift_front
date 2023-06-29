import React from 'react';
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Track from '@/img/menu_track.jpg';
import TrackBase from '@/img/TrackLogoBase2.png';
import TrackText from '@/img/TrackLogoText2.png';
import Deco from '@/img/deco.png';
import Worksite from '@/img/outil.png';
import UserContext from "@/context/UserContext";
import { BsArrowLeftShort } from 'react-icons/bs'; 
import { RiToolsFill } from 'react-icons/ri';
import { TbElevator } from 'react-icons/tb';
import { MdOutlineRecycling } from 'react-icons/md'; 
import { MdBusiness } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi'; //RiToolsFill TbElevator MdOutlineRecycling MdBusiness FiUsers

const NavBarAdmin = ({isOpen, onValueChange}) => {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen)
        console.log(isOpen, "bonnnnnnnnnn")
    }, [isOpen]);


    return (
        <div className={`bg-theblue text-black sm:relative sm:z-50 absolute ${!open && "relative"} sm:block
            shadow-lg h-screen ${open ? "w-56":"sm:w-20 hidden"} duration-300 pt-4 p-4 min-w-56`}>
            <BsArrowLeftShort className={`bg-white text-theblue text-3xl rounded-full absolute -right-3 top-[68px]
             border border-theblue cursor-pointer ${!open && "hidden"} sm:hidden`} onClick={()=> ( onValueChange())}/>
            <div className="flex">
                <img className={`w-12 ${open && "rotate-[360deg]"} duration-300`} src={TrackBase.src}/>
                <img className={`w-24 origin-left duration-300 ${!open && "scale-0"} self-start ml-4`} src={TrackText.src}/>
            </div>
            {user != undefined &&
            <div className="border-b-2 border-t-2 mt-4 flex py-2">
                <div className="rounded-full bg-white text-lg font-semibold p-3 text-theblue h-11 w-11 flex justify-center items-center">
                    <text className="uppercase">{user.firstName[0]}{user.lastName[0]}</text>
                </div>
                <div className={`text-white flex flex-col ml-2 leading-tight justify-center ${!open && "scale-0"} origin-left duration-300`} >
                    <text>{user.firstName} <span className="uppercase">{user.lastName}</span></text>
                    {user.isAdmin ?
                        <text>(admin)</text>
                    :
                        <text>(user)</text>
                    }
                </div>
            </div>
            }
            <div className="space-y-5 flex flex-col text-[21px] font-normal text-white mt-5">
                <div className="flex"><text className={`${!open && "scale-0"} origin-left duration-300 ease-in `}>Chantiers</text></div>
                <div className="flex"><a className={`${!open && "scale-0"} origin-left duration-300 cursor-pointer ease-in `} onClick={()=> (router.push('/wastes'))}>Ascenseurs</a></div>
                <div className="flex"><a className={`${!open && "scale-0"} origin-left duration-300 cursor-pointer ease-in  `} onClick={()=> (router.push('/wastes'))}>Déchets</a></div>
                <div className="flex"><a className={`${!open && "scale-0"} origin-left duration-300 cursor-pointer ease-in  `} onClick={()=> (router.push('/company'))}>Entreprises</a></div>
                <div className="flex"><a className={`${!open && "scale-0"} origin-left duration-300 cursor-pointer ease-in  `} onClick={()=> (router.push('/users'))}>Utilisateurs</a></div>
            </div>
            <div className="bottom-0 absolute py-8 w-full flex flex-col  space-y-2 text-thegris font-normal text-[18px]">
                <button
                    onClick={()=> (router.push('/auth/register'))}
                    className="border-2 border-thegris mb-2 py-1.5 rounded-md w-8/12 hover:border-theblue hover:text-theblue"
                    type="submit"
                    >
                    Mon compte
                </button>
                <div className="flex cursor-pointer" onClick={()=>(router.push('/auth/login'), logout())}>
                    <img src={Deco.src} className="w-6 h-6"></img>
                    <text className={`${!open && "hidden"} ml-2 hover:scale-0`}>Se déconnecter</text>
                </div>
            </div>
        </div>
    );
}

export default NavBarAdmin;
