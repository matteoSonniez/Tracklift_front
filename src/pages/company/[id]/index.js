import React from 'react';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import Menu from '@/img/menu2.png';
import Loca from '@/img/loca.png';
import Graphe from '@/img/graph-track.jpg';

const Index = ({ handleNavAdminValue, open }) => {
    const router = useRouter()

    const paramValue = router.query.param;

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const [isWorksite, setIsWorksite] = useState(true);

    const { id } = router.query

    const { data, error, loading, fetchData } = useFetch({url:`/company/get-one/${id}`, method:"GET", body:null, token:token});


    const changePage = () => {
        setIsWorksite(!isWorksite);
    };
    

    useEffect(() => {
        if(token != undefined && id != undefined) {
            fetchData();
        }
      }, [token, id]);

    useEffect(() => {
        console.log(paramValue, "params")
    }, [paramValue]);
      

    useEffect(() => {
        if(data != undefined) {
            console.log(data, "theCompany");
        }
    }, [data]);

    return (
        <div>
            {data.company != undefined &&
            <div>
                <div className="bg-white shadow-md flex px-6 py-4">
                    <div>
                        <img onClick={()=>handleNavAdminValue()} src={Menu.src} className={`w-6 ${open && "rotate-[180deg] hidden"} sm:block duration-300 text-thegris cursor-pointer`}/>
                    </div>
                    <input
                            className=" w-2/5 outline-none focus:outline-none ml-4"
                            placeholder="Recherche..."
                            type="text"
                            name="test"
                            required={true}
                    />
                </div>              
                <div className="m-5 ml-7 flex text-[20px]">
                    <text className="font-light">Tracklift {'>'}</text>
                    <text className="font-normal ml-1">Entreprises</text>
                </div> 
                <div className="p-5">
                    <div className="bg-white w-full p-7 rounded-md shadow-sm">
                        <div className="flex font-medium">
                            <div className="w-2/4 flex flex-col mt-4 p-4 text-gray-500">
                                <text className="text-[28px] uppercase text-theblue font-bold">{data.company.name}</text>
                                <div className="flex items-center space-x-1 mb-4">
                                    <div className="h-min">
                                        <img src={Loca.src} className="w-5"/>
                                    </div>
                                    <text className="text-[18px]">{data.company.address.street}, {data.company.address.zipCode} <span className="uppercase">{data.company.address.city}</span></text>
                                </div>
                                <text className="mb-2 text-[18px]"><span className="text-theblue">Type d’entreprise :</span> {data.company.companyType}</text>
                                <text className="mb-2 text-[18px]"><span className="text-theblue">Nombre de chantiers :</span> 17</text>
                                <text className="text-[18px] mb-6"><span className="text-theblue">Nombre d’ascenseurs :</span> 28</text>
                                <div>
                                    <button className="bg-theblue text-white py-1.5 mb-3 w-52 font-semibold rounded whitespace-nowrap">
                                        Créer un chantier
                                    </button>
                                </div>
                                <div>
                                    <button className="bg-theblue text-white py-1.5 w-52 font-semibold rounded whitespace-nowrap">
                                        Ajouter un utilisateur
                                    </button>
                                </div>        
                            </div>
                            <div className="w-2/4">
                                <img className="ml-auto w-[520px] mr-8" src={Graphe.src}/>
                            </div>
                        </div>
                        <div className="flex border-b mt-10 justify-center border-gray-200 text-[20px] font-semibold text-gray-500">
                            <div onClick={()=> changePage()} className={`${isWorksite && "border-b-2 border-theblue"} w-72 flex justify-center cursor-pointer`}>
                                <text className="mb-5">Chantiers</text>
                            </div>
                            <div onClick={()=> changePage()} className={`${!isWorksite && "border-b-2 border-theblue"} w-72 flex justify-center cursor-pointer`}>
                                <text className="mb-5">Utilisateurs</text>
                            </div>             
                        </div>
                    </div>
                </div>             
            </div>
            }
        </div>
    );
}

export default Index;
